const electron = require('electron');
const {ipcRenderer} = electron;

const form = document.querySelector('form');
form.addEventListener('submit', submitForm);

function submitForm(e){
  e.preventDefault();
  // Item object
  const item = {
    title: document.querySelector('#title').value,
    size: document.querySelector('#size').value,
    price: document.querySelector('#price').value,
    vendor: document.querySelector('#vendor').value
  }
  ipcRenderer.send('item:add', item);
  require('electron').remote.getCurrentWindow().reload();
}
