import { ReactElement } from "react"
import { AuthProtect } from '../hoc/AuthProtect';

export const getProtected = (component: ReactElement) => {
    return <AuthProtect>{component}</AuthProtect>
}