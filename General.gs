// Typecheck
/**
 * Creates a sheetPopup dialog.
 * 
 * @param message {String} input your message to be displayed.
 * @param tittle {String} input your titlte for the dialoge pop up.
 * @param timeoutSeconds {number} duration of pop up being displayed in seconds.
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

  if(typeof variable === type) {
    Logger.log("Valid type")
    return true
  } 
  else {
    Logger.log("Wrong type")
    return false
    
  }

}


//Day of the week function. Returns a numeric value that coresponds to a days of the week.

function dayOfTheWeek(string) {
  if(string === 'Monday') return 1
  if(string === 'Tuesday') return 2
  if(string === 'Wednesday') return 3
  if(string === 'Thursday') return 4
  if(string === 'Friday') return 5
  if(string === 'Saturday') return 6
  if(string === 'Sunday') return 0
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
  var parts = url.split('/')
  Logger.log(parts[4])

  if (parts[4] == "d")
  {
    var idIndex = parts.indexOf('d') + 1
    Logger.log(parts = url.split('/'))

    if (idIndex > 0 && idIndex < parts.length) 
    {
      Logger.log(parts[idIndex])
      return parts[idIndex]
    } 
    else 
    {
      // If the URL doesn't contain the expected parts
      Logger.log("Invalid URL")
      return "Invalid URL"
    }
  }

  if (parts[4] == "folders" || parts[4] == "projects" )
  {
    var idIndex = 5
    Logger.log(parts = url.split('/'))

    if (idIndex > 0 && idIndex < parts.length) 
    {
      Logger.log(parts[idIndex])
      return parts[idIndex]
    }
    else 
    {
      // If the URL doesn't contain the expected parts
      Logger.log("Invalid URL")
      return "Invalid URL";
    }
  }

  else
  {
    Logger.log("Unknown type of URL")
    return "Unknown type of URL"
  }
}


