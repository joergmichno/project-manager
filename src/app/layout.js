import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Project Manager – Dashboard",
  description: "Ein modernes Projektmanagement-Dashboard für Freelancer und kleine Teams. Portfolio-Projekt von Jörg Michno.",
  keywords: ["projektmanagement", "dashboard", "next.js", "react", "portfolio"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
