function getInstagramPosts() {
  var accessToken = 'YOUR_INSTAGRAM_ACCESS_TOKEN';
  var instagramApiUrl = 'https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink&access_token=' + accessToken;

  try {
    var response = UrlFetchApp.fetch(instagramApiUrl);
    var json = JSON.parse(response.getContentText());
    return json.data;
  } catch (e) {
    Logger.log('Error: ' + e.toString());
    return [];
  }
}
