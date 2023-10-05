import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scheduler",
  description: "Beautiful schedule UI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster
          toastOptions={{
            duration: 3000,
            success: {
              style: {
                background: "rgb(34 197 94)",
                color: "white",
              },
              iconTheme: {
                primary: "white",
                secondary: "rgb(34 197 94)",
              },
            },
            error: {
              style: {
                background: "rgb(239 68 68)",
                color: "white",
              },

              iconTheme: {
                primary: "white",
                secondary: "rgb(239 68 68)",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
