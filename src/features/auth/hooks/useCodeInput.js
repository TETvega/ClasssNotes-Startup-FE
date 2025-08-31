import { useState, useRef } from "react";

export const useCodeInput = (length = 6) => {
  const [code, setCode] = useState(Array(length).fill(""));
  const inputRefs = Array(length)
    .fill(null)
    .map(() => useRef(null));

  const handleInputChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value !== "" && index < length - 1) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();

    if (/^\d{1,6}$/.test(pasteData)) {
      const newCode = [...code];
      for (let i = 0; i < Math.min(pasteData.length, length); i++) {
        newCode[i] = pasteData[i];
      }
      setCode(newCode);

      const nextEmptyIndex = newCode.findIndex((char) => char === "");
      if (nextEmptyIndex !== -1) {
        inputRefs[nextEmptyIndex].current.focus();
      } else {
        inputRefs[length - 1].current.focus();
      }
    }
  };

  return {
    code,
    setCode,
    inputRefs,
    handleInputChange,
    handleKeyDown,
    handlePaste,
  };
};
