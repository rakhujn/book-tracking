import { AuthProvider } from "./context/AuthContext"
import { ProviderChildrenType } from "./types/ChildrenType"

export const Wrapper = ({ children }: ProviderChildrenType): JSX.Element => {
    return <>
        <AuthProvider>
            {children}
        </AuthProvider>
    </>
}
