
//Also called toast in some cases
/** 
 * Creates a sheetPopup dialog.
 * 
 * @param message {String} input your message to be displayed.
 * @param tittle {String} input your titlte for the dialoge pop up.
 * @param timeoutSeconds {number} duration of pop up being displayed in seconds.
 * 
 * ```javascript
 * function sheetPopup("Lorem ipsum.","Caption this",5)
 * ```
 */
function sheetsPopup(message, tittle, timeoutSeconds)
{

  var activeSheet = SpreadsheetApp.getActiveSpreadsheet()
  activeSheet.toast(message, tittle, timeoutSeconds)

}


// Needs check 🟡
// Filter Empty elements from a spreadsheet range
function filterEmpty(spreadsheetURL, range) 
{

  var filteredArray = []
  var ss = SpreadsheetApp.openByUrl(String(spreadsheetURL)).getActiveSheet()

  filteredArray = ss.getRange(String(range)).getValues().join().split(',')
  .filter(

      function (element) {
      // Return true for non-empty elements and false for empty elements
      return element !== null && element !== undefined && element !== '' && element !== ' ' && !Number.isNaN(element)
      }

  )

  Logger.log(filteredArray)

  return filteredArray

}


//A function that creates a stylised link on a cell on a sheet.

function linkCellContents(label, url, sheet, cell, style) // Make style optional
{
 var range = sheet.getRange(String(cell))
 /*var style = SpreadsheetApp.newTextStyle()
      .setItalic(false)
      .setFontSize(10)
      .setForegroundColor('#ffffff')
      .setUnderline(false)
      .build()*/
 var richValue = SpreadsheetApp.newRichTextValue()
  .setText(String(label))
  .setLinkUrl(String(url))
  .setTextStyle(style)
   
 range.setRichTextValue(richValue.build());
}

/**
 * Searches for a column with a specified name in a Google Sheets spreadsheet.
 *
 * @param {string} columnName - The name of the column to search for.
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - The Google Sheets sheet to search within.
 * @returns {number} The index of the found column (1-based), or -1 if not found.
 *
 * ```
 * // Example usage:
 * var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 * var columnName = "Name"; // Replace with the desired column name.
 * var columnIndex = searchForColumnNamed(columnName, sheet);
 * if (columnIndex !== -1) {
 *   Logger.log("Column '" + columnName + "' found at index: " + columnIndex);
 * } else {
 *   Logger.log("Column '" + columnName + "' not found.");
 * }
 * ```
 */
function searchForColumnNamed(columnName, sheet)
{
  var firstRowValues = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
  
  var wantedColumnIndex = findArrayIndexOfText(firstRowValues, columnName)
  return wantedColumnIndex
}

//Documentation Link pop-up / Dialog

function showDocumentation(documentationURL, title)
{
  var ui = SpreadsheetApp.getUi()
  var documentationMessage = HtmlService.createHtmlOutput(`<p style="font-family: 'Open Sans'">You can find the documentation <a href="${documentationURL}"target="_blank">here</a></p>`).setWidth(400).setHeight(60)

  SpreadsheetApp.getUi().showModalDialog(documentationMessage,String(title))
}



