import { ReactElement } from "react"
import { AuthorizedRedirectWrapper } from "../hoc/AuthorizedRedirectWrapper"

export const wrapWithAuthRedirect = (component: ReactElement) => {
    return <AuthorizedRedirectWrapper>{component}</AuthorizedRedirectWrapper>
}