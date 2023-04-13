import { FC } from "react";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("json", json);

interface MarkdownProps {
  markdown: string & { content?: string };
}

const Markdown: FC<MarkdownProps> = ({ markdown }) => {
  const syntaxTheme = oneDark;

  const MarkdownComponents: object = {
    code({ className, ...props }: any) {
      const hasLang = /language-(\w+)/.exec(className || "");

      return hasLang ? (
        <SyntaxHighlighter style={syntaxTheme} language={hasLang[1]}>
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
