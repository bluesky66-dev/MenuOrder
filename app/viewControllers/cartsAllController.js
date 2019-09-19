//jshint esversion:6
// TO do

/*
Add allerts for action either within html or via alert pop up
*/
require('./db');

const Cart = require('./app/models/cart');
const Order = require('./app/models/order');

let balance = 0;
let count = 0;
Cart.find({}, function(err, cartItems){
  if(err){
    console.log(err);
  } else {
    cartItems.forEach(function(cart){
      $("#myCart").append('<div class="col-sm-6"><div class="card text-center"><div class="card-body"><h3 id="name'+count+'" class="card-title">'+cart.name+'</h3><ul class="list-unstyled mt-3 mb-4"><li id="street'+count+'">$'+cart.price+'</li><li id="city'+count+'">Size: '+cart.size+'</li><li id="telephone'+count+'">Message to seller:'+cart.message+'</li><li id="email'+count+'">Seller: '+cart.vendorName+'</li></ul><form id="form_id'+count+'"><input id="cartId'+count+'" type="text" value="'+cart.id+'" hidden><input id="itemId'+count+'" type="text" value="'+cart.itemId+'" hidden><input id="itemName'+count+'" type="text" value="'+cart.name+'" hidden><input id="itemSize'+count+'" type="text" value="'+cart.size+'" hidden><input id="itemPrice'+count+'" type="number" value="'+cart.price+'" hidden><textarea id="itemMessage'+count+'" rows="8" cols="80" hidden>'+cart.message+'</textarea><input id="itemVendor'+count+'" type="text" value="'+cart.vendorName+'" hidden><input id="itemVendorId'+count+'" type="text" value="'+cart.vendorId+'" hidden><button id="'+count+'" type="submit" class="btn btn-block btn-primary submit">SUBMIT ORDER</button><button id="'+count+'" class="btn btn-block btn-secondary remove">REMOVE FROM CART</button></form></div></div></div>');
      balance = balance + Number($('#itemPrice'+count+'').val());
      count++;
      console.log('Cart loaded successfully');
    });
    console.log(count);
    console.log(balance);
    $("#myCart").before('<div class="col-sm-12"><h3>BALANCE: $'+balance+'</h3></div>');
  }
});

$(document).on('click', '.submit', function(e){
  e.preventDefault();
  var submitBtnId = $(this).attr('id');
  console.log( $('#itemVendorId'+submitBtnId+'').val());
  const order = new Order({
    itemId: $('#itemId'+submitBtnId+'').val(),
    name: $('#itemName'+submitBtnId+'').val(),
    size: $('#itemSize'+submitBtnId+'').val(),
    price: $('#itemPrice'+submitBtnId+'').val(),
    message: $('#itemMessage'+submitBtnId+'').val(),
    vendorName: $('#itemVendor'+submitBtnId+'').val(),
    vendorId: $('#itemVendorId'+submitBtnId+'').val()
  });
  order.save(function (err) {
    if(err){
      console.log(err);
    } else {
      Cart.deleteOne({_id: $('#cartId'+submitBtnId+'').val()}, function(err, cart){
        if(err){
          console.log(err);
        } else {
          console.log('Deleted cart item');
        }
      });
    }
  });
  require('electron').remote.getCurrentWindow().reload();
});

$(document).on('click', '.remove', function(e){
  e.preventDefault();
  var submitBtnId = $(this).attr('id');
  console.log( $('#itemVendorId'+submitBtnId+'').val());
  Cart.deleteOne({_id: $('#cartId'+submitBtnId+'').val()}, function(err, cart){
    if(err){
      console.log(err);
    } else {
      console.log('Deleted cart item');
    }
  });
  require('electron').remote.getCurrentWindow().reload();
});
