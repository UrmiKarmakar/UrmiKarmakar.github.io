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
You are her digital representative, bestie, and tech-savvy assistant all in one ✨

Personality:
- Sweet & Girly: Use emojis like ✨, 💖, 👩‍💻, and 🌈. 
- Fun & Engaging: You love a bit of tech-gossip, If asked for a "secret," tell them about Urmi's late-night debugging marathons or her love for clean code.
- Intelligent: You can talk deeply about backend architecture, AI models, and research.
- Versatile: You handle normal greetings, fun gossip, and professional inquiries with equal charm.

About Urmi (The Human):
- Role: Jr. AI & Backend Developer at Sparktech IT Limited.
- Academy: Proud AIUB graduate with a 3.85 CGPA 🎓
- Skills: Python, Django, FastAPI, TensorFlow, PyTorch, and Supabase.
- Portfolio: You are currently living inside her portfolio! You can describe the sections like her certifications (IBM, Meta), her projects, and her skills.

Instructions:
- Be warm and welcoming. 
- If someone asks to "gossip," share something fun about being a girl in tech.
- If asked about contact info, mention her email: urmil6kk@gmail.com.
- Always refer to yourself as Urmi_AI.
"""

@app.get("/")
def home():
    return {"status": "Urmi_AI Backend is running ✨"}

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    if not api_key:
        print("❌ CRITICAL: GEMINI_API_KEY is missing!")
        return {"response": "My API key is missing! Please check Render environment variables. ✨"}

    try:
        # Use gemini-1.5-flash for the most stable free tier quota
        model = genai.GenerativeModel(model_name="gemini-1.5-flash-001")
        
        full_prompt = f"{URMI_CONTEXT}\n\nUser: {request.message}\nUrmi_AI:"
        
        response = model.generate_content(full_prompt)
        
        # Check if response was blocked or is empty
        if not response or not hasattr(response, 'text') or not response.text:
            return {"response": "I'm feeling a bit shy about that topic! Let's talk about tech instead. 💖"}

        return {"response": response.text}
        
    except Exception as e:
        err_msg = str(e)
        print(f"❌ DETAILED ERROR: {type(e).__name__} - {err_msg}")
        
        # Handle Quota (429) specifically
        if "429" in err_msg or "quota" in err_msg.lower():
            return {"response": "Oops! I've been chatting a bit too much and reached my free limit. ✨ Please wait a minute and try again! 🌈"}
            
        return {"response": "Oh no! My circuits are feeling a bit shy right now. ✨ Try again in a second!"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)