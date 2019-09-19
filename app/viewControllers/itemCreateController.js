const electron = require('electron');
const _ = require("lodash");
require('./db');
const Vendor = require('./app/models/vendor');
const MenuItem = require('./app/models/item');

// Get Vendors
let count = 0;
Vendor.find({}, function(err, vendors){
  if(err){
    console.log(err);
  } else {
    vendors.forEach(function(vendor){
      $("#vendorList").after('<option id="name'+count+'" class="card text-center" value="'+vendor.id+'">'+vendor.name+'</option>');
      count++;
      console.log(vendor.name);
    });

  }
});

// Post Menu Item
const form = document.querySelector('form');
form.addEventListener('submit', submitForm);

function submitForm(e){
  e.preventDefault();
  Vendor.findOne({_id: $('#vendor').val()}, function(err, vendor){
    if(err){
      console.log(err);
    } else {
      // Item object
      const menuItem = new MenuItem({
        name: _.capitalize($("#name").val()),
        price: $("#price").val(),
        size: $("input[name='size']:checked").val(),
        vendor: $('#vendor').val(),
        vendorName: vendor.name,
        description: _.capitalize($('#description').val())
      });
      menuItem.save(function (err) {
        if(err){
          console.log(err);
        }
      });
      console.log(menuItem);
    }
  });
  //require('electron').remote.getCurrentWindow().reload();
}
