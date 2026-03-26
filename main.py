import os
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# 1. Load variables
load_dotenv()

app = FastAPI()

# 2. CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Configure Gemini with your key
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

class ChatRequest(BaseModel):
    message: str

URMI_CONTEXT = """
You are "Virtual Urmi", a professional AI assistant for Urmi Karmakar's portfolio. 
Urmi is a Jr. AI & Backend Developer. Mention her projects like Pylot and HandyConnect.
"""

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        # --- THE FIX: Using the exact model name from your list ---
        model = genai.GenerativeModel("models/gemini-2.5-flash")
        
        prompt = f"{URMI_CONTEXT}\n\nUser Question: {request.message}\nVirtual Urmi:"
        
        # Generating content
        response = model.generate_content(prompt)
        
        if not response or not response.text:
            raise ValueError("No text received from Gemini.")

        return {"response": response.text}
        
    except Exception as e:
        print(f"❌ Error during chat: {str(e)}")
        # Fallback to the next available model in your list if Flash fails
        try:
            model = genai.GenerativeModel("models/gemini-flash-latest")
            response = model.generate_content(request.message)
            return {"response": response.text}
        except:
            raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)