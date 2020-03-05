import React from "react";

interface props {
    type?: string
}

const Alert:React.FC<props> = ({type = 'warning', children}) => {
    return (
        <div className={`alert alert-${type}`}role="alert">
            {children}
        </div>
    )
}

export default Alert