from flask import Flask, request, jsonify
from flask_cors import CORS
from huggingface_hub import InferenceClient
import logging
import os
from PyPDF2 import PdfReader
import pytesseract
import requests
from pdf2image import convert_from_path

app = Flask(__name__)
CORS(app)  # Allow frontend to communicate with backend

# Initialize Hugging Face Client for Chatbot
client = InferenceClient(api_key="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")

# Hugging Face Model API (Text Summarization)
API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
headers = {"Authorization": "Bearer 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"}

# Set the path to Tesseract executable (adjust for your environment)
pytesseract.pytesseract.tesseract_cmd = '/usr/bin/tesseract'  # Adjust as necessary

# Initialize Translation Model
from transformers import M2M100ForConditionalGeneration, M2M100Tokenizer
model = M2M100ForConditionalGeneration.from_pretrained("facebook/m2m100_418M")
tokenizer = M2M100Tokenizer.from_pretrained("facebook/m2m100_418M")

# Configure logging
logging.basicConfig(level=logging.INFO)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_input = data.get("message", "")
    category = data.get("category", "general")

    # Define prompt based on category
    if category == "legal":
        prompt = f"Give legal advice about {user_input}"
        role = "legal assistant"
    elif category == "safety":
        prompt = f"Give a safety tip about {user_input}"
        role = "safety advisor"
    else:
        prompt = f"Give an answer to {user_input}"
        role = ""

    messages = [
        {"role": "system", "content": f"You are a {role} that gives responses."},
        {"role": "user", "content": prompt}
    ]

    try:
        completion = client.chat.completions.create(
            model="mistralai/Mistral-7B-Instruct-v0.3",
            messages=messages,
            max_tokens=100
        )
        response = completion.choices[0].message['content']
    except Exception as e:
        logging.error(f"Error while fetching response: {str(e)}")
        response = f"Error: Something went wrong. Please try again later."

    return jsonify({"response": response})

@app.route('/translate/<text>/<target_language>', methods=['GET'])
def translate_get_route(text, target_language):
    """
    Translate the provided text to the target language using GET request.
    """
    try:
        # Decode the URL-encoded text
        from urllib.parse import unquote
        text = unquote(text)

        # Perform translation
        translated_text = translate_text(text, target_language)

        if not translated_text:
            return jsonify({'error': 'Translation failed'}), 500

        return jsonify({'translated_text': translated_text}), 200

    except Exception as e:
        print(f"Error in /translate GET route: {e}")
        return jsonify({'error': 'An unexpected error occurred'}), 500


def translate_text(text, target_language="hi"):
    """Translate text to a target language using the M2M100 model."""
    try:
        tokenizer.src_lang = "en"  # Source language is English
        encoded_text = tokenizer(text, return_tensors="pt")
        generated_tokens = model.generate(
            **encoded_text, forced_bos_token_id=tokenizer.get_lang_id(target_language)
        )
        translated_text = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)
        return translated_text[0]  # Return the first translated string
    except Exception as e:
        print(f"Translation error: {e}")
        return None


def simplify_text(input_text):
    """Simplify text using Hugging Face API."""
    payload = {"inputs": input_text}
    try:
        response = requests.post(API_URL, headers=headers, json=payload)
        response.raise_for_status()  # Raise an HTTPError for bad responses
        output = response.json()
        return output[0]['summary_text']
    except Exception as e:
        print(f"Simplification error: {e}")
        return "Error simplifying text."


def extract_text_from_pdf(pdf_path):
    """Extract text from a PDF file."""
    text_output = []
    try:
        reader = PdfReader(pdf_path)
        for page in reader.pages:
            text = page.extract_text()
            text_output.append(text if text else "No text found on this page.")
        return "\n".join(text_output)
    except Exception as e:
        print(f"PDF extraction error: {e}")
        return "Error extracting text from the PDF."


@app.route('/upload', methods=['POST'])
def upload_file():
    """Handle file upload and text processing."""
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    # Save file to a temporary location
    file_path = os.path.join('uploads', file.filename)
    os.makedirs('uploads', exist_ok=True)
    file.save(file_path)

    # Extract text and simplify it
    extracted_text = extract_text_from_pdf(file_path)
    simplified_output = simplify_text(extracted_text)

    return jsonify({'extracted_text': simplified_output}), 200

@app.route('/translate', methods=['POST'])
def translate_route():
    try:
        data = request.get_json()
        text = data.get('simplified_text')  # Get text from the request
        target_language = data.get('targetLanguage', 'hi')  # Default to Hindi

        if not text:
            return jsonify({'error': 'No text provided'}), 400

        # Perform translation
        translated_text = translate_text(text, target_language)

        if not translated_text:
            return jsonify({'error': 'Translation failed'}), 500

        return jsonify({'translated_text': translated_text}), 200

    except Exception as e:
        print(f"Error in /translate route: {e}")
        return jsonify({'error': 'An unexpected error occurred'}), 500

if __name__ == '__main__':
    app.run(debug=True)
