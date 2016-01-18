
var fs = require("fs");

var data = require("./analytics.js")["default"];
console.log(data.length);

var sum = 0,pt = {};
data.forEach(function(d){
  d["v"]["總統"].forEach(function(v){
    var c = parseInt(v.c.replace(",",""),10);
    sum += c;
    pt[v.pt] = pt[v.pt] || 0;
    pt[v.pt]+= c;
  });
});

console.log(sum);

console.log(pt);

// https://cdn.rawgit.com/tony1223/crawl2016votes/master/outputs/votes_all.json

