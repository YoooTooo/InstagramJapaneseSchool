function getDriveFiles() {
  var folderId = 'YOUR_GOOGLE_DRIVE_FOLDER_ID'; // 画像や動画が保存されているGoogle DriveフォルダのID
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  var fileList = [];
  
  while (files.hasNext()) {
    var file = files.next();
    fileList.push({ id: file.getId(), name: file.getName() });
  }

  return fileList;
}

function uploadDriveFileToInstagram(fileId) {
  var file = DriveApp.getFileById(fileId);
  var fileData = Utilities.base64Encode(file.getBlob().getBytes());
  var response = postToInstagram(fileData);
  return response;
}
