
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


//Documentation Link pop-up / Dialog

function showDocumentation(documentationURL, title)
{
  var ui = SpreadsheetApp.getUi()
  var documentationMessage = HtmlService.createHtmlOutput(`<p style="font-family: 'Open Sans'">You can find the documentation <a href="${documentationURL}"target="_blank">here</a></p>`).setWidth(400).setHeight(60)

  SpreadsheetApp.getUi().showModalDialog(documentationMessage,String(title))
}



