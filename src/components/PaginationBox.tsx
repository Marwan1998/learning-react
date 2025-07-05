import type { ReactNode } from "react";

interface Props {
    isDisabled: boolean;
    onClick: () => void;
    children: ReactNode;
}

const PaginationBox = ({ isDisabled = false, onClick, children }: Props) => {
    const textColor = isDisabled ? "text-gray-400 cursor-not-allowed" : "text-white hover:bg-blue-950 cursor-pointer";

    const classes = `${textColor} font-bold py-2 px-4 bg-dark-100 p-4 rounded-b-xl rounded-t-xl shadow-inner shadow-light-100/10 m-1`

    return (
        <button
            type="button"
            className={classes}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default PaginationBox;
