import React, { useEffect, useState } from "react";
import { ValidationResult, checkIfCardExpired, dateReduce, fancyCardNumberForm, validateCVC, validateMonth, validateName, validateNumber, validateYear, validationInfo } from "../utility";

interface InputData
{
  name:   string,
  number: string,
  month:  string,
  year:   string,
  cvc:    string,
}

interface InputDateState
{
    month:  ValidationResult;
    year:   ValidationResult;
}

interface CardFormProps
{
    inputData: InputData,
    setInputData: Function,

    setFormState: Function,
}


function CardForm(props: CardFormProps) 
{
    let [inputNameState, setInputNameState] =       useState(ValidationResult.UNKNOWN);
    let [inputNumberState, setInputNumberState] =   useState(ValidationResult.UNKNOWN);
    let [inputCVCState, setInputCVCState,] =        useState(ValidationResult.UNKNOWN);
    let [inputDateState, setInputDateState] =       useState<InputDateState>({month: ValidationResult.UNKNOWN, year: ValidationResult.UNKNOWN});
    
    let [isCardExpired, setIsCardExpired] =         useState(false);

    useEffect(() => 
    {
        if ((inputDateState.year === ValidationResult.VALID) && (inputDateState.month === ValidationResult.VALID))
        {
            setIsCardExpired(checkIfCardExpired(props.inputData.month, props.inputData.year))
        }
    }, [inputDateState]);



    let handleInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>
    {
        let key = event.target.name;
        let value = event.target.value;

        switch(key)
        {
            case "name":
                break;    
            case "number": 
                if (value.length > 19) {return} 
                value = fancyCardNumberForm(value);
                // Possible jumping cursor fix 
                // https://codesandbox.io/s/boring-dirac-utq82?file=/src/App.tsx:136-460
                break;
            case "month":
            case "year":
                if (value.length > 2) {value=value.substring(value.length-2, value.length);}  
                break;
            case "cvc":
                if (value.length > 3) {value=value.substring(value.length-3, value.length);}  
                break;
            default:
                console.log("Unknown key...", key);
        }
        // Update values
        props.setInputData({...props.inputData, [key]: value});
    }

    let handleSubmission = (event: React.FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();

        if ((validateName(props.inputData.name) === ValidationResult.VALID) &&
            (validateCVC(props.inputData.cvc) === ValidationResult.VALID) &&
            (validateMonth(props.inputData.month) === ValidationResult.VALID) &&
            (validateYear(props.inputData.year) === ValidationResult.VALID) &&
            (validateNumber(props.inputData.number) === ValidationResult.VALID) &&
            (!checkIfCardExpired(props.inputData.month, props.inputData.year)))
            {
                props.setFormState("submitted");
            }    
        else
        {
            console.log("Bad",validateName(props.inputData.name));
        }
    }

    let dr = dateReduce(inputDateState, isCardExpired);
  
    return (
    <div className="wrapper for-card-form">
        <form className="card-form" onSubmit={handleSubmission}>
            <div className="input-group group-card-name">
                <label>Cardholder name</label>
                <div className="wrapper for-input-field">
                    <input type="text" autoComplete="off" name="name" value={props.inputData?.name}
                        placeholder="e.g. John Doe" 
                        className=  {"input-field input-state-"+inputNameState}
                        onChange=   {handleInputChange}
                        onBlur=     {()=>{setInputNameState(validateName(props.inputData.name));}}
                        />
                </div>

                <label className={"status input-info-"+inputNameState}>{validationInfo(inputNameState, "name")}</label>
            </div>

            <div className="input-group group-card-number">
                <label>Card number</label>
                <div className="wrapper for-input-field">
                    <input type="text" inputMode="numeric" autoComplete="off" name="number" value={props.inputData?.number}
                        placeholder="e.g. 1234 2345 3456 4567" 
                        className=  {"input-field input-state-"+inputNumberState}
                        onChange=   {handleInputChange}
                        onBlur=     {()=>{setInputNumberState(validateNumber(props.inputData.number));}}
                        />
                </div>
                <label className={"status input-info-"+inputNumberState}>{validationInfo(inputNumberState, "number")}</label>
            </div>

            <div className="input-group group-card-date">
                <label>EXP. date (MM/YY)</label>
                <div className="wrapper for-input-field">
                    <input type="number" inputMode="numeric" autoComplete="off" name="month" value={props.inputData?.month} 
                        placeholder="MM" 
                        className=  {"status input-field input-state-"+((isCardExpired) ? "invalid" : inputDateState.month)} 
                        onChange=   {handleInputChange}
                        onBlur=     {()=>{setInputDateState({...inputDateState, month: validateMonth(props.inputData.month)});}}
                        />
                </div>
                <div className="wrapper for-input-field">
                <input type="number" inputMode="numeric" autoComplete="off" name="year" value={props.inputData?.year}
                    placeholder="YY" 
                    className=  {"input-field input-state-"+((isCardExpired) ? "invalid" : inputDateState.year)} 
                    onChange=   {handleInputChange}
                    onBlur=     {()=>{setInputDateState({...inputDateState, year: validateYear(props.inputData.year)});}}
                    />
                </div>
                <label className={"status input-info-"+dr.result}>{validationInfo(dr.result, dr.key)}</label>
            </div>
        
        <div className="input-group group-card-cvc">
                <label>CVC</label>
                <div className="wrapper for-input-field">
                    <input type="number" inputMode="numeric" autoComplete="off" name="cvc" value={props.inputData?.cvc}
                        placeholder="e.g. 123" 
                        className=  {"input-field input-state-"+inputCVCState} 
                        onBlur=     {()=>{setInputCVCState(validateCVC(props.inputData.cvc));}}
                        onChange=   {handleInputChange}
                        />
                </div>
                <label className={"status input-info-"+inputCVCState}>{validationInfo(inputCVCState, "cvc")}</label>
        </div>

        <button type="submit" id="submit-button">Confirm</button>
        </form>
    </div>

  );
}

export default CardForm;
