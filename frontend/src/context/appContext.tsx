import React, { useEffect, useState } from "react"
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFunctions, Functions, httpsCallable } from 'firebase/functions';

export type AppContextType = {
    firebase: FirebaseApp
    invokeFunction: (functionName: string, request: any) => Promise<any>
}

export const AppContext = React.createContext<AppContextType|null>(null);
export const AppContextProvider: React.FC = ({children}) => {
    
    const firebaseConfig = {
        apiKey: "AIzaSyAQGmn8B1Sk3aJGTQeMDpj36ix91VSPXtU",
        authDomain: "mogul-run.firebaseapp.com",
        projectId: "mogul-run",
        databaseURL: "https://mogul-run.firebaseio.com/",
        storageBucket: "mogul-run.appspot.com",
        messagingSenderId: "876100340137",
        appId: "1:876100340137:web:1942f8aee38bbece765cb8",
        measurementId: "G-YVGBHMQXPE"
      };

      
      // Initialize Firebase
      const firebase = initializeApp(firebaseConfig);
      const functions = getFunctions(firebase);

      const invokeFunction = (functionName: string, request: any) => {
        const func = httpsCallable(functions, functionName);
        return func(request);
      }



    return <AppContext.Provider value={{
        firebase,
        invokeFunction,
    }}>
        {children}
    </AppContext.Provider>
}

