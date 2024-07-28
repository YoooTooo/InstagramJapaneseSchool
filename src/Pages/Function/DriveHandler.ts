import { postToInstagram } from './../../BaseLogic/PostHandler';

function getDriveFiles() {
  var folder = DriveApp.getFolderById(GOOGLE_DRIVE_FOLDER_ID);
  var files = folder.getFiles();
  var fileList = [];

  while (files.hasNext()) {
    var file = files.next();
    fileList.push({ id: file.getId(), name: file.getName() });
  }

  return fileList;
}

function uploadDriveFileToInstagram(fileId: string) {
  var file = DriveApp.getFileById(fileId);
  var fileData = Utilities.base64Encode(file.getBlob().getBytes());
  var response = postToInstagram(fileData);
  return response;
}
