function doGet(e) {

console.log(e.parameter.page)

 // 'upload', 'fetch', 'driveUpload
  if (typeof e.parameter.page !== 'undefined') {
    const template = HtmlService.createTemplateFromFile(e.parameter.page);
    template.url = ScriptApp.getService().getUrl();
    return template.evaluate();
  } else {
    const template = HtmlService.createTemplateFromFile('index');
    template.url = ScriptApp.getService().getUrl();
    return template.evaluate();
  }
}

function doPost(e) {
  return handlePost(e);
}
