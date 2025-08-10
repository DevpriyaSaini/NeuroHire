"use client";

import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";

interface Links {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be inside a SidebarProvider");
  return ctx;
}

export function SidebarProvider({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) {
  const [internal, setInternal] = useState(true);
  const open = openProp !== undefined ? openProp : internal;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setInternal;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function Sidebar({
  children,
  open,
  setOpen,
  animate = true,
}: React.ComponentProps<typeof SidebarProvider>) {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
}

export function SidebarBody(
  props: React.ComponentProps<typeof motion.div>
) {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as any)} />
    </>
  );
}

export function DesktopSidebar({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) {
  const { animate } = useSidebar();
  return (
    <motion.div
      className={cn(
        "h-full px-4 py-4 hidden md:flex flex-col bg-white dark:bg-gray-800 w-[300px] flex-none border-r border-gray-200 dark:border-gray-700",
        className
      )}
      {...props}
      layout={animate}
      style={animate ? { width: "300px" } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function MobileSidebar({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { open, setOpen } = useSidebar();

  return (
    <div className={cn("md:hidden", className)} {...props}>
      <div
        className="h-10 flex items-center justify-between px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
      >
        <IconMenu2
          className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              "fixed inset-0 bg-white dark:bg-gray-800 p-10 z-[100] flex flex-col justify-between",
              className
            )}
          >
            <div
              className="absolute top-10 right-10 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <IconX />
            </div>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
}) => {
  const { open, animate } = useSidebar();
  return (
    <a
      href={link.href}
      className={cn(
        "flex items-center gap-2 py-2 px-3 rounded-lg group/sidebar hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
        className
      )}
      {...props}
    >
      <span className="text-gray-700 dark:text-gray-300 group-hover/sidebar:text-blue-600 dark:group-hover/sidebar:text-blue-400">
        {link.icon}
      </span>
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-gray-700 dark:text-gray-300 group-hover/sidebar:text-blue-600 dark:group-hover/sidebar:text-blue-400 text-sm transition-all duration-150 whitespace-pre inline-block"
      >
        {link.label}
      </motion.span>
    </a>
  );
};