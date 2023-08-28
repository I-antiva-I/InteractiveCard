// Display ---------------------------------------------------------
export function fancyCardNumberForm(someString: string)
{
    let patternBadChars:RegExp  =   /\D/g;
    let patternFourDigits:RegExp =  /(\d{4})/g;

    someString = someString.replaceAll(patternBadChars, "");
    someString = someString.replaceAll(patternFourDigits, "$& ");
    someString = someString.trim();

    return someString;
}

export function fancyCardNumberDisplay(someString: string)
{
    return someString+"0000 0000 0000 0000".slice(someString.length);
}

export function fancyNumberDisplay(someString: string, length: number, placeholder: string)
{
    return placeholder.repeat(length).slice(someString.length)+someString;
}

// Validation ------------------------------------------------------
export enum ValidationResult
{
    VALID       ="valid",
    INVALID     ="invalid",
    EMPTY       ="empty",
    UNKNOWN     ="unknown",
    EXPIRED     ="expired",
}

export function validateName(nameString: string)
{
    nameString = nameString.trim();
    
    if (nameString.length === 0) {return ValidationResult.EMPTY;}

    let patternGood:RegExp = /^[A-Z \-]+$/g;
    let result = patternGood.test(nameString.toUpperCase());
    
    if (result) {return ValidationResult.VALID;} else {return ValidationResult.INVALID;}
}

export function validateNumber(numberString: string)
{
    numberString = numberString.trim();
    
    if (numberString.length === 0) {return ValidationResult.EMPTY;}

    let patternGood:RegExp = /\d{4} \d{4} \d{4} \d{4}/g;
    let result = patternGood.test(numberString);
    
    if (result) {return ValidationResult.VALID;} else {return ValidationResult.INVALID;}
}

export function validateMonth(monthString: string)
{
    monthString = monthString.trim();

    if (monthString.length === 0) {return ValidationResult.EMPTY;}

    let patternGoodMonth:RegExp = /^(0?[1-9]|1[012])$/g;
    let result = (patternGoodMonth.test(monthString));
    
    if (result) {return ValidationResult.VALID;} else {return ValidationResult.INVALID;}
}

export function validateYear(yearString: string)
{
    yearString = yearString.trim();

    if (yearString.length === 0) {return ValidationResult.EMPTY;}

    let patternGoodYear:RegExp = /^\d{1,2}$/g;
    let result = (patternGoodYear.test(yearString));
    
    if (result) {return ValidationResult.VALID;} else {return ValidationResult.INVALID;}
}

export function validateCVC(cvcString: string)
{
    cvcString = cvcString.trim();
    
    if (cvcString.length === 0) {return ValidationResult.EMPTY;}

    let patternGood:RegExp = /\d{3}/g;
    let result = patternGood.test(cvcString);
    
    if (result) {return ValidationResult.VALID;} else {return ValidationResult.INVALID;}
}

export function checkIfCardExpired(monthString: string, yearString: string)
{
    let monthMin =      new Date().getMonth()+1;
    let yearMin =       new Date().getFullYear() % 100;
    let monthNumber =   Number(monthString);
    let yearNumber =    Number(yearString);

    let result = ((yearMin<yearNumber) || ((monthMin<=monthNumber) && (yearMin===yearNumber)));

    return !result;
}

export function validationInfo(result: ValidationResult, key: string)
{
    switch (result)
    {
        case ValidationResult.INVALID:
            switch (key)
            {
                case "name":
                    return "Wrong format: letters, spaces and dashes only";
                case "number":
                    return "Wrong format: must contain 16 digits";
                case "month":
                    return "Invalid month";
                case "year":
                    return "Invalid year";
                case "month-and-year":
                    return "Invalid month and year";
                case "cvc":
                    return "Wrong format: must contain 3 digits";
                case "date":
                    return "Card is expired";
                default:
                    return "UNKNOWN KEY";
            }
        case ValidationResult.EMPTY:
            return "Can't be blank";
        case ValidationResult.UNKNOWN:
        case ValidationResult.VALID:
            return "";
        default:
            return "UNKNOWN RESULT TYPE";
    }
}

export function dateReduce(date: {month: ValidationResult, year: ValidationResult}, isExpired: boolean)
{   

    if ((date.month === ValidationResult.EMPTY) || (date.year === ValidationResult.EMPTY))
    {return {result: ValidationResult.EMPTY, key: ""}}

    if ((date.month === ValidationResult.INVALID) && (date.year === ValidationResult.INVALID))
    {return {result: ValidationResult.INVALID, key: "month-and-year"}}

    if (date.month === ValidationResult.INVALID)
    {return {result: ValidationResult.INVALID, key: "month"}}

    if (date.year === ValidationResult.INVALID)
    {return {result: ValidationResult.INVALID, key: "year"}}

    if ((date.month === ValidationResult.VALID) && (date.year === ValidationResult.VALID))
    {
        if (isExpired)
        {
            return {result: ValidationResult.INVALID, key: "date"}
        }
        else
        {
            return {result: ValidationResult.VALID, key: ""}
        }
        
    }

    return {result: ValidationResult.UNKNOWN, key: ""}
}