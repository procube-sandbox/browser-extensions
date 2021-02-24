export const Query = {
  getLoginDomByUrl: (parent, { url }, { db }) => {
    const loginDom = db.loginDoms.find((item) => item.url === url);
    return loginDom;
  },

  getCredential: (parent, { input }, { db }) => {
    const credential = db.credentials
      .filter((item) => item.extensionUserID === input.extensionUserID)
      .find((item) => item.url === input.url);
    return credential;
  },
};
