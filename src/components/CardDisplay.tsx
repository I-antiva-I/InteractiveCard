import { fancyCardNumberDisplay, fancyNumberDisplay } from "../utility";
import logo from "./../images/card_logo.svg";

interface InputData
{
  name:   string,
  number: string,
  month:  string,
  year:   string,
  cvc:    string,
}

interface CardDisplayProps
{
    inputData: InputData,
}

function CardDisplay(props: CardDisplayProps) 
{
  return (
    <div className="wrapper for-card-display">
      <div className="card-display">
          <div className="card-back">
            <div className="card-info card-cvc">{fancyNumberDisplay(props.inputData.cvc, 3, "X")} </div>
          </div>

          <div className="card-face">
            <div className="card-logo">
              <img src={logo} id="logo" alt="Card logo"/>
            </div>
            <div className="card-info card-number">{fancyCardNumberDisplay(props.inputData.number)}</div>
            <div className="card-info group-nd">
              <div className="card-info card-name">{(props.inputData.name) ? props.inputData.name : "Name Surname"}</div>
              <div className="card-info card-date">
                {fancyNumberDisplay(props.inputData.month, 2, "0")+"/"+fancyNumberDisplay(props.inputData.year, 2, "0")}
              </div>
            </div>

          </div>
      </div>
    </div>
  );
}

export default CardDisplay;
