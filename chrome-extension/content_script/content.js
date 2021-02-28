const getElementsByXPath = (expression, parentElement) => {
  const r = [];
  const x = document.evaluate(
    expression,
    parentElement || document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  for (let i = 0, l = x.snapshotLength; i < l; i++) {
    r.push(x.snapshotItem(i));
  }
  return r;
};

chrome.runtime.onMessage.addListener(
  ({ loginDoms, credential }, sender, sendResponse) => {
    const idXPath = loginDoms.idXPath;
    const pwXPath = loginDoms.pwXPath;
    const submitXPath = loginDoms.submitXPath;

    const idForm = getElementsByXPath(idXPath)[0];
    const pwForm = getElementsByXPath(pwXPath)[0];
    const submitBtn = getElementsByXPath(submitXPath)[0];

    idForm.value = credential.userID;
    pwForm.value = credential.userPW;
    submitBtn.click();
    return;
  }
);
