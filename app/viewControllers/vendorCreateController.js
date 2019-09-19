//jshint esversion:6
const electron = require('electron');
const _ = require("lodash");
require('./db');
const Vendor = require('./app/models/vendor');

const form = document.querySelector('form');
form.addEventListener('submit', submitForm);

function submitForm(e){
  e.preventDefault();
  // vendor object
  const vendor = new Vendor({
    name: _.capitalize($('#vname').val()),
    street: $('#street').val(),
    city: _.capitalize($('#local').val()),
    telephone: $('#tel').val(),
    email: $('#email').val()
  });
  vendor.save(function (err) {
    if(err){
      console.log(err);
    }
  });
  //require('electron').remote.getCurrentWindow().reload();
}
