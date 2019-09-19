//jshint esversion:6
require('./db');
const MenuItem = require('./app/models/item');
const Cart = require('./app/models/cart');
let count = 0;

MenuItem.find({}, function(err, menuItems){
  if(err){
    console.log(err);
  } else {
    menuItems.forEach(function(menuItem){
      $("#menu").append('<div class="col-sm-6"><div class="card text-center"><div class="card-body"><h3 id="name'+count+'" class="card-title">'+menuItem.name+'</h3><ul class="list-unstyled mt-3 mb-4"><li id="size'+count+'">Size: '+menuItem.size+'</li><li id="price'+count+'">Price: $ '+menuItem.price+'</li><li id="desc'+count+'"Note: '+menuItem.description+'</li><li id="vendorName'+count+'">Vendor: '+menuItem.vendorName+'</li></ul><form id="form_id'+count+'"><textarea id="itemMessage'+count+'" rows="8" cols="80" placeholder="special message to seller"></textarea><input id="itemId'+count+'" type="text" value="'+menuItem.id+'" hidden><input id="itemName'+count+'" type="text" value="'+menuItem.name+'" hidden><input id="itemSize'+count+'" type="text" value="'+menuItem.size+'" hidden><input id="itemPrice'+count+'" type="number" value="'+menuItem.price+'" hidden><input id="itemVendor'+count+'" type="text" value="'+menuItem.vendorName+'" hidden><input id="itemVendorId'+count+'" type="text" value="'+menuItem.vendor+'" hidden><button id="'+count+'" type="submit" class="btn btn-block btn-primary submit">ADD To CART</button></form></div></div></div>');
      count++;
    });
    console.log("Items loaded successfully");
  }
});

$(document).on('click', '.submit', function(e){
  e.preventDefault();
  var submitBtnId = $(this).attr('id');
  console.log( $('#itemVendorId'+submitBtnId+'').val());
  const cart = new Cart({
    itemId: $('#itemId'+submitBtnId+'').val(),
    name: $('#itemName'+submitBtnId+'').val(),
    size: $('#itemSize'+submitBtnId+'').val(),
    price: $('#itemPrice'+submitBtnId+'').val(),
    message: $('#itemMessage'+submitBtnId+'').val(),
    vendorName: $('#itemVendor'+submitBtnId+'').val(),
    vendorId: $('#itemVendorId'+submitBtnId+'').val()
  });
  cart.save(function (err) {
    if(err){
      console.log(err);
    }
  });
  //require('electron').remote.getCurrentWindow().reload();
});
