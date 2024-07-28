function handlePost(e: any) {
  var file = e.parameter.file;
  if (!file) {
    return ContentService.createTextOutput('No file uploaded');
  }

  var fileData = Utilities.base64Encode(file.getBytes());
  var response = postToInstagram(fileData);

  return ContentService.createTextOutput(response);
}

function postToInstagram(fileData:string) {
  // Step 1: Upload the media
  var uploadUrl = `${INSTAGRAM_API_URL}/${INSTAGRAM_BUSINESS_ACCOUNT_ID}/media`;
  var uploadOptions = {
    'method': 'post' as GoogleAppsScript.URL_Fetch.HttpMethod,
    'contentType': 'application/json',
    'payload': JSON.stringify({
      'image': fileData,
      'access_token': INSTAGRAM_ACCESS_TOKEN
    })
  };

  try {
    var uploadResponse = UrlFetchApp.fetch(uploadUrl, uploadOptions);
    var uploadResult = JSON.parse(uploadResponse.getContentText());

    if (uploadResult.id) {
      // Step 2: Publish the media
      var publishUrl = `${INSTAGRAM_API_URL}/${INSTAGRAM_BUSINESS_ACCOUNT_ID}/media_publish`;
      var publishOptions = {
        'method': 'post' as GoogleAppsScript.URL_Fetch.HttpMethod,
        'contentType': 'application/json',
        'payload': JSON.stringify({
          'creation_id': uploadResult.id,
          'access_token': INSTAGRAM_ACCESS_TOKEN
        })
      };

      var publishResponse = UrlFetchApp.fetch(publishUrl, publishOptions);
      return publishResponse.getContentText();
    } else {
      return 'Error: Unable to upload media';
    }
  } catch (e: any) {
    return 'Error: ' + e.toString();
  }
}
