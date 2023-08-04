
//Create new folder function while it checks if it already exists.

function createNewFolder(parentFolderID, newFolderName)
{
  var folder = DriveApp.getFolderById(parentFolderID).getFolders()

  while(folder.hasNext()) 
  {
    var folderN = folder.next()
    if(folderN.getName() == newFolderName)
    {
      return folderN 
    }
  }

  var destinationFolder = DriveApp.getFolderById(parentFolderID).createFolder(newFolderName)

  return destinationFolder.getId()
}