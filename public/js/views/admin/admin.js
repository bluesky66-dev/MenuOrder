//jshint esversion:6
const electron = require('electron');
const {ipcRenderer} = electron;
const ul = document.querySelector('ul');

// Show all database items
ipcRenderer.on('vendorInfo:add', function(e, vendors){
  ul.className = 'collection';

  const li = document.createElement('li');
  li.className = 'collection-item';

  const containerDiv = document.createElement('div');
  containerDiv.className = 'row text-center';
  const vendorDiv = document.createElement('div');
  vendorDiv.className = 'col-lg-3 col-md-3 col-sm-12';
  const titleDiv = document.createElement('div');
  titleDiv.className = 'col-lg-3 col-md-3 col-sm-12';
  const sizeDiv = document.createElement('div');
  sizeDiv.className = 'col-lg-3 col-md-3 col-sm-12';
  const priceDiv = document.createElement('div');
  priceDiv.className = 'col-lg-2 col-md-2 col-sm-12';
  const removeDiv = document.createElement('div');
  removeDiv.className = 'col-lg-1 col-md-1 col-sm-12 remove-item';

  const itemVendor = document.createTextNode(item.vendor);
  const itemTitle = document.createTextNode(item.title);
  const itemSize = document.createTextNode(item.size);
  const itemPrice = document.createTextNode(item.price);
  const itemRemove = document.createTextNode("X");

  const vendorLabel = document.createElement('h6');
  const titleLabel = document.createElement('h6');
  const sizeLabel = document.createElement('h6');
  const priceLabel = document.createElement('h6');
  const removeLabel = document.createElement('h1');
  removeLabel.className = 'text-danger';

  vendorLabel.appendChild(itemVendor);
  titleLabel.appendChild(itemTitle);
  sizeLabel.appendChild(itemSize);
  priceLabel.appendChild(itemPrice);
  removeLabel.appendChild(itemRemove);

  vendorDiv.appendChild(vendorLabel);
  titleDiv.appendChild(titleLabel);
  sizeDiv.appendChild(sizeLabel);
  priceDiv.appendChild(priceLabel);
  removeDiv.appendChild(removeLabel);

  containerDiv.appendChild(vendorDiv);
  containerDiv.appendChild(titleDiv);
  containerDiv.appendChild(sizeDiv);
  containerDiv.appendChild(priceDiv);
  containerDiv.appendChild(removeDiv);

  li.appendChild(containerDiv);

  ul.appendChild(li);

});

// Remove all database Items
ipcRenderer.on('item:clear', function(){
  ul.innerHTML = '';
  ul.className = '';
});

// Remove selected item
ul.addEventListener('dblclick', removeItem);

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
