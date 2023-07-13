"use client";

import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.scss";
import ReduxProvider from "@/store/provider";
import { ToastContainer } from "react-toastify";

const seo = {
  title: "Alpha Notes - Organize Your Self-Learning Journey with Ease",
  description:
    "Organize your self-learning journey with Alpha Notes - the app that lets you store notes, snippets, and references by the letters of the alphabet. Take your notes in markdown format and keep track of your progress with ease.",
  keywords: "self-learning, note-taking, markdown, references, organized notes",
  ogTitle: "Alpha Notes - Organize Your Self-Learning Journey with Ease",
  ogDescription:
    "Organize your self-learning journey with Alpha Notes - the app that lets you store notes, snippets, and references by the letters of the alphabet. Take your notes in markdown format and keep track of your progress with ease.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <html lang="en">
      <head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <meta property="og:title" content={seo.ogTitle} />
        <meta property="og:description" content={seo.ogDescription} />
      </head>
      <body className="text-slate-50 font-poppins">
        <ReduxProvider>{children}</ReduxProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
