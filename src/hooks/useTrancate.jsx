export default function useTrancate() {
  const trunscatetext = (text, maxlenght) => {
    if (text.length > maxlenght) {
      return text.slice(0, maxlenght) + "...";
    }

    return text;
  };

  return { trunscatetext };
}
