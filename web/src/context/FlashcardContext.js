import { createContext, useState, useContext } from "react";

const FlashcardContext = createContext();

export const useFlashcards = () => useContext(FlashcardContext);

export const FlashcardProvider = ({ children }) => {
  const [flashcards, setFlashcards] = useState([]);

  const addFlashcard = (newCard) => {
    setFlashcards((prev) => [...prev, newCard]);
  };

  return (
    <FlashcardContext.Provider value={{ flashcards, addFlashcard }}>
      {children}
    </FlashcardContext.Provider>
  );
};