const electron = require('electron');
const {ipcRenderer} = electron;

const form = document.querySelector('form');
form.addEventListener('submit', submitForm);

function submitForm(e){
  e.preventDefault();
  // Item object
  const login = {
    username: document.querySelector('#username').value,
    password: document.querySelector('#password').value
  }
  ipcRenderer.send('login:add', login);
  require('electron').remote.getCurrentWindow().reload();
}
