//jshint esversion:6
$(document).ready(function() {
  require('./db');
  // const async = require("async");

  const MenuItem = require('./app/models/item');
  // const Vendor = require('./app/models/vendor');

  let count = 0;

  MenuItem.find({}, function(err, menuItems){
    if(err){
      console.log(err);
    } else {
      menuItems.forEach(function(menuItem){
        $("#menu").append('<div class="col-sm-6"><form id="form'+count+'"><div class="card text-center"><div class="card-body"><h3 id="name'+count+'" class="card-title">'+menuItem.name+'</h3><ul class="list-unstyled mt-3 mb-4"><li id="size'+count+'">Size: '+menuItem.size+'</li><li id="price'+count+'">Price: '+menuItem.price+'</li><li id="desc'+count+'"Note: '+menuItem.description+'</li><li id="vendorName'+count+'">Vendor: '+menuItem.vendorName+'</li></ul><button class="btn btn-block btn-secondary">DELETE</button></div></div></form></div>');
        count++;
        console.log(menuItem.name);
      });
    }
  });
});
//
// $(document).on('click', '.remove', function(e){
//   e.preventDefault();
//   var submitBtnId = $(this).attr('id');
//   console.log( $('#vendorId'+submitBtnId+'').val());
//
//   async.parallel([
//       function(callback) {
//         MenuItem.deleteMany({vendor: $('#vendorId'+submitBtnId+'').val()}, function(err, item){
//           if(err){
//             callback(err);
//           } else {
//             callback(null, 'Deleted Item');
//           }
//         });
//       },
//       function(callback) {
//         Cart.deleteMany({vendorId: $('#vendorId'+submitBtnId+'').val()}, function(err, cart){
//           if(err){
//             callback(err);
//           } else {
//             callback(null, 'Deleted Cart');
//           }
//         });
//       },
//       function(callback) {
//         Order.deleteMany({vendorId: $('#vendorId'+submitBtnId+'').val()}, function(err, order){
//           if(err){
//             callback(err);
//           } else {
//             callback(null, 'Deleted Order');
//           }
//         });
//       }
//     ],
//     // optional async callback
//     function(err, results) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(results[0]);
//         console.log(results[1]);
//         console.log(results[2]);
//       }
//     }
//   );
//   require('electron').remote.getCurrentWindow().reload();
// });
