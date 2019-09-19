var app = angular.module('nice', ['ngRoute']);

app.config(function($routeProvider){
  $routeProvider
  .when("/", {
    templateUrl : "userIndex.html"
  })
  .when("/cart", {
    templateUrl : "userCart.html"
  })
  .when("/myOrder", {
    templateUrl : "userOrder.html"
  })
  .when("/admin", {
    templateUrl : "adminIndex.html"
  })
  .when("/orders", {
    templateUrl : "adminOrders.html"
  })
  .when("/createItem", {
    templateUrl : "adminCreate.html"
  })
  .when("/orders", {
    templateUrl : "adminOrders.html"
  });
});
