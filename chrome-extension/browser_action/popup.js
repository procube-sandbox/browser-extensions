const submitBtn = document.querySelector('#submit');
const isAuthenticatedText = document.querySelector('#is-authenticated');
const tokenForm = document.querySelector('#token');

function init() {
  const token = localStorage.getItem('token');
  isAuthenticatedText.textContent = token ? '認証済み' : '未認証';
  tokenForm.value = token;
}

function main() {
  init();
  submitBtn.onclick = (e) => {
    const token = document.querySelector('#token').value;
    localStorage.setItem('token', token);
    isAuthenticatedText.textContent = token ? '認証済み' : '未認証';
  };
}

main();
