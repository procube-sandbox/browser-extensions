const API_URL = 'http://localhost:4000/graphql';

function getRegisteredUrls() {
  // 自動ログインに対応したWebサイトのURLを取得する処理を書く。
  const registeredUrls = [
    'https://id.nikkei.com/lounge/nl/auth/bpgw/LA0310.seam',
    'https://id.nikkei.com/lounge/nl/connect/page/LA7010.seam',
    'https://github.com/login',
  ];

  return registeredUrls;
}

const REGISTERED_URLS = getRegisteredUrls();

function isUnregistered(url) {
  return !REGISTERED_URLS.includes(url);
}

async function getLoginDomByUrl(url) {
  const requestBody = {
    query: `
      query getLoginDomByUrl($url: ID!){
        getLoginDomByUrl(url: $url) {
          url
          name
          idXPath
          pwXPath
          submitXPath
        }
      }`,
    variables: {
      url: url,
    },
  };
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
    const responseBody = await res.json();
    const loginDoms = responseBody.data.getLoginDomByUrl;
    return loginDoms;
  } catch (error) {
    console.log(error);
  }
}

async function getCredential(token, url) {
  const requestBody = {
    query: `
      query getCredential($input: GetCredentialInput!){
        getCredential(input: $input) {
          userID
          userPW
        }
      }`,
    variables: {
      input: { extensionUserID: token, url: url },
    },
  };
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
    const responseBody = await res.json();
    const credential = responseBody.data.getCredential;
    return credential;
  } catch (error) {
    console.log(error);
  }
}

async function login(tab, url) {
  const token = localStorage.getItem('token');

  const loginDoms = await getLoginDomByUrl(url);
  if (!loginDoms) {
    console.log('loginDoms is null.');
    return;
  }
  const credential = await getCredential(token, url);
  if (!credential) {
    console.log('credential is null.');
    return;
  }
  chrome.tabs.sendMessage(tab.id, { loginDoms, credential });
}

let previousUrl = '';

function isReaccess(url) {
  return url === previousUrl;
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    const url = tab.url.replace(/\?.*$/, '');

    if (isReaccess(url)) {
      console.log('The script is not executed when re-accessing.');
      return;
    }
    previousUrl = url;

    if (isUnregistered(url)) {
      console.log('This website is not registered.');
      return;
    }

    login(tab, url);
  }
});
