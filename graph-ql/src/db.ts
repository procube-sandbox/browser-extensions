export const db = {
  loginDoms: [
    {
      url: 'https://id.nikkei.com/lounge/nl/auth/bpgw/LA0310.seam',
      name: 'Nikkei X tech',
      idXPath: '//*[@id="LA0310Form01:LA0310Email"]',
      pwXPath: '//*[@id="LA0310Form01:LA0310Password"]',
      submitXPath: '//*[@id="LA0310Form01"]/div/div/label/button',
    },
    {
      url: 'https://id.nikkei.com/lounge/nl/connect/page/LA7010.seam',
      name: '日経 電子版',
      idXPath: '//*[@id="LA7010Form01:LA7010Email"]',
      pwXPath: '//*[@id="LA7010Form01:LA7010Password"]',
      submitXPath: '//*[@id="LA7010Form01"]/div/div[3]/label/button',
    },
  ],
  credentials: [
    {
      id: '1',
      extensionUserID: 'test1',
      url: 'https://id.nikkei.com/lounge/nl/auth/bpgw/LA0310.seam',
      userID: 'testid',
      userPW: 'testpw',
    },
    {
      id: '2',
      extensionUserID: 'test1',
      url: 'https://id.nikkei.com/lounge/nl/connect/page/LA7010.seam',
      userID: 'testid',
      userPW: 'testpw',
    },
    {
      id: '3',
      extensionUserID: 'test2',
      url: 'https://id.nikkei.com/lounge/nl/auth/bpgw/LA0310.seam',
      userID: 'testuser2',
      userPW: 'testpw2',
    },
  ],
};
