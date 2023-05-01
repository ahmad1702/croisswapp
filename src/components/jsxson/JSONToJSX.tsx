type JSONToJSXProps = {
    value: string | null
}
const JSONToJSX = ({ value }: JSONToJSXProps) => {
    return (
        <div>{value || 'Nada JSX'}</div>
    )
}

export default JSONToJSX