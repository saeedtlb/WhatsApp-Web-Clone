export const handleBackSpace = e => {
  if (e.key === "Backspace") {
    const { rows, value } = e.target;

    const lines = value.split("\n");

    if (lines[lines.length - 1] === "") {
      e.target.rows = rows > 2 ? rows - 1 : rows;
    }
  }
};

export const onEmojiClick = ({ unicode }) => {
  const codePoints = unicode.split("-").map(u => parseInt(u, 16));
  return String.fromCodePoint.apply(String, codePoints);
};
