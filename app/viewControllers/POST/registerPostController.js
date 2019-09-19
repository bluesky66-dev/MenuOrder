const electron = require('electron');
const {ipcRenderer} = electron;

const form = document.querySelector('form');
form.addEventListener('submit', submitForm);

function submitForm(e){
  e.preventDefault();
  // Item object
  const newusr = {
    fname: $('#fname').val(),
    lname: $('#lname').val(),
    username: $('#username').val(),
    password: $('#password').val()
  }
  ipcRenderer.send('newusr:add', newusr);
  require('electron').remote.getCurrentWindow().reload();
}
