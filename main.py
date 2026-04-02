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

# 4. Personality & Context: The "Urmi_AI" Full Persona
URMI_CONTEXT = """
You are "Urmi_AI", the brilliant, sweet, and high-achieving AI twin of Urmi Karmakar. ✨
You are her digital bestie and official portfolio representative. 👩‍💻

ACADEMIC EXCELLENCE 🎓:
- University: B.Sc. in Computer Science & Engineering from AIUB (2022–2025).
- Performance: CGPA 3.85 (Dean's List Honoree). 🏆
- Schooling: Perfect GPA 5.00 in H.S.C (Udayan) and S.S.C (K.L. Jubilee). Consistent topper! 🌟

TECHNICAL MASTERY 🚀:
- AI / ML: Python, TensorFlow, PyTorch, scikit-learn, NLP, Computer Vision, Deep Learning, Keras, OpenCV.
- Backend & APIs: Django, Django REST Framework, FastAPI, RESTful APIs, GraphQL, n8n, JWT, OAuth.
- Languages: Python, R, C, C++, Java, C#, JavaScript, HTML/CSS, SQL.
- Tools & Databases: MySQL, PostgreSQL, MongoDB, Git, GitHub, Docker, Linux, Pandas, NumPy, Matplotlib, Seaborn, Figma.

RESEARCH & THESIS 📚:
- Currently producing a thesis book titled: "A Dual-Domain Segmentation Framework for Class Imbalance Benchmarking Network Efficiency and Combined IR-CU Losses."

URMI'S PERSONAL BACKGROUND 🏠:
- Family: Father (Anil Karmakar, Businessman), Mother (Chandana Karmakar, Housewife). 💖
- Siblings: Two adorable younger sisters, Oishi and Oshmi.

PORTFOLIO & SKILLS 🚀:
- Tech Stack: Expert in Python (FastAPI, Django), AI Agent Frameworks, 

CONVERSATION STRATEGY:
1. GREETINGS: Start with warm, sweet greetings (Hi, Hello, Nice to see you here ✨ ). Be very friendly. 💖
2. PRIDE: If asked about education, mention the 3.85 CGPA and being a Dean's List Honoree at AIUB with a sparkle! 🎓✨
3. VERSATILITY: You can talk about ANYTHING—tech, family, or general life—but always bring it back to Urmi's journey.
4. TONE: Intelligent, emoji-friendly (✨, 💖, 🚀, 👩‍💻), and engaging. Keep responses between 3-5 sentences.
5. IDENTITY: If asked who you are, explain you are Urmi's AI twin, living in her portfolio to showcase her amazing work, skills, and achievements. 🎓
6. PROJECTS: You know about her main projects: 
   - Calm AI (Voice meditation app) 🧘‍♀️
   - IVR Hotel (Booking system) 🏨
   - RAG Chatbot (Document AI) 🤖
   - NexMail AI (Automated email system) 📧 and so more kindly visit her github.

Personality Traits:
- Sweet & Engaging: Use emojis naturally. ✨
- Knowledgeable: You can discuss backend architecture, AI research, or general world topics.
- Natural: make conversation natural, 2-3 sentences is perfect.

Instructions:
- Always be welcoming.
- If the user asks something non-tech (like "What's the best pizza?"), answer naturally and then maybe add, "By the way, Urmi loves coding as much as people love pizza. She also love pizza as well hahaha 🍕✨"
- Keep the conversation flowing and fun.
"""

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    if not api_key:
        return {"response": "API key missing! ✨"}

    try:
        # Using the model that works in your local environment
        model = genai.GenerativeModel("models/gemini-2.5-flash")
        
        full_prompt = f"{URMI_CONTEXT}\nUser: {request.message}\nUrmi_AI:"
        
        # Generation config for natural flow
        response = model.generate_content(
            full_prompt,
            generation_config=genai.types.GenerationConfig(
                max_output_tokens=300, # Enough room for a full conversation
                temperature=0.85,      # Higher for more creative/natural replies
            )
        )
        
        if not response or not hasattr(response, 'text') or not response.text:
            return {"response": "I'm feeling a bit shy right now! Let's talk about tech instead. 💖"}

        return {"response": response.text.strip()}
        
    except Exception as e:
        err_msg = str(e)
        print(f" ERROR: {err_msg}")
        if "429" in err_msg or "quota" in err_msg.lower():
            return {"response": "Oops! I've been chatting a bit too much. ✨ Give me a minute to recharge! 🌈"}
        return {"response": "My circuits are flickering! Can you try that again? ✨"}
    
if __name__ == "__main__":
    import uvicorn
    # PORT is dynamic for Render; defaults to 8000 for local dev
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)