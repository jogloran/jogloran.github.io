"use strict";angular.module("reqAnnoApp",[]),angular.module("reqAnnoApp",["ngRoute","ui.bootstrap"],["$routeProvider",function(a){a.when("/doc/:id",{controller:"DocController",templateUrl:"views/partial-doc.html"}).otherwise({redirectTo:"/doc/1"})}]).controller("MainCtrl",["$scope","$http",function(a){a.labels="meeting call do send read other not_request".split(" "),a.classForLabel=function(a){switch(a){case"meeting":return"btn-primary";case"call":return"btn-info";case"do":return"btn-warning";case"send":return"btn-danger";case"read":return"btn-success";case"other":return"btn-default";case"not_request":return""}}}]).controller("DocController",["$scope","$http","$routeParams","$location",function(a,b,c,d){a.currentIndex=0,Mousetrap.bind("g",function(){window.scrollTo(0,0)}),Mousetrap.bind("G",function(){window.scrollTo(0,document.body.scrollHeight)}),Mousetrap.bind("left",function(){a.$apply(function(){a.prev()})}),Mousetrap.bind("right",function(){a.$apply(function(){a.next()})}),Mousetrap.bind("up",function(){return a.$apply(function(){a.currentIndex=Math.max(a.currentIndex-1,0)}),!1}),Mousetrap.bind("down",function(){return a.$apply(function(){a.currentIndex=Math.min(a.currentIndex+1,a.instances.length-1)}),!1}),[["m","meeting"],["c","call"],["d","do"],["s","send"],["r","read"],["x","not_request"],["o","other"]].forEach(function(b){var c=b[0],d=b[1];Mousetrap.bind(c,function(){a.$apply(function(){a.didSelectDropdown(a.id,a.instances[a.currentIndex],d),a.currentIndex=Math.min(a.currentIndex+1,a.instances.length-1)})})}),a.instances=[],a.refresh=function(){b.get("http://localhost:8888/"+a.id).success(function(b){a.instances=b.result})},a.prev=function(){+c.id-1>=1&&d.path("/doc/"+(+c.id-1))},a.next=function(){d.path("/doc/"+(+c.id+1))},a.didSelectDropdown=function(c,d,e){var f=JSON.stringify({instance:d,label:e});b.post("http://localhost:8888/"+c,f).success(function(){a.refresh()})},c.id&&(a.id=c.id),a.refresh()}]).run(["$route",angular.noop]);