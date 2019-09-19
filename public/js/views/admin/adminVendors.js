//jshint esversion:6
const electron = require('electron');
const {ipcRenderer} = electron;
const vendorDiv = document.getElementById('vendorDiv');

ipcRenderer.on('vendorInfo:add', function(e, vendors){
  const box = document.createElement('div');
  box.className = 'col-sm-6';
  const card = document.createElement('div');
  card.className = 'card';
  const body = document.createElement('div');
  body.className = 'card-body';
  const title = document.createElement('h5');
  title.className = 'card-title';
  const price = document.createElement('span');
  price.className = 'text-primary';
  const text = document.createElement('p');
  text.className = 'card-text';
  const remover = document.createElement('p');
  remover.className = 'col-lg-1 col-md-1 col-sm-12 remove-item text-danger';

  const vName = document.createTextNode(vendor.name);
  const vStreet = document.createTextNode(vendor.street);
  const vCity = document.createTextNode(vendor.city);
  const vTelephone = document.createTextNode(vendor.telephone);
  const vEmail = document.createTextNode(vendor.email);
  const vRemove = document.createTextNode("X");

  remover.appendChild(vRemove);
  text.appendChild(vStreet);
  price.appendChild(vTelephone);
  title.appendChild(vName);

  title.appendChild(remover);
  title.appendChild(text);
  title.appendChild(price);
  body.appendChild(title);
  card.appendChild(body);
  box.appendChild(card);

  vendorDiv.appendChild(box);
});


// Remove all database Items
ipcRenderer.on('item:clear', function(){
  ul.innerHTML = '';
  ul.className = '';
});

// // Remove selected item
// ul.addEventListener('dblclick', removeItem);

function removeItem(e){
  removeBtn = e.target;
  var row;
  var list;
  if (removeBtn.classList.contains("remove-item")) {
    row = removeBtn.parentNode;
    listItem = row.parentNode;
    list = listItem.parentNode;
    list.removeChild(listItem);
  }

  if( list.children.length == 0){
    list.className = '';
  }
  if( ul.children.length == 0){
    ul.className = '';
  }
}
