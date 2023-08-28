import React from "react";
import ok from "./../images/ok.svg";


interface CardSuccessProps
{
    setFormState: Function,
}

function CardSuccess(props: CardSuccessProps) 
{
  return (
    <div className="wrapper for-card-success">
      <div className="card-success">
        <img src={ok} id="ok" alt="Success"/>
        <h1>THANK YOU!</h1>
        <h2>We've added your card details</h2>
        <button type="button" id="continue-button" onClick={()=>{props.setFormState("idle")}}>Continue</button>
      </div>
    </div>
  );
}

export default CardSuccess;
