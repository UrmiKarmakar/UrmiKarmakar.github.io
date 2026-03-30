import React from "react";
import HeroSection from "../components/portfolio/HeroSection";
import SkillsSection from "../components/portfolio/SkillsSection";
import WorkExperienceSection from "../components/portfolio/WorkExperienceSection";
import EducationSection from "../components/portfolio/EducationSection";
import AllProjectsSection from "../components/portfolio/AllProjectsSection";
import AwardsSection from "../components/portfolio/AwardsSection";
import CertificatesSection from "../components/portfolio/CertificatesSection";
import ExtracurricularSection from "../components/portfolio/ExtracurricularSection";
import Footer from "../components/portfolio/Footer";

export default function Home() {
  return (
    /* REMOVED: <Navbar /> and <ChatBot /> (They are already in App.jsx)
       REMOVED: grid-bg (Keep it in one place, either here or App.jsx, to avoid overlap)
    */
    <div className="flex flex-col gap-0">
      <HeroSection />
      <SkillsSection />
      <WorkExperienceSection />
      <EducationSection />
      <AllProjectsSection />
      <AwardsSection />
      <CertificatesSection />
      <ExtracurricularSection />
      <Footer />
    </div>
  );
}