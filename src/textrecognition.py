import os
from PyPDF2 import PdfReader
from pdf2image import convert_from_path
import pytesseract
from PIL import Image
import tkinter as tk
from tkinter import filedialog

# Set the path to Tesseract executable (adjust as necessary)
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"  # For Windows
# For macOS/Linux, ensure Tesseract is installed and accessible in the PATH.

def extract_text_from_image(image_path):
    """Extract text from an image file using Tesseract OCR."""
    image = Image.open(image_path)
    return pytesseract.image_to_string(image, lang='eng')

def extract_text_from_pdf(pdf_path, output_dir):
    """
    Extract text from a PDF file. Handles both text-based and image-based PDFs.
    
    Args:
        pdf_path (str): Path to the input PDF file.
        output_dir (str): Directory to save temporary images for OCR processing.
        
    Returns:
        str: Extracted text from the PDF.
    """
    text_output = []
    reader = PdfReader(pdf_path)
    is_image_based = False

    # Step 1: Attempt to extract text directly
    for page in reader.pages:
        text = page.extract_text()
        if text:
            text_output.append(text)
        else:
            is_image_based = True  # Assume image-based PDF if no text is found
    
    # Step 2: Process image-based PDF using OCR
    if is_image_based:
        print("PDF contains images; performing OCR...")
        os.makedirs(output_dir, exist_ok=True)
        images = convert_from_path(pdf_path, dpi=300, fmt='png', output_folder=output_dir)

        for i, image in enumerate(images):
            text = pytesseract.image_to_string(image, lang='eng')
            text_output.append(f"Page {i + 1}:\n{text}\n")
    
    # Combine text from all pages
    return "\n".join(text_output)

def main():
    # Use tkinter to prompt for file upload
    root = tk.Tk()
    root.withdraw()  # Hide the main tkinter window
    file_path = filedialog.askopenfilename(
        title="Select a file",
        filetypes=[("PDF files", "*.pdf"), ("Image files", "*.png;*.jpg;*.jpeg")],
    )

    if not file_path:
        print("No file selected. Exiting.")
        return
    
    # Check file type and process accordingly
    file_extension = os.path.splitext(file_path)[1].lower()
    output_dir = "temp_images"  # Temporary directory for OCR processing

    if file_extension == ".pdf":
        print("Processing PDF...")
        extracted_text = extract_text_from_pdf(file_path, output_dir)
    elif file_extension in [".png", ".jpg", ".jpeg"]:
        print("Processing Image...")
        extracted_text = extract_text_from_image(file_path)
    else:
        print("Unsupported file type. Please upload a PDF or an image file.")
        return

    # Display the extracted text in the terminal
    print("\nExtracted Text:\n")
    print(extracted_text)

if __name__ == "__main__":
    main()
