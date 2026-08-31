"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type Locale = "en" | "hi";

const translations = {
  // Navbar / landing
  nav_features: { en: "Features", hi: "विशेषताएं" },
  nav_pricing: { en: "Pricing", hi: "कीमत" },
  nav_contact: { en: "Contact", hi: "संपर्क करें" },
  nav_start_now: { en: "Start Now", hi: "अभी शुरू करें" },

  // Auth dialog
  auth_sign_in: { en: "Sign In", hi: "साइन इन करें" },
  auth_create_account: { en: "Create Account", hi: "खाता बनाएं" },
  auth_username: { en: "Username", hi: "उपयोगकर्ता नाम" },
  auth_email: { en: "Email", hi: "ईमेल" },
  auth_password: { en: "Password", hi: "पासवर्ड" },
  auth_no_account: { en: "Don't have an account? Sign Up", hi: "खाता नहीं है? साइन अप करें" },
  auth_has_account: { en: "Already have an account? Sign In", hi: "पहले से खाता है? साइन इन करें" },

  // Dashboard
  dash_welcome: { en: "Welcome back", hi: "वापसी पर स्वागत है" },
  dash_tagline: { en: "Your AI interview readiness toolkit. Practice, get scored, improve.", hi: "आपका AI इंटरव्यू तैयारी टूलकिट। अभ्यास करें, स्कोर पाएं, सुधार करें।" },
  dash_heading: { en: "Dashboard", hi: "डैशबोर्ड" },
  dash_start_interview_title: { en: "Start a Mock Interview", hi: "मॉक इंटरव्यू शुरू करें" },
  dash_start_interview_desc: { en: "Practice a voice-based mock interview tailored to your target role", hi: "अपनी लक्षित भूमिका के अनुसार वॉइस-आधारित मॉक इंटरव्यू का अभ्यास करें" },
  dash_get_started: { en: "Get Started", hi: "शुरू करें" },
  dash_resume_fit_title: { en: "Resume-to-Job Fit Score", hi: "रिज्यूमे-नौकरी फिट स्कोर" },
  dash_resume_fit_desc: { en: "Upload your resume and a job description to see your fit score and skill gaps", hi: "अपना फिट स्कोर और स्किल गैप देखने के लिए रिज्यूमे और जॉब विवरण अपलोड करें" },
  dash_check_fit: { en: "Check My Fit", hi: "मेरा फिट जांचें" },

  // Sidebar
  side_dashboard: { en: "Dashboard", hi: "डैशबोर्ड" },
  side_resume_fit: { en: "Resume Fit Score", hi: "रिज्यूमे फिट स्कोर" },
  side_history: { en: "Past Interviews", hi: "पिछले इंटरव्यू" },
  side_profile: { en: "Profile", hi: "प्रोफ़ाइल" },
  side_logout: { en: "Logout", hi: "लॉग आउट" },
  side_mode: { en: "Mode", hi: "मोड" },

  // Create interview form
  form_title: { en: "Create New Interview", hi: "नया इंटरव्यू बनाएं" },
  form_subtitle: { en: "Configure your interview settings and generate tailored questions", hi: "अपनी इंटरव्यू सेटिंग्स कॉन्फ़िगर करें और अनुकूलित प्रश्न बनाएं" },
  form_job_position: { en: "Job position", hi: "नौकरी पद" },
  form_job_description: { en: "Job description", hi: "नौकरी विवरण" },
  form_duration: { en: "Interview duration", hi: "इंटरव्यू अवधि" },
  form_focus_areas: { en: "Interview focus areas", hi: "इंटरव्यू फोकस क्षेत्र" },
  form_generate: { en: "Generate Questions", hi: "प्रश्न बनाएं" },

  // Resume score page
  resume_title: { en: "Resume-to-Job Fit Score", hi: "रिज्यूमे-नौकरी फिट स्कोर" },
  resume_subtitle: { en: "Upload your resume and a target job description to see how well you match", hi: "आप कितना मेल खाते हैं यह देखने के लिए अपना रिज्यूमे और लक्षित नौकरी विवरण अपलोड करें" },
  resume_upload_label: { en: "Resume (PDF)", hi: "रिज्यूमे (PDF)" },
  resume_jd_label: { en: "Target job description", hi: "लक्षित नौकरी विवरण" },
  resume_check_fit: { en: "Check My Fit", hi: "मेरा फिट जांचें" },
  resume_your_score: { en: "Your Fit Score", hi: "आपका फिट स्कोर" },
  resume_summary: { en: "Summary", hi: "सारांश" },
  resume_matched_skills: { en: "Matched Skills", hi: "मेल खाने वाले कौशल" },
  resume_missing_skills: { en: "Missing Skills", hi: "छूटे हुए कौशल" },
  resume_suggestions: { en: "Suggestions", hi: "सुझाव" },
  resume_nco_matches: { en: "Matching NCO Occupations", hi: "मिलान NCO व्यवसाय" },

  // Interview practice page
  interview_ready: { en: "Ready to start", hi: "शुरू करने के लिए तैयार" },
  interview_in_progress: { en: "Interview in progress", hi: "इंटरव्यू जारी है" },
  interview_start: { en: "Start", hi: "शुरू करें" },
  interview_end: { en: "End", hi: "समाप्त करें" },
  interview_transcript: { en: "Conversation Transcript", hi: "बातचीत का प्रतिलेख" },
  interview_feedback: { en: "Interview Feedback", hi: "इंटरव्यू प्रतिक्रिया" },
  interview_soft_skills: { en: "Soft Skills", hi: "सॉफ्ट स्किल्स" },
  interview_tips: { en: "Tips to Improve", hi: "सुधार के लिए सुझाव" },
} as const;

export type TranslationKey = keyof typeof translations;

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("locale");
      if (stored === "en" || stored === "hi") {
        setLocaleState(stored);
      }
    } catch {
      // localStorage unavailable, keep default
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem("locale", next);
    } catch {
      // ignore
    }
  };

  const t = (key: TranslationKey) => translations[key]?.[locale] ?? translations[key]?.en ?? key;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
