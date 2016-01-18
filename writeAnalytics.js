
import ana from "./analytics";

import fs from "fs";
import csv from "fast-csv";


var csvStream = csv.createWriteStream({headers: true}),
    writableStream = fs.createWriteStream("outputs/votes_all.csv"); 
csvStream.pipe(writableStream);

var csvStream2 = csv.createWriteStream({headers: true}),
    writableStream2 = fs.createWriteStream("outputs/places.csv"); 
csvStream2.pipe(writableStream2);

var place_ids = {};

var type_sum = {};


ana.forEach(function(item){

  for(var k in item.v){

    item.v[k].forEach(function(o){
      o.type = k;
      o.place = item.place_id;
      csvStream.write({
        type:k,
        開票所編號:item.place_id,
        當選:o.s,
        編號:o.n,
        姓名:o.name,
        性別:o.g,
        票數:o.c,
        政黨:o.pt,
      });
    });

  }

  delete item.v;
  if(place_ids[item.place_id] == null){
    item["開票所編號"] = item.place_id;    
    delete item.place_id;
    csvStream2.write(item);
    place_ids[item.place_id]=1;
  }  
});


csvStream.end();
csvStream2.end();



//fs.writeFileSync("outputs/votes_thin_all.json",JSON.stringify(ana));
