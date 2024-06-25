function getInstagramPosts() {
  var instagramApiUrl = `${INSTAGRAM_API_URL}/${INSTAGRAM_BUSINESS_ACCOUNT_ID}/media?fields=id,caption,media_url,permalink&access_token=${INSTAGRAM_ACCESS_TOKEN}`;

  try {
    var response = UrlFetchApp.fetch(instagramApiUrl);
    var json = JSON.parse(response.getContentText());
    return json.data;
  } catch (e) {
    Logger.log('Error: ' + e.toString());
    return [];
  }
}
