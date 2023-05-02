
import React, { useContext, useEffect, useState } from "react";
import AuthModal from "../subdomains/communities/components/auth/auth-modal";
import useModal from "../hooks/useModal";

// let ModalContext;
export const ModalContext = React.createContext<any | null>(null);
export function useAuthModal() {
    return useContext(ModalContext);
}

export const ModalProvider : React.FC = ({children}) => {
  let { modal, handleModal, is_login} = useModal();
  return (
    <ModalContext.Provider value={{ modal, handleModal, is_login}}>
      <AuthModal />
      {children}
    </ModalContext.Provider>
  );
};

