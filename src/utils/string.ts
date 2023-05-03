/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const listWordsInSentenceFormat = (
  words: string[],
  conjunction = "or"
): string => {
  if (words.length === 0) return "";
  if (words.length === 1) return words[0]!;
  const lastWord = words.pop();
  return [words.join(", "), lastWord].join(` ${conjunction} `);
};
