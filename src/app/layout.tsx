import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google"; // Keep or remove based on preference/shadcn setup
import { ThemeProvider } from "@/components/theme-provider"; // Restore ThemeProvider import
import { Layout } from "@/components/layout/Layout"; // Import the Layout component
import "./globals.css";
import { cn } from "@/lib/utils"; // Import cn utility

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
// 
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Hazem Designs Work", // Ensure this is the desired title
  description: "Photography, Videography, and Film Portfolio", // Updated description
  icons: {
    icon: '/favicon.png', // Path relative to public folder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head /> {/* Explicitly add empty head tag */}
      <body className={cn("min-h-screen bg-background font-sans antialiased")}> {/* Added font-sans */}
        <ThemeProvider // Restore ThemeProvider wrapper
          attribute="class" // Use class for Tailwind dark mode
          defaultTheme="system" // Default to user's system preference
          enableSystem // Enable system preference detection
          disableTransitionOnChange // Optional: Prevent transitions on theme change
        >
          <Layout>{children}</Layout> {/* Wrap children with Layout */}
        </ThemeProvider>
      </body>
    </html>
  );
}
