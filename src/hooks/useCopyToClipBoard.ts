import { useState } from "react";

function useCopyToClipboard(): [boolean, (text: string) => void] {
  const [isCopied, setIsCopied] = useState(false);

  function copyToClipboard(text: string): void {
    navigator.clipboard
      .writeText(text)
      .then(() => setIsCopied(true))
      .catch(() => setIsCopied(false));

    setTimeout(() => setIsCopied(false), 2000);
  }

  return [isCopied, copyToClipboard];
}

export default useCopyToClipboard;
