import React from "react";
import './Button.css';

const Button = ({children, color, txt}) => <>
    <div className="action-btn" style={{background:color, color: txt??"#ffffff"}}>
        {children}
    </div>
</>

export default Button;