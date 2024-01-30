// Text Replace for Docs
/**
 * Replaces a specific target text with a new value in a Google Docs document.
 * 
 * @param {string} docID - The ID of the Google Docs document.
 * @param {string} target - The text to be replaced.
 * @param {string} value - The new text to replace the target.
 */
function replaceTextDoc(docID, target, value)
{
  var body = DocumentApp.openById(docID).getBody()

  body.replaceText(target, value)
}


// Create PDF from Doc

function creatPDFFromDoc(docID, pdfName, outputFolderID, returnURL)
{
  var outputFolder = DriveApp.getFolderById(outputFolderID)

  tempDoc = DriveApp.getFileById(docID)
  var blobPDF = tempDoc.getAs(MimeType.PDF)

  var pdf = outputFolder.createFile(blobPDF).setName(String(pdfName))

  // if the user wants it, the function can return the URL of the PDF file
  if (returnURL === true)
  {

    return pdf.getUrl()

  }
  else {return}
}