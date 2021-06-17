const API_URL = 'http://localhost:4000/graphql';

async function getRegisteredUrls() {
  const requestBody = {
    query: `
      query listLoginDoms {
        listLoginDoms{
          url
        }
      }`,
  };
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
    const responseBody = await res.json();
    const registeredUrls = responseBody.data.listLoginDoms.map(
      (item) => item.url
    );
    return registeredUrls;
  } catch (error) {
    console.log(error);
  }
}

let REGISTERED_URLS = [];
getRegisteredUrls().then((registeredUrls) => {
  REGISTERED_URLS = registeredUrls;
});

function isUnregistered(url) {
  return !REGISTERED_URLS.includes(url);
}

async function getDomAndCredential(url, apiToken) {
  const requestBody = {
    query: `
      query getDomAndCredential($url: ID!, $getCredentialInput: GetCredentialInput!) {
        getLoginDomByUrl(url: $url){
          url
          name
          idXPath
          pwXPath
          submitXPath
        }
        getCredential(input: $getCredentialInput) {
          id
          apiToken
          url
          userID
          userPW
        }
      }`,
    variables: {
      url: url,
      getCredentialInput: { apiToken: apiToken, url: url },
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
    const credential = responseBody.data.getCredential;
    return { loginDoms, credential };
  } catch (error) {
    console.log(error);
  }
}

async function login(tab, url) {
  const apiToken = localStorage.getItem('apiToken');

  const { loginDoms, credential } = await getDomAndCredential(url, apiToken);
  if (!loginDoms) {
    console.log('loginDoms is null.');
    return;
  }
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
