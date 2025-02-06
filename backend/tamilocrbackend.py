from flask import Flask, request, jsonify
from ocr_tamil.ocr import OCR
from flask_cors import CORS  # Import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize OCR object with appropriate settings
ocr = OCR(detect=True, details=2, text_threshold=0.3, fp16=False)

@app.route('/ocr', methods=['POST'])
def ocr_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        # Save the uploaded image temporarily
        image_path = os.path.join("temp_image.jpg")
        file.save(image_path)

        # Perform OCR on the saved image
        text_list = ocr.predict(image_path)

        # Prepare recognized text for sending back
        recognized_text = ""
        for item in text_list:
            for info in item:
                text, _, _ = info
                recognized_text += text + " "
        
        # Return the recognized text
        return jsonify({"recognized_text": recognized_text.strip()})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
