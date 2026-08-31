"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { UserPlus, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

interface AuthData {
  username: string;
  email: string;
  password: string;
}

function ChakraIcon() {
  const spokes = Array.from({ length: 16 });
  return (
    <svg viewBox="0 0 100 100" className="h-14 w-14" aria-hidden="true">
      <circle cx="50" cy="50" r="42" fill="none" stroke="var(--navy-chakra)" strokeWidth="4" />
      {spokes.map((_, i) => {
        const angle = (i * 360) / spokes.length;
        return (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={50 + 40 * Math.cos((angle * Math.PI) / 180)}
            y2={50 + 40 * Math.sin((angle * Math.PI) / 180)}
            stroke="var(--navy-chakra)"
            strokeWidth="2"
          />
        );
      })}
      <circle cx="50" cy="50" r="6" fill="var(--navy-chakra)" />
    </svg>
  );
}

export default function SignInPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<AuthData>({ username: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        toast.error("Invalid credentials");
      } else {
        toast.success("Logged in successfully");
        router.push(callbackUrl);
      }
    } else {
      try {
        const response = await axios.post("/api/signup", formData);
        if (response.status === 200 || response.status === 201) {
          toast.success("Account created successfully! Please sign in.");
          setIsLogin(true);
          setFormData({ username: "", email: "", password: "" });
        } else {
          toast.error("Registration failed");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || "Registration failed");
        } else {
          toast.error("An error occurred during registration");
        }
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left hero panel */}
      <div className="relative flex-1 min-h-[280px] md:min-h-screen flex flex-col justify-center p-8 md:p-14 overflow-hidden bg-gradient-to-br from-orange-300 via-white to-green-400 dark:from-orange-900 dark:via-neutral-900 dark:to-green-900">
        <div className="flex items-center gap-3 mb-6">
          <ChakraIcon />
          <div>
            <p className="text-xs uppercase tracking-wide text-neutral-600 dark:text-neutral-300 font-semibold">
              Built for NCS Jobseekers
            </p>
            <p className="text-lg font-bold text-neutral-800 dark:text-white">भारत सरकार-अनुरूप डिज़ाइन</p>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white mb-2">
          Neuro-<span className="text-[var(--saffron)]">Hire</span>
        </h1>
        <p className="text-xl font-semibold text-[var(--india-green)] dark:text-green-400 mb-6">
          AI इंटरव्यू तैयारी टूलकिट
        </p>

        <div className="w-24 h-1 mb-6 tricolor-strip rounded-full" />

        <p className="max-w-md text-neutral-700 dark:text-neutral-200 mb-8">
          Join for free. Practice voice-based mock interviews, get your resume matched against real
          job descriptions and official NCO occupation codes, and receive soft-skills feedback after
          every session.
        </p>

        <div className="max-w-md rounded-xl bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm p-5 border border-white/50 dark:border-neutral-700">
          <h3 className="font-semibold text-neutral-800 dark:text-white mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[var(--saffron)]" /> What you get
          </h3>
          <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--saffron)]" /> Free, always
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-neutral-400" /> Voice + text practice modes
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--india-green)]" /> English &amp; हिंदी support
            </li>
          </ul>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-14 bg-white dark:bg-neutral-950">
        <div className="w-full max-w-md">
          <div className="tricolor-strip rounded-full mb-6" />
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white text-center mb-1">
            {isLogin ? t("auth_sign_in") : t("auth_create_account")}
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center mb-8">
            {isLogin ? "Welcome back — let's keep practicing" : "Create your free jobseeker account"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="username">{t("auth_username")}</Label>
                <Input id="username" name="username" value={formData.username} onChange={handleChange} required />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t("auth_email")}</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("auth_password")}</Label>
              <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required minLength={6} />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-gradient-to-r from-[var(--saffron)] to-[var(--india-green)] hover:opacity-90 text-white font-semibold flex items-center justify-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              {isLoading ? "Processing..." : isLogin ? t("auth_sign_in") : t("auth_create_account")}
            </Button>
          </form>

          <div className="flex items-center justify-center mt-6 text-sm">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-[var(--india-green)] hover:underline font-medium"
            >
              {isLogin ? t("auth_no_account") : t("auth_has_account")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
