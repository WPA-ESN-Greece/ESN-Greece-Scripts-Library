//Authentication Window
function authPopUp()
{
  var authInfo = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL)
  
  if (authInfo.getAuthorizationStatus() == 'REQUIRED'){

    var authUrl = authInfo.getAuthorizationUrl()
    var ui = SpreadsheetApp.getUi()
    var message = HtmlService.createHtmlOutput(`<p style="font-family: 'Open Sans'">Authenticate your script.<a href="${authUrl}"target="_blank">here</a></p>`).setWidth(400).setHeight(60)
    SpreadsheetApp.getUi().showModalDialog(message,"Authentication")
  }
}

// Check the type of a varible.
/** 
 * Checks if a variable matches a specified data type.
 *
 * @param {*} variable - The variable to be checked.
 * @param {string} type - The expected data type (e.g., 'string', 'number', 'object', etc.).
 * @returns {boolean} `true` if the variable's type matches the specified type, otherwise `false`.
 * 
 * ### Types in Javascript:
 * * Number       | *Example:* ```let age = 25```
 * * String       | *Example:* ```let name = 'John'```
 * * Boolean      | *Example:* ```let isStudent = true```
 * * Null         | *Example:* ```let result = null```
 * * Undefined    | *Example:* ```let score```
 * * Object       | *Example:* ```let person = {name: 'John',age: 25}```
 * * Array        | *Example:* ```let numbers = [1, 2, 3, 4, 5]```
 * * Function     | *Example:* ```function greet(name) {}```
 * * Symbol       | *Example:* ```let id = Symbol()```
 * 
 * ``` javascript
 * function typeCheck(variable, type) 
 * ```
 */
function typeCheck(variable, type) 
{
  if (typeof variable === type) 
  {
    Logger.log("Valid type")
    return true
  } 
  
  else 
  {
    Logger.log("Wrong type")
    return false   
  }
}


//Day of the week function. Returns a numeric value that coresponds to a days of the week.
/**
 * Returns a numeric value that corresponds to the day of the week.
 *
 * @param {string} string - The name of the day (e.g., 'Monday', 'Tuesday', etc.).
 * @returns {number} The numeric value representing the day of the week (0 for Sunday, 1 for Monday, etc.).
 * @throws {Error} If the input string does not match any valid day name.
 */
function dayOfTheWeek(string) {
  if(string === 'Monday') return 1
  if(string === 'Tuesday') return 2
  if(string === 'Wednesday') return 3
  if(string === 'Thursday') return 4
  if(string === 'Friday') return 5
  if(string === 'Saturday') return 6
  if(string === 'Sunday') return 0

  throw new Error('Invalid day name. Valid values are: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.')
}



//A function that calculates the next day of the week.
function nextDay(date, dayName) 
{

  var dayNumber = dayOfTheWeek(String(dayName))

  const result = new Date()//date.getTime()
  const offset = (((dayNumber + 6) - date.getDay()) % 7) + 1
  
  result.setDate(date.getDate() + offset)
  
  var day = result.getDate()
  var month = result.getMonth()
  var year = result.getFullYear()

  var resultFormated = new Date(year,month,day,0,0,0,0) //Utilities.formatDate(result,'GMT+2','d/M/YYYY')

  return resultFormated
}


// Gets the ID of a google doc file (Doc, spredsheet, presentation, form), folder or script from its URL.
function extractDocumentIdFromUrl(url) 
{
  let parts = url.split('/')

  if (parts[4] == "d") {
    let idIndex = parts.indexOf('d') +1

    if (idIndex > 0 && idIndex < parts.length) {return parts[idIndex]} 
    else {
      // If the URL doesn't contain the expected parts
      Logger.log("Invalid URL")
      return "Invalid URL"
    }
  }

  if (parts[4] == "folders" || parts[4] == "projects" ) {
    let idIndex = 5

    if (idIndex > 0 && idIndex < parts.length) {return parts[idIndex]}
    else {
      // If the URL doesn't contain the expected parts
      Logger.log("Invalid URL")
      return "Invalid URL";
    }
  }
  else {
    Logger.log("Unknown type of URL")
    return "Unknown type of URL"
  }
}


//Get active user's email address

function getActiveUserEmail() 
{
  var userEmail = Session.getActiveUser().getEmail();
  console.log("Active User's Email: " + userEmail);
  return userEmail;
}

//Checks if a user's email belongs in a google group.
function checkGroupMembership() 
{
  //var userEmail = Session.getActiveUser().getEmail();
  //var groupName = "nb@esngreece.gr"; // Replace with your Google Group's email address
  
  var groupMembers = GroupsApp.getGroupByEmail(String(groupName)).getUsers()
  Logger.log(groupMembers)

  var isMember = groupMembers.some(element => element.getEmail() === String(userEmail))
  
  Logger.log(isMember + " isMember")
  

  if (isMember) {
    Logger.log(userEmail + " is a member of the group.");
    return true
  } else {
    Logger.log(userEmail + " is not a member of the group.");
    return false
  }
}


// Function to select a column from the matrix without a loop
function getMatrixColumn(matrix, columnIndex) {
  
  // Error handling. 
  if (columnIndex > matrix[0].length -1) {throw Error(`Column Index is larger than the Matrix length.`)}
  if (columnIndex < 0) {throw Error(`Column Index is a negatve number.`)}
  
  // Puts all elements of an array of arrays or matrix or a sheet column in a 1 dimensional array.
  let output = matrix.map(function(row) {
    return row[columnIndex]
  })

  return output
}