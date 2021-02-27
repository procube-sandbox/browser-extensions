const API_URL = 'http://localhost:4000/graphql';
const getLoginDomByUrl = async (url) => {
  const requestBody = {
    query: `
      query getLoginnDomByUrl($url: ID!){
        getLoginDomByUrl(url: $url) {
          url
          name
          idFormId
          idFormClass
          idFormClassOrder
          idFormName
          idFormType
          pwFormId
          pwFormClass
          pwFormClassOrder
          pwFormName
          pwFormType
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
};

const getCredential = async (token, url) => {
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
};

const login = async (e) => {
  const token = localStorage.getItem('token');
  const url = e[0].url;
  // クエリパラメータを除外
  const urlSanitized = url.replace(/\?.*$/, '');
  const loginDoms = await getLoginDomByUrl(urlSanitized);
  console.log(loginDoms);
  if (!loginDoms) {
    console.log('data is null.');
    return;
  }
  const credential = await getCredential(token, urlSanitized);
  console.log(credential);
  if (!credential) {
    console.log('data is null.');
    return;
  }
};

const main = () => {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == 'complete') {
      chrome.tabs.query({ active: true, currentWindow: true }, login);
    }
  });
};
main();
