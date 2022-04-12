import React from "react"
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFunctions, Functions, httpsCallable } from 'firebase/functions';
import { getFirestore, Firestore } from 'firebase/firestore';


export type AppContextType = {
    firebase: FirebaseApp
    firestore: Firestore
    invokeFunction: (functionName: string, request: any) => Promise<any>
}

export const AppContext = React.createContext<AppContextType|null>(null);
export const AppContextProvider: React.FC = ({children}) => {
    
    const firebaseConfig = {
        apiKey: "AIzaSyAQGmn8B1Sk3aJGTQeMDpj36ix91VSPXtU",
        authDomain: "mogul-run.firebaseapp.com",
        projectId: "mogul-run",
        storageBucket: "mogul-run.appspot.com",
        messagingSenderId: "876100340137",
        appId: "1:876100340137:web:1942f8aee38bbece765cb8",
        measurementId: "G-YVGBHMQXPE"
      };
      
      // Initialize Firebase
      const firebase = initializeApp(firebaseConfig);
      const functions = getFunctions(firebase);
      const firestore = getFirestore(firebase);

      const invokeFunction = (functionName: string, request: any) => {
        const func = httpsCallable(functions, functionName);
        return func(request);
      }

    return <AppContext.Provider value={{
        firebase,
        firestore,
        invokeFunction,
    }}>
        {children}
    </AppContext.Provider>
}

