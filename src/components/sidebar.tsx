"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody,  } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconDashboard,
  IconFileText,
  IconHistory,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import Dash from "./dash";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import Formpage from "@/app/dashboard/create-interview-form/page";
import { useLanguage } from "@/lib/i18n";

interface SidebarLinkProps {
  link: {
    label: string;
    href: string;
    icon: React.ReactNode;
    className?: string;
  };
  active?: boolean;
  onClick?: () => void;
}

export const SidebarLink = ({ link, active = false, onClick }: SidebarLinkProps) => {
  return (
    <a
      href={link.href}
      onClick={(e) => {
        if (link.href === "#") e.preventDefault();
        onClick?.();
      }}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
        "transition-colors hover:bg-orange-50 dark:hover:bg-neutral-700",
        active && "bg-orange-50 dark:bg-neutral-700 border-l-2 border-[var(--india-green)]",
        link.className
      )}
    >
      <span className="flex-shrink-0">{link.icon}</span>
      {link.label}
    </a>
  );
};

export function SidebarDemo() {
  const { t } = useLanguage();
  const { data: session } = useSession();
  const links = [
    {
      label: t("side_dashboard"),
      href: "/dashboard",
      icon: <IconDashboard className="h-5 w-5 shrink-0" />,
    },
    {
      label: t("side_resume_fit"),
      href: "/dashboard/resume-score",
      icon: <IconFileText className="h-5 w-5 shrink-0" />,
    },
    {
      label: t("side_history"),
      href: "/dashboard/history",
      icon: <IconHistory className="h-5 w-5 shrink-0" />,
    },
    {
      label: t("side_profile"),
      href: "/",
      icon: <IconUserBolt className="h-5 w-5 shrink-0" />,
    },
  ];

  const [open, setOpen] = useState(true);
  const [activeHref, setActiveHref] = useState("/dashboard");

  return (
    <div className={cn(
      "flex h-screen w-full bg-gray-50 dark:bg-neutral-900 ",
      "transition-all duration-300 ease-in-out"
    )}>
    <div className="fixed h-full">
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-6 h-full">
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="tricolor-strip" />
          <div className="px-4 py-4">
            {open ? <Logo /> : <LogoIcon />}
          </div>
          
          <nav className="mt-4 flex-1 space-y-1 overflow-y-auto px-2">
            {links.map((link, idx) => (
              <SidebarLink
                key={idx}
                link={{
                  ...link,
                  className: "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
                }}
                active={activeHref === link.href && link.href !== "#"}
                onClick={() => setActiveHref(link.href)}
              />
            ))}
            <div className="ml-2 flex items-center gap-3 mt-3 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white">
              <ThemeToggle/>
              <p>{t("side_mode")}</p>
              <LanguageToggle/>
            </div>
          </nav>
        </div>

        <div className="border-t border-neutral-200 px-4 py-4 dark:border-neutral-700 space-y-1">
          <SidebarLink
            link={{
              label: open ? (session?.user?.username || "") : "",
              href: "#",
              icon: (
                <img
                  src={session?.user?.image || "https://imgs.search.brave.com/bp2Ql2VvSlzRPbC9lOoqhctFp0Claipwq-gCTbckZ4E/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9waXhs/ci5jb20vaW1hZ2Vz/L2dlbmVyYXRvci9w/aG90by1nZW5lcmF0/b3Iud2VicA"}
                  className="h-8 w-8 shrink-0 rounded-full object-cover"
                  alt="User avatar"
                />
              ),
              className: "text-neutral-800 dark:text-white"
            }}
            active={false}
          />
          <SidebarLink
            link={{
              label: t("side_logout"),
              href: "#",
              icon: <IconArrowLeft className="h-5 w-5 shrink-0" />,
              className: "text-neutral-600 dark:text-neutral-300 hover:text-red-600 dark:hover:text-red-400"
            }}
            onClick={() => signOut({ callbackUrl: "/sign-in" })}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  </div>

      

     
    </div>
  );
}

const Logo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-2"
    >
      <img className="h-15 w-15 shrink-0 rounded-full object-cover"src="https://imgs.search.brave.com/bp2Ql2VvSlzRPbC9lOoqhctFp0Claipwq-gCTbckZ4E/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9waXhs/ci5jb20vaW1hZ2Vz/L2dlbmVyYXRvci9w/aG90by1nZW5lcmF0/b3Iud2VicA" alt="logo" />
      <span className="text-lg font-semibold text-neutral-800 dark:text-white tracking-tight">
        Neuro-Hire
      </span>
    </motion.div>
  );
};

const LogoIcon = () => {
  return (
    <div className="flex h-10 w-10 items-center justify-center">
      <div className="h-6 w-6 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-gradient-to-br from-[var(--saffron)] to-[var(--india-green)]" />
    </div>
  );
};