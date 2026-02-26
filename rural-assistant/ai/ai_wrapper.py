import socket
from groq import Groq

client = Groq(api_key="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")

def internet_available():
    try:
        socket.create_connection(("8.8.8.8", 53), timeout=3)
        return True
    except:
        return False

def ask_ai(question):
    if not internet_available():
        return None

    try:
        response = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[{"role": "user", "content": f"सरल हिंदी में उत्तर दें: {question}"}]
        )

        return response.choices[0].message.content

    except Exception as e:
        print("AI error:", e)
        return None