
type JSXToJSONProps = {
    value: string | null
}

const JSXToJSON = ({ value }: JSXToJSONProps) => {
    return (
        <div>{value || 'Nada JSON'}</div>
    )
}

export default JSXToJSON