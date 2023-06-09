import { ReactElement } from "react"
import { AuthProtect } from '../hoc/AuthProtect';

export const getProtectedPage = (component: ReactElement) => {
    return <AuthProtect>{component}</AuthProtect>
}