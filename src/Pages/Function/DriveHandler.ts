import { postToInstagram } from './../../BaseLogic/PostHandler';

import Constants from './../../Utilities/Constants';

function getDriveFiles() {
  var folder = DriveApp.getFolderById(Constants.GOOGLE_DRIVE_FOLDER_ID);
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
