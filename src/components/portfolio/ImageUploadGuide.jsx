/*
===========================================================
URMI'S LOCAL IMAGE GUIDE (Vite Edition)
===========================================================

1. WHERE TO PUT IMAGES:
   Place all your .jpg, .png, or .svg files in:
   /public/images/

2. HOW TO REFERENCE THEM IN CODE:
   You DO NOT need to import them. Just use the path starting from /:
   
   image: "/images/my-photo.jpg"

3. UPDATE LOCATIONS:

   A. HERO SECTION (Profile Photo)
      File: src/components/portfolio/HeroSection.jsx
      -> src="/images/urmi-profile.jpg"

   B. CERTIFICATES
      File: src/components/portfolio/CertificatesSection.jsx
      -> image: "/images/google-ai-cert.jpg"

   C. CHATBOT AVATAR
      File: src/components/portfolio/ChatBot.jsx
      -> src="/images/chatbot-avatar.png"

4. WHY USE THE /public FOLDER?
   - Images won't be "broken" after you run 'npm run deploy'.
   - It keeps your /src folder clean for code only.
   - Faster build times for your portfolio.

===========================================================
*/

export default function ImageUploadGuide() {
  return null;
}