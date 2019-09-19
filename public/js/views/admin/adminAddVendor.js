//jshint esversion:6
const electron = require('electron');
const {ipcRenderer} = electron;

const form = document.querySelector('form');
form.addEventListener('submit', submitForm);

function submitForm(e){
  e.preventDefault();
  // Item object
  const vendorInfo = {
    name: document.querySelector('#vname').value,
    street: document.querySelector('#street').value,
    city: document.querySelector('#local').value,
    telephone: document.querySelector('#tel').value,
    email: document.querySelector('#email').value
  }
  ipcRenderer.send('vendorInfo:add', vendorInfo);
  require('electron').remote.getCurrentWindow().reload();
}

//
// var app = require("electron").remote;
// var dialog = app.dialog;
// const fs = require('fs');
//
// document.getElementById("createVendor").onclick = () => {
//   dialog.showSaveDialog((fileName) => {
//     if(fileName === undefined){
//       alert("You didn't save the file!");
//       return;
//     }
//     var content = document.getElementById("email").value;
//     fs.writeFile(fileName, content, (err) => {
//       if(err) console.log(err);
//       alert("The file was succesfully saved!");
//     });
//   });
// };
