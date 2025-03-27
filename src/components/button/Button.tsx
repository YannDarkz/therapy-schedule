interface ButtonProps {
    text: string;
    onClick?: ()=> void;

}

export default function Button({text, onClick}: ButtonProps) {

    return (
        <button className="border bg-amber-300" onClick={onClick} >{text}</button>
    )

}