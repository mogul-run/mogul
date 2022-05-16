
import React, { useContext } from "react";
import AuthModal from "../components/auth-modal";
import useModal from "../hooks/useModal";

// let ModalContext;
export const ModalContext = React.createContext<any | null>(null);
export function useAuthModal() {
    return useContext(ModalContext);
}

export const ModalProvider : React.FC = ({children}) => {
  let { modal, handleModal } = useModal();
  return (
    <ModalContext.Provider value={{ modal, handleModal }}>
      <AuthModal/>
      {children}
    </ModalContext.Provider>
  );
};

