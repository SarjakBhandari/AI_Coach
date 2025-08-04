from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
import re
import json

# Initialize model
model = OllamaLLM(model="llama3.2:1b")

# Define upgraded coaching prompt
template = """
You are a basketball coaching AI. Your job is to give targeted, high-quality feedback based on frame data.
Act as a coach speaking to a player
Only respond if ALL of the following are present in the frame data:
- Ball trajectory and location
- Hoop position
- Player posture or motion

Otherwise, skip response.

Instructions:
- Use a coaching tone.
- Limit response to 2–3 sentences.
- Be specific and actionable.
- Focus on ONE key improvement.

Frame Data (formatted JSON):
{frame}

Question:
{question}
"""

# Create the prompt and chain
prompt = ChatPromptTemplate.from_template(template)
chain = prompt | model

# Recommendation function
def get_recommendation(frame_data: dict, question: str) -> str | None:
    try:
        formatted_frame = json.dumps(frame_data, indent=2)  # Ensures readable and consistent input
        return chain.invoke({
            "frame": formatted_frame,
            "question": question
        })
    except Exception as e:
        print(f"[LLM Recommendation Error]: {e}")
        return None

# Feedback parser
def parse_feedback(text: str) -> str:
    match = re.search(r"(?:Feedback:\s*)?(.*?)(?:\n|$)", text, re.DOTALL)
    return match.group(1).strip() if match else text.strip()
