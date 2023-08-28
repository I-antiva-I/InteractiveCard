import React, { useState } from "react";
import CardForm from "./CardForm";
import CardDisplay from "./CardDisplay";
import CardSuccess from "./CardSuccess";

interface InputData
{
  name:   string,
  number: string,
  month:  string,
  year:   string,
  cvc:    string,
}


function App() 
{
  // Current state of the form
  let [formState, setFormState] = useState("idle");

  // Form values
  let [inputData, setInputData] = useState<InputData>({name:"", number: "", month: "", year: "", cvc: "",});

  //    
  return (
    <div className="application">
      <CardDisplay inputData={inputData} />
      {
        (formState=== "submitted") ? 
        <CardSuccess setFormState={setFormState}/> :
        <CardForm inputData={inputData} setInputData={setInputData} setFormState={setFormState}/>
      }
    </div>
  );
}

export default App;
