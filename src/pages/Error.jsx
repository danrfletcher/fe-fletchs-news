import { useParams, useLocation } from 'react-router-dom';

export const Error = () => {
    const { statusCode } = useParams();
    const location = useLocation();
    const statusText = location.state?.statusText || "No error details";

    return <p>This will be the error page. {statusCode} {statusText}</p>
}