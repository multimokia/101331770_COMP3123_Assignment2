import { ErrorPage } from "../components/ErrorPage"

export const UnauthorizedPage: React.FC = () => {
    return <ErrorPage errorCode={401} errorText="You shouldn't be here."/>
}
