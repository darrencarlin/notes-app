import type { FC } from "react";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import html from "react-syntax-highlighter/dist/cjs/languages/prism/markup-templating";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("html", html);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("python", python);

interface MarkdownProps {
  markdown: string & { content?: string };
}

const Markdown: FC<MarkdownProps> = ({ markdown }) => {
  const syntaxTheme = oneDark;

  const MarkdownComponents = {
    code({ className, ...props }: any) {
      const hasLang = /language-(\w+)/.exec(className) ?? "";

      return hasLang ? (
        <SyntaxHighlighter style={syntaxTheme} language={hasLang[1] ?? ""}>
          {props.children}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props} />
      );
    },
  };

  return (
    <ReactMarkdown className="markdown" components={MarkdownComponents}>
      {markdown}
    </ReactMarkdown>
  );
};

export default Markdown;
