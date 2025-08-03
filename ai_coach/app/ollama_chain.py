from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
import re

model = OllamaLLM(model="llama3.2:1b")

template = """
You are a basketball coach AI.

If any data (ball, hoop, posture) is missing, skip response. Otherwise, give concise coaching advice in 2-3 sentences.

Feedback: <short coaching feedback>

Frame Data:
{frame}

Question:
{question}
"""

prompt = ChatPromptTemplate.from_template(template)
chain = prompt | model

def get_recommendation(frame_data: dict, question: str):
    try:
        return chain.invoke({"frame": frame_data, "question": question})
    except Exception:
        return 

def parse_feedback(text):
    match = re.search(r"Feedback:\s*(.*?)(?:\n|$)", text, re.DOTALL)
    return match.group(1).strip() if match else text.strip()
