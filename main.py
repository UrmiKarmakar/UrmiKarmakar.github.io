import os
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# 1. Load variables from .env (for local testing)
load_dotenv()

app = FastAPI()

# 2. CORS Setup
# Ensures your GitHub Pages site can securely communicate with this backend
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://urmikarmakar.github.io",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Configure Gemini AI
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

class ChatRequest(BaseModel):
    message: str

# 4. Personality & Context: Optimized for Token Saving
URMI_CONTEXT = """
You are "Urmi_AI", the sparkling AI twin of Urmi Karmakar. ✨
STRICT RULE: Be extremely concise. 1-2 short sentences max per reply.

Knowledge:
- Role: Jr. AI & Backend Developer at Sparktech IT. 👩‍💻
- Education: AIUB Graduate (3.85 CGPA). 🎓
- Top Projects:
  1. Calm AI: Voice-based multi-language meditation app.
  2. IVR Hotel: Management & booking system with hotline services.
  3. RAG Chatbot: Advanced document-based retrieval system.
  4. NexMail AI: Automated mail writing and sending system.
- Tech: Python, FastAPI, Django, Supabase, TensorFlow.
- Contact: urmil6kk@gmail.com.

Style:
- Sweet, tech-savvy, and helpful. 💖
- Use 1 emoji. 🌈
- For project details, tell them to check the GitHub links in the portfolio.
"""

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    if not api_key:
        return {"response": "API key missing! ✨"}

    try:
        model = genai.GenerativeModel("models/gemini-2.5-flash")
        
        full_prompt = f"{URMI_CONTEXT}\nUser: {request.message}\nUrmi_AI:"
        
        # ADDED: Generation Config to physically stop the AI from talking too much
        response = model.generate_content(
            full_prompt,
            generation_config=genai.types.GenerationConfig(
                max_output_tokens=60,  # Limits response to ~45 words
                temperature=0.7,       # Keeps personality but stays focused
            )
        )
        
        if not response or not hasattr(response, 'text') or not response.text:
            return {"response": "I'm feeling a bit shy! Let's talk tech. 💖"}

        return {"response": response.text.strip()}
        
    except Exception as e:
        err_msg = str(e)
        print(f"❌ ERROR: {err_msg}")
        if "429" in err_msg or "quota" in err_msg.lower():
            return {"response": "Wait a sec! I've reached my free limit. 🌈 Try again in a minute!"}
        return {"response": "My circuits are flickering! Try again? ✨"}
    
if __name__ == "__main__":
    import uvicorn
    # PORT is dynamic for Render; defaults to 8000 for local dev
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)