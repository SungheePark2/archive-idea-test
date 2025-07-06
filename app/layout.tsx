import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "./../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "할 일 목록 | Archive Idea",
  description: "효율적인 할 일 관리를 위한 심플한 투두리스트 애플리케이션입니다.",
  keywords: ["할 일 목록", "투두리스트", "task management", "todo list", "productivity"],
  authors: [{ name: "Archive Idea" }],
  creator: "Archive Idea",
  publisher: "Archive Idea",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "할 일 목록 | Archive Idea",
    description: "효율적인 할 일 관리를 위한 심플한 투두리스트 애플리케이션입니다.",
    url: "https://archive-idea-test-azure.vercel.app",
    siteName: "Archive Idea",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body className={`${pretendard.variable} antialiased`}>{children}</body>
    </html>
  );
}