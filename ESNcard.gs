
/**
 * Validates and processes an array or single string of ESN card numbers using the 'isESNcardvalid' function.
 *
 * @param {string|string[]} inputRange - The ESN card number(s) to validate and process. This parameter can be a single string or an array of strings.
 * @return {string[][]} Returns a two-dimensional array of processed ESN card numbers. Each inner array contains a single string representing the validation result for the corresponding input string. If the input is empty or invalid, an empty string is included in the output.
 */
function ESNCARD_VALIDATION(inputRange) 
{

  // Check if the inputRange is not empty
  if (!inputRange) return null;
  
  // Check if the inputRange is a single string
  if (!Array.isArray(inputRange) && !Array.isArray(inputRange[0])) 
  {
    // If it's a single string, wrap it in an array for processing
    inputRange = [[inputRange]];
  }

  var output = [];

  // Loop through each row in the input range
  for (var i = 0; i < inputRange.length; i++) 
  {
    var row = inputRange[i];

    // Perform your validation or processing logic for each row here
    // For this example, we'll simply concatenate the values in the row into a single string
    var rowValue = String(row)


    if (rowValue == "" || rowValue == undefined || rowValue == null)
    {
      output.push([""]);
    }
    else
    {
      // Add the processed row to the output
      output.push([isESNcardvalid(rowValue)]);
    }
    
  }
  Logger.log(output)
  return output;
}



/**
 * Checks the validity of an ESN card number by making an HTTP request to the ESNcard API.
 *
 * @param {string} ESNcard_Number - The ESN card number to validate.
 * @return {string} Returns one of the following values:
 *   - "Invalid" if the ESN card number is not found or the API response is undefined.
 *   - "active" or "expired" if the ESN card is found and has one of these statuses.
 *   - "N/A" if the ESN card status is neither "active" nor "expired".
 */
function isESNcardvalid(ESNcard_Number)
{
  let JSONdata = UrlFetchApp.fetch("https://esncard.org/services/1.0/card.json?code=" + ESNcard_Number.toString)
  let responseJSONString = JSON.parse(JSONdata)
  let responseOBJ = responseJSONString[0]

  if (responseJSONString == undefined)
  {
    return "Invalid"
  }
  else if (responseJSONString == '' || responseOBJ == null)
  {
    return
  }
  else if (responseOBJ.status == 'active' || responseOBJ.status == 'expired')
  {
    return responseOBJ.status
  }
  else
  {
    return "N/A"
  }
}



/**
 * Validates and processes an array or single string of ESN card numbers using the 'isESNcardData' function.
 *
 * @param {string|string[]} inputRange - The ESN card number(s) to validate and process. This parameter can be a single string or an array of strings.
 * @return {string[][]} Returns a two-dimensional array of processed ESN card numbers. Each inner array contains a single string representing the validation result for the corresponding input string. If the input is empty or invalid, an empty string is included in the output.
 */
function ESNCARD_DATA(inputRange) 
{

  // Check if the inputRange is not empty
  if (!inputRange) return null;
  
  // Check if the inputRange is a single string
  if (!Array.isArray(inputRange) && !Array.isArray(inputRange[0])) 
  {
    // If it's a single string, wrap it in an array for processing
    inputRange = [[inputRange]];
  }

  var output = [];

  // Loop through each row in the input range
  for (var i = 0; i < inputRange.length; i++) 
  {
    var row = inputRange[i];

    // Perform your validation or processing logic for each row here
    // For this example, we'll simply concatenate the values in the row into a single string
    var rowValue = String(row)


    if (rowValue == "" || rowValue == undefined || rowValue == null)
    {
      output.push([""]);
    }
    else
    {
      // Add the processed row to the output
      output.push(isESNcardData(rowValue));
    }
    
  }
  Logger.log(output)
  return output;
}



/**
 * Checks the validity of an ESN card number by making an HTTP request to the ESNcard API.
 *
 * @param {string} ESNcard_Number - The ESN card number to validate.
 * @return {string} Returns one of the following values:
 *   - "Invalid" if the ESN card number is not found or the API response is undefined.
 *   - "active" or "expired" if the ESN card is found and has one of these statuses.
 *   - "N/A" if the ESN card status is neither "active" nor "expired".
 */
function isESNcardData(ESNcard_Number)
{
  //var ESNcard_Number = "1705278ZQX4"
  
  let JSONdata = UrlFetchApp.fetch("https://esncard.org/services/1.0/card.json?code=" + String(ESNcard_Number))
  let responseJSONString = JSON.parse(JSONdata)
  Logger.log(responseJSONString)
  // [{"code":"1705278ZQX4","tid":"2386480","expiration-date":"2024-02-03","status":"expired","section-code":"GR-CHAN-ESN","activation date":"2023-02-03"}]

  let responseOBJ = responseJSONString[0]

    //Logger.log(responseOBJ)
  if (responseJSONString == undefined || responseJSONString == '' || responseOBJ == null)
  {
    return ["Invalid"]
  }
  else if (responseOBJ.status == 'active' || responseOBJ.status == 'expired')
  {
   return ["Exp. Date", responseOBJ["expiration-date"], "Status", responseOBJ["status"], "section-code", responseOBJ["section-code"], "Activation Date", responseOBJ["activation date"]]
  }
  else
  {
    return "N/A"
  }

}
