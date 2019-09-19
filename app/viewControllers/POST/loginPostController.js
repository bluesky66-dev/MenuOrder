const electron = require('electron');
const {ipcRenderer} = electron;

const form = document.querySelector('form');
form.addEventListener('submit', submitForm);

function submitForm(e){
  e.preventDefault();
  // Item object
  const login = {
    username: $('#username').val(),
    password: $('#password').val()
  }
  ipcRenderer.send('login:add', login);
  require('electron').remote.getCurrentWindow().reload();
}
