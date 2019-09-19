//jshint esversion:6
  require('./db');
const async = require("async");
const Vendor = require('./app/models/vendor');
const MenuItem = require('./app/models/item');
const Cart = require('./app/models/cart');
const Order = require('./app/models/order');

let count = 0;
Vendor.find({}, function(err, vendors){
  if(err){
    console.log(err);
  } else {
    vendors.forEach(function(vendor){
      $("#vendorList").append('<div class="col-sm-6"><div class="card text-center"><div class="card-body"><h3 id="name'+count+'" class="card-title">'+vendor.name+'</h3><ul class="list-unstyled mt-3 mb-4"><li id="street'+count+'">'+vendor.street+'</li><li id="city'+count+'">'+vendor.city+'</li><li id="telephone'+count+'">'+vendor.telephone+'</li><li id="email'+count+'">'+vendor.email+'</li></ul><form id="form_id'+count+'"><input id="vendorId'+count+'" type="text" value="'+vendor.id+'" hidden><button id="'+count+'" class="btn btn-block btn-secondary remove">DELETE</button></form></div></div></div>');
      count++;
      console.log(vendor.name);
    });
  }
});

$(document).on('click', '.remove', function(e){
  e.preventDefault();
  var submitBtnId = $(this).attr('id');
  console.log( $('#vendorId'+submitBtnId+'').val());

  async.parallel([
      function(callback) {
        Vendor.deleteOne({_id: $('#vendorId'+submitBtnId+'').val()}, function(err, vendor){
          if(err){
            callback(err);
          } else {
            callback(null, 'Deleted Vendor');
          }
        });
      },
      function(callback) {
        MenuItem.deleteMany({vendor: $('#vendorId'+submitBtnId+'').val()}, function(err, item){
          if(err){
            callback(err);
          } else {
            callback(null, 'Deleted Item');
          }
        });
      },
      function(callback) {
        Cart.deleteMany({vendorId: $('#vendorId'+submitBtnId+'').val()}, function(err, cart){
          if(err){
            callback(err);
          } else {
            callback(null, 'Deleted Cart');
          }
        });
      },
      function(callback) {
        Order.deleteMany({vendorId: $('#vendorId'+submitBtnId+'').val()}, function(err, order){
          if(err){
            callback(err);
          } else {
            callback(null, 'Deleted Order');
          }
        });
      }
    ],
    // optional async callback
    function(err, results) {
      if (err) {
        console.log(err);
      } else {
        console.log(results[0]);
        console.log(results[1]);
        console.log(results[2]);
        console.log(results[3]);
      }
    }
  );
  require('electron').remote.getCurrentWindow().reload();
});

// TO do

/*
Add allerts for action either within html or via alert pop up
*/
