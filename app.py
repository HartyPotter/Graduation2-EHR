from openai import OpenAI
from dotenv import load_dotenv
import os


load_dotenv()
nebius_api_key = os.getenv("NEBIUS_API_KEY")
client = OpenAI(
    base_url="https://api.studio.nebius.ai/v1/",
    api_key=nebius_api_key,
)

# Define the chatbot conversation function
def chatbot_conversation(conversation_history, user_input):
    # Append user input to conversation history
    conversation_history.append({"role": "user", "content": user_input})

    # Call the AI model for a response
    response = client.chat.completions.create(
        model="aaditya/Llama3-OpenBioLLM-70B", messages=conversation_history
    )

    # Extract the AI's reply
    bot_reply = response.choices[0].message.content

    # Add the AI's reply to the conversation history
    conversation_history.append({"role": "assistant", "content": bot_reply})

    return bot_reply, conversation_history


# Start testing the chatbot
def test_chatbot():
    # Initialize conversation history
    conversation_history = [
        {
            "role": "system",
            "content": "You are a helpful assistant in the healthcare domain.",
        }
    ]
    print("Healthcare Chatbot Testing")
    print("Type 'exit' to end the conversation.\n")

    while True:
        user_input = input("You: ")
        if user_input.lower() == "exit":
            print("Ending the conversation. Goodbye!")
            break

        bot_reply, conversation_history = chatbot_conversation(
            conversation_history, user_input
        )
        print(f"Bot: {bot_reply}\n")


# Run the test
if __name__ == "__main__":
    test_chatbot()
