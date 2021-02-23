export const Query = {
  loginDomByUrl: (parent: any, args: any, { db }: { db: any }) => {
    const loginDom = db.loginDoms.find(
      (loginDom: any) => loginDom.url === args.url
    );
    return loginDom;
  },

};
