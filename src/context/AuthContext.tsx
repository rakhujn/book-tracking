import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react"

import { ProviderChildrenType } from "../types/ChildrenType"
import { auth } from "../service/firebase"
import { User, UserCredential, browserLocalPersistence, setPersistence, signInWithPopup, signOut,GoogleAuthProvider } from "firebase/auth"


export const AuthContext = createContext({})

export const AuthProvider = ({ children }: ProviderChildrenType) => {
    const [authChecked, setAuthChecked] = useState<boolean>(false)
    const [authUser, setAuthUser] = useState<User | null>(null)

    const logIn = () => {
        console.log('Loggin in...')
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                signInWithPopup(auth, new GoogleAuthProvider())
                    .then((user: UserCredential) => {
                        setAuthUser(user.user)
                        // console.info(user.user)
                    })
                    .catch(err => {
                        console.error(err.message)
                    })
            })
    }
    // SUHAIB  
    // can we create this in Wrapper.tsx
    // promise resolution= using "then"
    // promise rejection=using "catch"

    const logOut = () => {
        console.log('Logging out...')
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                signOut(auth)
                    .then(() => {
                        setAuthUser(null)
                    })
                    .catch(err => {
                        console.error(err.message)
                    })
            })
    }
    const checkIfAuthenticated = () => {
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                // console.log(auth.currentUser)
                setAuthUser(auth.currentUser)
                setAuthChecked(true)
            })
    }

    useEffect(() => {
        checkIfAuthenticated()
    }, [])

    return <AuthContext.Provider value={{ authUser, setAuthUser, authChecked, logIn, logOut }}>
        {children}
    </AuthContext.Provider>
}

export type AuthContextValueType = {
    authUser: User | null,
    setAuthUser: Dispatch<SetStateAction<User | null>>,
    authChecked: boolean,
    logIn: () => void,
    logOut: () => void,
}
