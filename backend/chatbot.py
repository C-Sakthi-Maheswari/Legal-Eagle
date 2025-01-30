# from transformers import AutoModelForCausalLM, AutoTokenizer
# import torch

# # Load pre-trained DialoGPT model and tokenizer
# model_name = "microsoft/DialoGPT-medium"
# model = AutoModelForCausalLM.from_pretrained(model_name)
# tokenizer = AutoTokenizer.from_pretrained(model_name)

# # Chat history (to maintain context)
# chat_history_ids = None

# # Function to get response from the model
# def get_bot_response(user_input):
#     global chat_history_ids

#     # Encode the user input and append it to the chat history
#     new_user_input_ids = tokenizer.encode(user_input + tokenizer.eos_token, return_tensors='pt')

#     # Append the new user input to the chat history if it's not the first input
#     if chat_history_ids is not None:
#         chat_history_ids = torch.cat([chat_history_ids, new_user_input_ids], dim=-1)
#     else:
#         chat_history_ids = new_user_input_ids

#     # Generate a response from the model
#     bot_output = model.generate(chat_history_ids, max_length=1000, pad_token_id=tokenizer.eos_token_id, no_repeat_ngram_size=3, top_p=0.9, temperature=0.7)

#     # Decode and return the bot's response
#     bot_response = tokenizer.decode(bot_output[:, chat_history_ids.shape[-1]:][0], skip_special_tokens=True)
#     return bot_response

# # Chat with the bot
# print("Chatbot is ready! Type 'quit' to exit.")
# while True:
#     user_input = input("You: ")
#     if user_input.lower() == "quit":
#         print("Goodbye!")
#         break
#     bot_response = get_bot_response(user_input)
#     print(f"Bot: {bot_response}")

import streamlit as st
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Load the model and tokenizer
model_name = "microsoft/DialoGPT-medium"
model = AutoModelForCausalLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

chat_history_ids = None

# Function to get bot response
def get_bot_response(user_input):
    global chat_history_ids
    new_user_input_ids = tokenizer.encode(user_input + tokenizer.eos_token, return_tensors='pt')

    if chat_history_ids is not None:
        chat_history_ids = torch.cat([chat_history_ids, new_user_input_ids], dim=-1)
    else:
        chat_history_ids = new_user_input_ids

    bot_output = model.generate(chat_history_ids, max_length=1000, pad_token_id=tokenizer.eos_token_id,
                                no_repeat_ngram_size=3, top_p=0.9, temperature=0.7)
    bot_response = tokenizer.decode(bot_output[:, chat_history_ids.shape[-1]:][0], skip_special_tokens=True)
    return bot_response

# Streamlit web interface
st.title("Chatbot using Hugging Face Model")

user_input = st.text_input("You:", "")

if user_input:
    bot_response = get_bot_response(user_input)
    st.write(f"Bot: {bot_response}")
