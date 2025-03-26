from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import M2M100ForConditionalGeneration, M2M100Tokenizer

app = Flask(__name__)
CORS(app)  # Allow frontend to communicate with backend

# Load M2M100 model
model_name = "facebook/m2m100_418M"
tokenizer = M2M100Tokenizer.from_pretrained(model_name)
model = M2M100ForConditionalGeneration.from_pretrained(model_name)

@app.route("/translate", methods=["POST"])
def translate_text():
    data = request.json
    text = data.get("text", "")
    source_lang = data.get("source_language", "en")  # Default to English if not provided
    target_lang = data.get("target_language", "en")  # Default to English

    if not text:
        return jsonify({"error": "No text provided"}), 400
    if not target_lang:
        return jsonify({"error": "No target language provided"}), 400

    try:
        tokenizer.src_lang = source_lang  # Set the source language dynamically
        encoded_text = tokenizer(text, return_tensors="pt")
        generated_tokens = model.generate(**encoded_text, forced_bos_token_id=tokenizer.lang_code_to_id[target_lang])
        translation = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)[0]
        
        return jsonify({"translated_text": translation})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
