import "./globals.css";
import { Metadata } from "next";
import { Rubik } from "next/font/google";

const rubik = Rubik({ weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  description:
    'Solution for Frontend Mentor challenge "Interactive comments section"',
  title: "Frontend Mentor | Interactive comments section",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.className} bg-grey-50 antialiased`}>
        {children}
      </body>
    </html>
  );
}
