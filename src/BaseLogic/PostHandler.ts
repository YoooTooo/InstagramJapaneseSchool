// src/BaseLogic/PostHandler.ts

export function handlePost(e: GoogleAppsScript.Events.DoPost): GoogleAppsScript.Content.TextOutput {
  const requestBody = JSON.parse(e.postData.contents);
  const fileData = requestBody.file;

  if (!fileData) {
    return ContentService.createTextOutput('No file uploaded');
  }

  const response = postToInstagram(fileData);

  return ContentService.createTextOutput(response);
}

export function postToInstagram(fileData: string): string {
  const INSTAGRAM_API_URL = 'https://graph.instagram.com';
  const INSTAGRAM_BUSINESS_ACCOUNT_ID = 'your_business_account_id';
  const INSTAGRAM_ACCESS_TOKEN = 'your_access_token';

  // Step 1: Upload the media
  const uploadUrl = `${INSTAGRAM_API_URL}/${INSTAGRAM_BUSINESS_ACCOUNT_ID}/media`;
  const uploadOptions = {
    method: 'post' as GoogleAppsScript.URL_Fetch.HttpMethod,
    contentType: 'application/json',
    payload: JSON.stringify({
      image: fileData,
      access_token: INSTAGRAM_ACCESS_TOKEN,
    }),
  };

  try {
    const uploadResponse = UrlFetchApp.fetch(uploadUrl, uploadOptions);
    const uploadResult = JSON.parse(uploadResponse.getContentText());

    if (uploadResult.id) {
      // Step 2: Publish the media
      const publishUrl = `${INSTAGRAM_API_URL}/${INSTAGRAM_BUSINESS_ACCOUNT_ID}/media_publish`;
      const publishOptions = {
        method: 'post' as GoogleAppsScript.URL_Fetch.HttpMethod,
        contentType: 'application/json',
        payload: JSON.stringify({
          creation_id: uploadResult.id,
          access_token: INSTAGRAM_ACCESS_TOKEN,
        }),
      };

      const publishResponse = UrlFetchApp.fetch(publishUrl, publishOptions);
      return publishResponse.getContentText();
    } else {
      return 'Error: Unable to upload media';
    }
  } catch (e: any) {
    return 'Error: ' + e.toString();
  }
}
