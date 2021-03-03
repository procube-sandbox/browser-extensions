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
    {
      url: 'https://github.com/login',
      name: 'GitHub',
      idXPath: '//*[@id="login_field"]',
      pwXPath: '//*[@id="password"]',
      submitXPath: '//*[@id="login"]/div[4]/form/input[14]',
    },
  ],
  credentials: [
    {
      id: '1',
      apiToken: 'test1',
      url: 'https://id.nikkei.com/lounge/nl/auth/bpgw/LA0310.seam',
      userID: 'testid',
      userPW: 'testpw',
    },
    {
      id: '2',
      apiToken: 'test1',
      url: 'https://id.nikkei.com/lounge/nl/connect/page/LA7010.seam',
      userID: 'testid',
      userPW: 'testpw',
    },
    {
      id: '3',
      apiToken: 'test2',
      url: 'https://id.nikkei.com/lounge/nl/auth/bpgw/LA0310.seam',
      userID: 'testid',
      userPW: 'testpw',
    },
    {
      id: '4',
      apiToken: 'test1',
      url: 'https://github.com/login',
      userID: 'testid',
      userPW: 'testpw',
    },
  ],
};
