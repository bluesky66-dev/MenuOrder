//jshint esversion:6
// TO do

/*
Add allerts for action either within html or via alert pop up
*/
require('./db');

const Order = require('./app/models/order');

let balance = 0;
let count = 0;
Order.find({}, function(err, orders){
  if(err){
    console.log(err);
  } else {
    orders.forEach(function(order){
      $("#allOrders").append('<div class="col-sm-6"><div class="card text-center"><div class="card-body"><h3 id="name'+count+'" class="card-title">'+order.name+'</h3><ul class="list-unstyled mt-3 mb-4"><li id="street'+count+'">$'+order.price+'</li><li id="city'+count+'">Size: '+order.size+'</li><li id="telephone'+count+'">Message to seller:'+order.message+'</li><li id="email'+count+'">Seller: '+order.vendorName+'</li></ul><form id="form_id'+count+'"><input id="itemPrice'+count+'" type="number" value="'+order.price+'" hidden><input id="orderId'+count+'" type="text" value="'+order.id+'" hidden><button id="'+count+'" class="btn btn-block btn-secondary remove">REMOVE ORDER</button></form></div></div></div>');
      balance = balance + Number($('#itemPrice'+count+'').val());
      count++;
      console.log('Cart loaded successfully');
    });
    console.log(count);
    console.log(balance);
    $("#allOrders").before('<div class="col-sm-12"><h3>ORDERS TOTAL: $'+balance+'</h3></div>');
  }
});

$(document).on('click', '.remove', function(e){
  e.preventDefault();
  var submitBtnId = $(this).attr('id');
  console.log( $('#orderId'+submitBtnId+'').val());
  Order.deleteOne({_id: $('#orderId'+submitBtnId+'').val()}, function(err, order){
    if(err){
      console.log(err);
    } else {
      console.log('Deleted order item');
    }
  });
  require('electron').remote.getCurrentWindow().reload();
});
