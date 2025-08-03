"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody,  } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconDashboard,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Dash from "./dash";
import ThemeToggle from "./ThemeToggle";
import Formpage from "@/app/dashboard/create-interview-form/page";

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
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
        "transition-colors hover:bg-gray-100 dark:hover:bg-neutral-700",
        active && "bg-gray-100 dark:bg-neutral-700",
        link.className
      )}
    >
      <span className="flex-shrink-0">{link.icon}</span>
      {link.label}
    </a>
  );
};

export function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: <IconDashboard className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Profile",
      href: "#",
      icon: <IconUserBolt className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Settings",
      href: "#",
      icon: <IconSettings className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="h-5 w-5 shrink-0" />,
    },
  ];

  const [open, setOpen] = useState(true);
  const [activeLink, setActiveLink] = useState("Dashboard");

  return (
    <div className={cn(
      "flex h-screen w-full bg-gray-50 dark:bg-neutral-900 ",
      "transition-all duration-300 ease-in-out"
    )}>
    <div className="fixed h-full">
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-6 h-full">
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="px-4 py-4">
            {open ? <Logo /> : <LogoIcon />}
          </div>
          
          <nav className="mt-4 flex-1 space-y-1 overflow-y-auto px-2">
            {links.map((link) => (
              <SidebarLink 
                key={link.label}
                link={{
                  ...link,
                  className: "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
                }}
                active={activeLink === link.label}
                onClick={() => setActiveLink(link.label)}
              />
            ))}
            <div className="ml-2 flex gap-3 mt-3 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white">
              <ThemeToggle/>
              <p>Mode</p>
            </div>
          </nav>
        </div>

        <div className="border-t border-neutral-200 px-4 py-4 dark:border-neutral-700">
          <SidebarLink
            link={{
              label: open ? "Manu Arora" : "",
              href: "#",
              icon: (
                <img
                  src="https://assets.aceternity.com/manu.png"
                  className="h-8 w-8 shrink-0 rounded-full object-cover"
                  alt="User avatar"
                />
              ),
              className: "text-neutral-800 dark:text-white"
            }}
            active={false}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  </div>
    <div className={`flex-1 overflow-auto transition-all duration-300 ${open ? 'ml-72' : 'ml-12'}`}>
          <Dash/>
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
      <div className="h-6 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <span className="text-lg font-semibold text-neutral-800 dark:text-white tracking-tight">
        AcetLabs
      </span>
    </motion.div>
  );
};

const LogoIcon = () => {
  return (
    <div className="flex h-10 w-10 items-center justify-center">
      <div className="h-6 w-6 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </div>
  );
};