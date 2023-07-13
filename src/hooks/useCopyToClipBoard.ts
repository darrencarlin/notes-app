"use client"

import { useState } from "react";

/**
 * useCopyToClipboard hook.
 * Copies text to the clipboard.
 * @returns {boolean} True if the text was copied to the clipboard.
 * @returns {function} A function that copies text to the clipboard.
 */

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
