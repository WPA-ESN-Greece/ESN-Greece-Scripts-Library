// Text Replace for Docs

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