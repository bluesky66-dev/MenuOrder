//jshint esversion:6
'use strict';
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
 
// require('electron-reload') (__dirname);

const Cart = require('./app/models/cart');

// Set Menu Item file path
let pathName = path.join(__dirname, 'menuitems');

// Set Env
//process.env.NODE_ENV = 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

//----------------------------------------------
// =================== MAIN WINDOW

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1050,
    height: 650,
    icon: 'file://${__dirname}/logo.png',
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, '/index.html'),
      protocol: "file:",
      slashes: true
    })
  );

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // insert Menu
  Menu.setApplicationMenu(mainMenu);

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null;
    app.quit();
  });
}

// Main menu template
const mainMenuTemplate = [
  {
    label:'Action',
    // create submenu
    submenu:[
      {
        label: 'Quit',
        // add key shortcut
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ],
  }
];


// ---------------------------------------------
// ==============  ADD ORDER

ipcMain.on('orderInfo:add', function(e, orderInfo){
  const order = new Order({
    name: _.capitalize(orderInfo.name),
    street: _.capitalize(orderInfo.street),
    city: _.capitalize(orderInfo.city),
    telephone: orderInfo.telephone,
    email: orderInfo.email,
    user: orderInfo.userLoggedIn
  });
  order.save(function (err) {
    if(err){
      console.log(err);
    }
  });
});

// ---------------------------------------------
// =====================  FINALS

// If mac, add empty object to menu
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// Add developer tools item if not in prod mode
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? Command+I : 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  });
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
