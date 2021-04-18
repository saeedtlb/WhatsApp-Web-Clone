export const onEmojiClick = ({ unicode }) => {
  const codePoints = unicode.split("-").map(u => parseInt(u, 16));
  return String.fromCodePoint.apply(String, codePoints);
};
