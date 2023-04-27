import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from './alert'
import ShowHide from './show-hide'

type Props = {
    error: string | undefined
    alertProps?: React.ComponentProps<typeof Alert>
    className?: string;
}

const ErrorAlert = ({ error, className, ...props }: Props) => {
    return (
        <ShowHide show={error !== undefined}>
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {error}
                </AlertDescription>
            </Alert>
        </ShowHide>
    )
}

export default ErrorAlert