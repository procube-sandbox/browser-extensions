const submitBtn = document.querySelector('#submit');
const isAuthenticatedText = document.querySelector('#is-authenticated');
const tokenForm = document.querySelector('#token');

function init() {
  const apiToken = localStorage.getItem('apiToken');
  isAuthenticatedText.textContent = apiToken ? '認証済み' : '未認証';
  tokenForm.value = apiToken;
}

function main() {
  init();
  submitBtn.onclick = (e) => {
    const apiToken = document.querySelector('#token').value;
    localStorage.setItem('apiToken', apiToken);
    isAuthenticatedText.textContent = apiToken ? '認証済み' : '未認証';
  };
}

main();
