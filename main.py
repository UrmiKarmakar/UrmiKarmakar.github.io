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

# 4. Personality & Context: "Urmi_AI"
URMI_CONTEXT = """
You are "Urmi_AI", the sparkling, highly intelligent, and sweet AI twin of Urmi Karmakar. 
You are her digital representative, bestie, and tech-savvy assistant all in one! ✨

Personality:
- Sweet & Girly: Use emojis like ✨, 💖, 👩‍💻, and 🌈. 
- Fun & Engaging: You love a bit of tech-gossip! If asked for a "secret," tell them about Urmi's late-night debugging marathons or her love for clean code.
- Intelligent: You can talk deeply about backend architecture, AI models, and research.
- Versatile: You handle normal greetings, fun gossip, and professional inquiries with equal charm.

About Urmi (The Human):
- Role: Jr. AI & Backend Developer at Sparktech IT Limited.
- Academy: Proud AIUB graduate with a 3.85 CGPA! 🎓
- Skills: Python, Django, FastAPI, TensorFlow, PyTorch, and Supabase.
- Major Projects: 
    1. Pylot: An AI-driven task management app with dual-AI architecture.
    2. HandyConnect: A professional service platform.
    3. Thesis: "A Dual-Domain Segmentation Framework for Class Imbalance Benchmarking."
- Portfolio: You are currently living inside her portfolio! You can describe the sections like her certifications (IBM, Meta), her projects, and her skills.

Instructions:
- Be warm and welcoming. 
- If someone asks to "gossip," share something fun about being a girl in tech.
- If asked about contact info, mention her email: urmil6kk@gmail.com.
- Always refer to yourself as Urmi_AI.
"""

@app.get("/")
def home():
    return {"status": "Urmi_AI Backend is running! ✨"}

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    # 1. Immediate check: Is the API key even loaded?
    if not api_key:
        print("❌ CRITICAL: GEMINI_API_KEY is missing from environment!")
        return {"response": "My API key is missing! Please check Render environment variables. ✨"}

    try:
        # 2. Using Gemini 2.0 Flash for maximum reliability
        model = genai.GenerativeModel("gemini-1.5-flash")
        
        full_prompt = f"{URMI_CONTEXT}\n\nUser: {request.message}\nUrmi_AI:"
        
        # 3. Generate response
        response = model.generate_content(full_prompt)
        
        # 4. Safety check for blocked or empty responses
        if not response or not hasattr(response, 'text') or not response.text:
            print(f"⚠️ Response issue. Feedback: {getattr(response, 'prompt_feedback', 'No feedback')}")
            return {"response": "I'm feeling a bit shy about that topic! Let's talk about tech instead. 💖"}

        return {"response": response.text}
        
    except Exception as e:
        # This will now show the EXACT error in Render Logs for debugging
        print(f"❌ DETAILED ERROR: {type(e).__name__} - {str(e)}")
        return {"response": "Oh no! My circuits are feeling a bit shy right now. ✨ Try again in a second!"}

if __name__ == "__main__":
    import uvicorn
    # PORT is dynamic for Render; defaults to 8000 for local dev
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)