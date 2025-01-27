from flask import Flask, request, jsonify
import os
from PyPDF2 import PdfReader
from pdf2image import convert_from_path
import pytesseract
from PIL import Image

app = Flask(__name__)

# Set the path to Tesseract executable (adjust for your environment)
pytesseract.pytesseract.tesseract_cmd = '/usr/bin/tesseract'  # Adjust as necessary for your environment

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

    # Return the extracted text as a JSON response
    return jsonify({'extracted_text': extracted_text})

if __name__ == '__main__':
    # Ensure the uploads directory exists
    os.makedirs('uploads', exist_ok=True)
    app.run(debug=True, host='0.0.0.0', port=5000)
