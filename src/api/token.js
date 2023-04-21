import {API_URL_TOKEN, ACCESS_KEY, SECRET_KEY, REDIRECT_URI} from './const';

const url = new URL(API_URL_TOKEN);

url.searchParams.append('client_id', ACCESS_KEY);
url.searchParams.append('client_secret', SECRET_KEY);
url.searchParams.append('redirect_uri', REDIRECT_URI);
url.searchParams.append('grant_type', 'authorization_code');

export const urlToken = url;
