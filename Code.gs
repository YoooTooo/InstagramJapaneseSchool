function doGet(e) {
  if (e.parameter.page === 'upload') {
    return HtmlService.createHtmlOutputFromFile('upload');
  } else if (e.parameter.page === 'fetch') {
    return HtmlService.createHtmlOutputFromFile('fetch');
  } else if (e.parameter.page === 'driveUpload') {
    return HtmlService.createHtmlOutputFromFile('driveUpload');
  } else {
    return HtmlService.createHtmlOutputFromFile('index');
  }
}

function doPost(e) {
  return handlePost(e);
}