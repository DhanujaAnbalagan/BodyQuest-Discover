
import React, { createContext, useContext, useState } from 'react';

interface FocusContextType {
  isFocusMode: boolean;
  focusedElement: string | null;
  toggleFocusMode: () => void;
  setFocusedElement: (element: string | null) => void;
}

const FocusContext = createContext<FocusContextType | undefined>(undefined);

export const FocusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [focusedElement, setFocusedElement] = useState<string | null>(null);

  const toggleFocusMode = () => {
    setIsFocusMode(!isFocusMode);
    if (isFocusMode) {
      setFocusedElement(null);
    }
  };

  return (
    <FocusContext.Provider
      value={{
        isFocusMode,
        focusedElement,
        toggleFocusMode,
        setFocusedElement,
      }}
    >
      <div className={isFocusMode ? 'focus-mode' : ''}>
        {children}
      </div>
    </FocusContext.Provider>
  );
};

export const useFocus = () => {
  const context = useContext(FocusContext);
  if (context === undefined) {
    throw new Error('useFocus must be used within a FocusProvider');
  }
  return context;
};
