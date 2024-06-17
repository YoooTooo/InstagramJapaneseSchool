function handlePost(e) {
  var file = e.parameter.file;
  if (!file) {
    return ContentService.createTextOutput('No file uploaded');
  }

  var fileData = Utilities.base64Encode(file.getBytes());
  var response = postToInstagram(fileData);

  return ContentService.createTextOutput(response);
}

function postToInstagram(fileData) {
  var accessToken = 'YOUR_INSTAGRAM_ACCESS_TOKEN';
  var instagramApiUrl = 'https://graph.instagram.com/me/media';

  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify({
      'image': fileData,
      'access_token': accessToken
    })
  };

  try {
    var response = UrlFetchApp.fetch(instagramApiUrl, options);
    return response.getContentText();
  } catch (e) {
    return 'Error: ' + e.toString();
  }
}
