import "./globals.css";
import { Rubik } from "next/font/google";

const rubik = Rubik({ weight: ["400", "500", "700"] });

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
