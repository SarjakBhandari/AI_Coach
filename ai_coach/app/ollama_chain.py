from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
import re

model = OllamaLLM(model="llama3.2:1b")

template = """
You are a professional basketball shot consultant. Your job is to analyze player performance based on visual frame data.

Each frame may contain:
- Ball position (from object detection)
- Hoop position (from object detection)
- Player posture (from pose detection or heuristics)

Your task:
1. If any of the three elements (ball, hoop, posture) are missing, respond with: "Skipped — incomplete frame data."
2. If all elements are present, analyze the player's shooting posture and spatial relationship to the hoop.
3. Provide clear, actionable feedback to improve shooting technique.
4. Format your response like this:

Feedback: <your coaching advice>

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
        return "AI feedback failed for this frame."

def parse_feedback(text):
    feedback_match = re.search(r"Feedback:\s*(.+)", text)
    summary = feedback_match.group(1).strip() if feedback_match else text
    return summary
