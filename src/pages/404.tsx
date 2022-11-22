import { ErrorPage } from "../components/ErrorPage"

export const NotFoundPage: React.FC = () => {
    return <ErrorPage errorCode={404} errorText="You destroyed the fabric of spacetime."/>
}
