import React from 'react';

/**
 * ClickableText
 * Renders English text where words are clickable.
 * Clicking a word triggers onWordClick(word) to open the dictionary or save to vocab.
 */
export default function ClickableText({ text, onWordClick, className = '' }) {
  if (!text) return null;

  // Split text by tokens while preserving punctuation and spacing
  const tokens = text.split(/(\s+|[.,!?;:()[\]"'])/);

  return (
    <span className={`leading-relaxed ${className}`}>
      {tokens.map((token, idx) => {
        // If token is purely a word (alphabetical)
        const isWord = /^[a-zA-Z]{2,}$/.test(token);

        if (isWord) {
          return (
            <span
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                if (onWordClick) onWordClick(token);
              }}
              title={`클릭하여 '${token}' 단어장에 추가 / 뜻 조회`}
              className="word-lookup cursor-pointer hover:bg-amber-100 hover:text-amber-900 dark:hover:bg-amber-900/40 dark:hover:text-amber-200 rounded px-0.5 transition-colors"
            >
              {token}
            </span>
          );
        }

        return <span key={idx}>{token}</span>;
      })}
    </span>
  );
}
