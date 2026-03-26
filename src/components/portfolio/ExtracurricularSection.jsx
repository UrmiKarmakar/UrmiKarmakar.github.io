import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Award, Presentation, Heart, Eye, Lightbulb } from "lucide-react";
import ImageModal from "./ImageModal";

const ACTIVITIES = [
  {
    icon: Users,
    title: "General Secretary, ACES",
    org: "AIUB Community of Engineering Students",
    period: "2023-2024",
    description: "Led organizational activities, event planning, and team coordination. Demonstrated strong leadership and communication skills.",
    images: [
      "https://lh3.googleusercontent.com/sitesv/APaQ0STK1MPUfA-SprLYVL_Wcc261b6GWfZZXvixUhBAWZ1UXKCxNIj4j1ORf4Njlx4kLc5S8r2Ck5xdfsYACzhVQK8Y_MIYyoEyK2CEsl96uVFn5YhklPjJ9N51e4jwbxGWmcFFrEHXTQeCutWGPsUSFQ5R-YzlVr8SJrJbmmJgzuX9Qy1_18Mibut5rE_JDfezJwvmoDcS5oKkiY2ne8AvOBnjAC4TXzkT0-hizA0=w1280",
      "https://lh3.googleusercontent.com/sitesv/APaQ0SSLcQ37MkaljJy_jt_8WZv51_kHbJTVULiTRcgd0g3ieXDzdAMBaJcQmHX2iFOOl3DujVnH3EKjOCbpQO79tUIUU4i6NyGh6nYXuwl-n-BBVSx_RdrBD79JMdCAq1-yetd8DRaj51N1eVUUpoLvcaIYD0oynHITUq3DX4hZoCfbIZwtpiKKoSNHvc-wzzbymwvyrpz5oO0TCAyZZYOqbtvcEcD5V_vKnU_F=w1280"
    ],
    color: "purple",
  },
  {
    icon: Lightbulb,
    title: "Capstone Project Completion",
    org: "Various Semesters (Fall 2022-23, Spring 2022-23, Fall 2023-24)",
    period: "2022-2024",
    description: "Successfully completed multiple capstone projects involving advanced data analysis, machine learning applications, and innovative real-world solutions.",
    images: [
      "https://lh3.googleusercontent.com/sitesv/APaQ0SRhntPh2zKTDF-96PBV1GcxGzt_MCKE3yM5d_kOz-DpbJiXhBsD4sjJb3t9fQ_bpp7jhdzRgw0X0UyzxMKxUD8RCMorbN_2bkTKCpmoXTRATKeczvAkJYU_VniznMrg68sa83m-ezKLht-3NXzQSV6H2FziVoSGYT5oma14sFXsAOqb3xG1JnPJs9yLqV5kEeSFe82Mpa1qudSKnnoQzZLt29yJx3zq507syN4=w1280",
      "https://lh3.googleusercontent.com/sitesv/APaQ0SQo2XN3hCpz35alt6V4L2t9Y6pgWpNzXaQGsZk3HvbIBT5YGeVIg9W73yVPXuZi_oFnd5643RSs_KQWCWnHFQDn4eA3-JTyl_W7btU5Q1fDdyZoCMugEOTkqw_kuPX6p70jsJ9KoGotfvErgncFbCCfYaKLic23WDUyJ-54dYfDh_-Dj4RfGfLnDnX86WK0g1AJpqYYpbpCkMrRHzzZvk6Vl8OaFAwki3UTriQ=w1280"
    ],
    color: "blue",
  },
  {
    icon: Heart,
    title: "Industrial Visit to DESCO",
    org: "Faculty of Engineering, supported by ACES",
    period: "2024",
    description: "Participated in industrial visit to DESCO to gain practical insights into electrical systems and engineering practices.",
    images: [
      "https://lh3.googleusercontent.com/sitesv/APaQ0SSQGkKKBRO3flex4qyPGQoCZAF6K2rcDPGY2S32qimzN09J9MuRoSawZl5CzprGZY1eSKQmYzBQ_Pxj0NQuGhXottSIVFK3-AwLxtKuTBHZaxpTocv24D2087r4mWhytGweiw27NBWOOmH7xVRw62krIUqgKI07Yi8nmsHSlIZRdD1aGqRTgc3KY08IxYWMUwJ1BHF1BtjEYqtVOj6xx4qOqlt5E__RnHRL=w1280",
      "https://lh3.googleusercontent.com/sitesv/APaQ0SSx4R12psRnPFQ6GkuM01_yIxIZPde2vDBf6yNT0xbpwLsiVHzrXqJOT3oee4UTKiA5YTCZPmb7X1EzPXL7RIZ12YEpkTm9Nns-knYPC3ll42kQrtFX7uJuFJ8tQGM5ScDDfVwqiFT8hcoBA6wvVx4TTWxz8Ggf46fgD5fjys4m4oOJwiJljPPE-3N_t4q5_Xd1yw2ZZObaZ_xH-lHA2r7ztRmkW0LrlSfNr0M=w1280"
    ],
    color: "pink",
  },
  {
    icon: Presentation,
    title: "21st February & Workshops",
    org: "Cultural & Technical Events",
    period: "2022-2025",
    description: "Actively participated in cultural celebrations and technical workshops including 4th ICREST'25 robotics conference.",
    images: [
      "https://lh3.googleusercontent.com/sitesv/APaQ0SSvYGAXgSfK4ZOc82t_Saukgy_cu5j5tOcuyAOCWRBiioIV3sgUQu7_xV7q4lrRCFy_4B2gRkHfY3jezretqtOAMcGA5_JJqB7JcB-Ep9gRsZzvVuk4ALrAZzDph1oH9-ltx3biLEyaLxkE2OOMzATOTTDONlgN0HyhGv4WMtolk_P2rkv_tkwHwehggvRo0JxCIc0LbYLROth5QOg0Vm6Xcux7yw9-WVQ8JLo=w1280",
      "https://lh3.googleusercontent.com/sitesv/APaQ0SSEwj9cfvTkVLEPzbxpaN-QcIYEIYavQS9PanSj2uqQKjy2wEfFERhBCSDc4qmbEzQoPOjSi5wOqJgiLgVdM_LegwShDbEDvADzSKlkPevHvr7PzvgNyo28Ue8vrZg9ltFu8gZ7H7X5NmSIF6IAmaQZuP6xacaDe5wFtkz4lIL0JW2BgtOi5M_erUlcQy7o7Fc5qb7Rog1fyzH15NxxhkDeTVM3Yu8BNnVCfG8=w1280"
    ],
    color: "cyan",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

export default function ExtracurricularSection() {
  const [modalData, setModalData] = useState(null);

  return (
    <section id="Extracurricular" className="py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      
      {/* Floating graphics */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <motion.div
          animate={{ y: [0, -28, 0], rotate: [0, 270, 360] }}
          transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-24 right-14 w-17 h-17 border border-pink-500/25 rounded-full"
        />
        <motion.div
          animate={{ x: [-16, 16, -16], rotate: [0, -90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-28 left-16 w-13 h-13 border-2 border-violet-500/20"
          style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.28, 1], opacity: [0.18, 0.35, 0.18] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-2/3 right-1/3 w-21 h-21 bg-gradient-to-br from-primary/10 to-transparent rounded-lg"
        />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div {...fadeUp} className="text-center mb-16">
          <span className="font-mono text-primary text-sm mb-2 block">// extracurricular_activities</span>
          <h2 className="text-3xl sm:text-4xl font-bold glow-text">Beyond Code</h2>
          <p className="text-muted-foreground mt-3 text-sm">Leadership, teamwork, and community engagement</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ACTIVITIES.map((activity, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.15 }}
              className="glass rounded-xl overflow-hidden neon-border group hover:glow-purple-sm transition-all duration-500"
            >
              {/* Images */}
              <div className="grid grid-cols-2 gap-2 p-4">
                {activity.images.map((img, j) => (
                  <div
                    key={j}
                    onClick={() => setModalData({ image: img, title: activity.title, description: activity.org })}
                    className={`relative ${activity.images.length === 1 ? 'col-span-2' : ''} h-32 rounded-lg overflow-hidden cursor-pointer group/img`}
                  >
                    <img
                      src={img}
                      alt={`${activity.title} ${j + 1}`}
                      className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-background/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <Eye className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Content */}
              <div className="p-5 pt-2">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                    <activity.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-sm leading-snug">{activity.title}</h3>
                    <p className="text-xs text-primary font-mono mt-0.5">{activity.org}</p>
                  </div>
                </div>

                <span className="inline-block text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded-md mb-3">
                  {activity.period}
                </span>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ImageModal
        isOpen={!!modalData}
        onClose={() => setModalData(null)}
        image={modalData?.image}
        title={modalData?.title}
        description={modalData?.description}
      />
    </section>
  );
}