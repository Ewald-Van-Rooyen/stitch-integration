type ButtonProps = {
    text: string;
    onClick: () => void;
}

function Button({text, onClick}: ButtonProps
) {
    return (<>
        <button onClick={onClick} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            {text}
        </button>
    </>);
}

export default Button;