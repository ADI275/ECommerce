import React from 'react';

const ErrorMessage = (props) => {
    return (
        <div style={{display: "flex",color: "red",width: "100%", background: "#ffcccb",height: "3.5rem",
            justifyContent: "center",marginTop: "1em",alignItems: "center"}}>
            {props.children}
        </div>
    );
}
 
export default ErrorMessage;