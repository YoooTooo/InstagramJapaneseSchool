function doGet(e) {

  const file = e.parameter.file;

  // 初回にindexの内容を表示
  if(!file) {
    const template = HtmlService.createTemplateFromFile('index');
    template.url = ScriptApp.getService().getUrl();
    const htmlOutput = template.evaluate()
    htmlOutput
      .setTitle('index')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');

    return htmlOutput;
  }

  const template = HtmlService.createTemplateFromFile(file);
  template.url = ScriptApp.getService().getUrl();
  const htmlOutput = template.evaluate()
  htmlOutput
    .setTitle(file)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  return htmlOutput;
}

function doPost(e) {
  return handlePost(e);
}