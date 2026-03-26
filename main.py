import os
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# 1. Load variables from .env
load_dotenv()

app = FastAPI()

# 2. CORS Setup
# This allows your frontend (both local and live) to talk to this backend
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://urmikarmakar.github.io",  # Your primary portfolio domain
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

class ChatRequest(BaseModel):
    message: str

# 4. Professional Context from your CV
URMI_CONTEXT = """
You are "Virtual Urmi", the AI representative for Urmi Karmakar. 
Urmi is a Jr. AI & Backend Developer at Sparktech IT Limited with a CGPA of 3.85 from AIUB. 
She specializes in Python, Django, and AI/ML frameworks like TensorFlow and PyTorch.

Key Projects to mention:
- Pylot: An AI-driven task management app.
- HandyConnect: A professional service platform.
- Thesis: A Dual-Domain Segmentation Framework for Class Imbalance Benchmarking.

Professional Style: Be helpful, technical yet accessible, and professional. 
If asked about contact info, mention her email: urmil6kk@gmail.com.
"""

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        # Using the latest stable Flash model
        model = genai.GenerativeModel("gemini-1.5-flash")
        
        # Combine the CV context with the user's current question
        prompt = f"{URMI_CONTEXT}\n\nUser: {request.message}\nVirtual Urmi:"
        
        response = model.generate_content(prompt)
        
        if not response or not response.text:
            raise ValueError("No response from AI model.")

        return {"response": response.text}
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        raise HTTPException(status_code=500, detail="The assistant is currently unavailable.")

if __name__ == "__main__":
    import uvicorn
    # The port is dynamic so it works on both Local (8000) and Render/Railway
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)