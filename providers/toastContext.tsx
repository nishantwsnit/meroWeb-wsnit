"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Alert, Message } from "@aws-amplify/ui-react";

type MessageContextType = {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  alertMessage: ReactNode | null;
};

const MessageContext = createContext<MessageContextType>({
  showSuccess: () => {},
  showError: () => {},
  alertMessage: null,
});

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [alertMessage, setAlertMessage] = useState<ReactNode | null>(null);

  const showSuccess = (message: string) => {
    setAlertMessage(
      <Message
        colorTheme="success"
        variation="filled"
        heading="Success"
        isDismissible
      >
        {message}
      </Message>
    );
    setTimeout(() => setAlertMessage(null), 3000);
  };

  const showError = (message: string) => {
    setAlertMessage(
      <Message
        colorTheme="error"
        variation="filled"
        heading="Error"
        isDismissible
      >
        {message}
      </Message>
    );
    setTimeout(() => setAlertMessage(null), 3000); // Auto-hide after 3 seconds
  };

  return (
    <MessageContext.Provider value={{ showSuccess, showError, alertMessage }}>
      {alertMessage && <div className="snackbar">{alertMessage}</div>}
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
