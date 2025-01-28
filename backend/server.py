from flask import Flask, request, jsonify
import os
from PyPDF2 import PdfReader
from pdf2image import convert_from_path
import pytesseract
from PIL import Image
import requests

app = Flask(__name__)

# Set the path to Tesseract executable (adjust for your environment)
pytesseract.pytesseract.tesseract_cmd = '/usr/bin/tesseract'  # Adjust as necessary for your environment


API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
headers = {"Authorization": "Bearer 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"}



def simplify_text(input_text):
    payload = {
        "inputs": input_text
    }
    response = requests.post(API_URL, headers=headers, json=payload)
    output = response.json()
    return output[0]['summary_text']

# Example usage
#input_text = "VIEH Private Limited Sagar City Society, Andheri West, Mumbai, Maharashtra - 400058 January 20, 2025 Internship Offer Letter Dear Sheeba Sharon, On behalf of VIEH Private Limited, I am pleased to inform you that you have been considered for the Cyber Security internship. As a result, you will be working with us on the project from January 20, 2025. During your internship, the concentration will be on helping you understand the theoretical concepts with their practicals and implementations to help you connect your classroom knowledge and on-field experience. As a result, you will be proactively contributing to the above-selected project, besides product development and research field. In addition, you will be required to complete performance and learning goals for your current project with us. With this offer letter, you acknowledge that you understand participation in this program is not an offer of employment, and successful completion of the program does not entitle you to an employment offer from us. We hope that your association with the company will be successful and rewarding. We look forward to having you begin your career with us. Once again, congratulations to you on your selection, and all the best for your endeavors. Regards, Manish Kumar CEO & Chief Cyber Security Analyst at VIEH"
# simplified_output = simplify_text(input_text)
# print(simplified_output)


# Text extraction function
def extract_text_from_pdf(pdf_path):
    """Extract text from a PDF file."""
    text_output = []
    reader = PdfReader(pdf_path)
    for page in reader.pages:
        text = page.extract_text()
        if text:
            text_output.append(text)
        else:
            text_output.append("No text found on this page.")
    return "\n".join(text_output)

@app.route('/upload', methods=['POST'])
def upload_file():
    """Handle file upload and text extraction."""
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400

    # Save the file to a temporary location
    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)

    # Process the file
    extracted_text = extract_text_from_pdf(file_path)

    simplified_output= simplify_text(extracted_text)

    # Return the extracted text as a JSON response
    return jsonify({'extracted_text': simplified_output})

if __name__ == '__main__':
    # Ensure the uploads directory exists
    os.makedirs('uploads', exist_ok=True)
    app.run(debug=True, host='0.0.0.0', port=5000)