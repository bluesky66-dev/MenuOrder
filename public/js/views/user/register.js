const electron = require('electron');
const {ipcRenderer} = electron;

const form = document.querySelector('form');
form.addEventListener('submit', submitForm);

function submitForm(e){
  e.preventDefault();
  // Item object
  const newusr = {
    fname: document.querySelector('#fname').value,
    lname: document.querySelector('#lname').value,
    username: document.querySelector('#username').value,
    password: document.querySelector('#password').value
  }
  ipcRenderer.send('newusr:add', newusr);
  require('electron').remote.getCurrentWindow().reload();
}
