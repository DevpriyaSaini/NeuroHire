import { SidebarDemo } from "@/components/sidebar";


export default function dashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body>
            {children}
      
      </body>
    </html>
  );
}
