export const Query = {
  getLoginDomByUrl: (parent, { url }, { db }) => {
    const loginDom = db.loginDoms.find((item) => item.url === url);
    return loginDom;
  },

};
