import Head from "next/head";
import React, { type FC } from "react";

interface Props {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
}

const SearchEngineOptimization: FC<Props> = ({
  title = "Alpha Notes - Organize Your Self-Learning Journey with Ease",
  description = "Organize your self-learning journey with Alpha Notes - the app that lets you store notes, snippets, and references by the letters of the alphabet. Take your notes in markdown format and keep track of your progress with ease.",
  keywords = "self-learning, note-taking, markdown, references, organized notes",
  ogTitle = "Alpha Notes - Organize Your Self-Learning Journey with Ease",
  ogDescription = "Organize your self-learning journey with Alpha Notes - the app that lets you store notes, snippets, and references by the letters of the alphabet. Take your notes in markdown format and keep track of your progress with ease.",
}): JSX.Element => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
    </Head>
  );
};

export default SearchEngineOptimization;
