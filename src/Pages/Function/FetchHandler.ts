import Constants from './../../Utilities/Constants';

function getInstagramPosts() {
  var instagramApiUrl = `${Constants.INSTAGRAM_API_URL}/${Constants.INSTAGRAM_BUSINESS_ACCOUNT_ID}/media?fields=id,caption,media_url,permalink&access_token=${Constants.INSTAGRAM_ACCESS_TOKEN}`;

  try {
    var response = UrlFetchApp.fetch(instagramApiUrl);
    var json = JSON.parse(response.getContentText());
    return json.data;
  } catch (e) {
    if (typeof e === 'string') {
      return 'Error: ' + e;
    } else if (e instanceof Error) {
      return 'Error: ' + e.message;
    } else {
      return 'Error: Unknown error occurred';
    }
  }
}
