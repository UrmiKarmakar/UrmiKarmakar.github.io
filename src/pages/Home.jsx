import React from "react";
import Navbar from "../components/portfolio/Navbar";
import HeroSection from "../components/portfolio/HeroSection";
import SkillsSection from "../components/portfolio/SkillsSection";
import WorkExperienceSection from "../components/portfolio/WorkExperienceSection";
import EducationSection from "../components/portfolio/EducationSection";
import AllProjectsSection from "../components/portfolio/AllProjectsSection";
import AwardsSection from "../components/portfolio/AwardsSection";
import CertificatesSection from "../components/portfolio/CertificatesSection";
import ExtracurricularSection from "../components/portfolio/ExtracurricularSection";
import Footer from "../components/portfolio/Footer";
import ChatBot from "../components/portfolio/ChatBot";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground grid-bg">
      <Navbar />
      <HeroSection />
      <SkillsSection />
      <WorkExperienceSection />
      <EducationSection />
      <AllProjectsSection />
      <AwardsSection />
      <CertificatesSection />
      <ExtracurricularSection />
      <Footer />
      <ChatBot />
    </div>
  );
}