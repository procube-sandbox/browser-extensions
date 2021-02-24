export const Query = {
  loginDomByUrl: (parent: any, { url }: any, { db }: any): any => {
    const loginDom = db.loginDoms.find((item: any) => item.url === url);
    return loginDom;
  },

};
