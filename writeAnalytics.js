
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

var all_checksum = {};

var items = [];

var alltypes = {};


ana.forEach(function(item){

  for(var k in item.v){

    item.v[k].forEach(function(o){
      o.type = k;
      o.place = item.place_id;

      if(k == "政黨票"){
        all_checksum[o.name] = all_checksum[o.name] || 0;
        all_checksum[o.name]+=parseInt((o.c||o.cnt).replace(",",""),10);
      }

      alltypes[k] = 1;

      items.push({
        type:k,
        縣市:item.cityname,
        鄉鎮:item.areaname,
        村里:item.villagename,
        開票所編號:item.place_id,
        當選:o.s,
        編號:o.n,
        姓名:o.name,
        性別:o.g,
        票數:parseInt((o.c||o.cnt).replace(",",""),10),
        政黨:o.pt,
      });
      csvStream.write({
        type:k,
        縣市:item.cityname,
        鄉鎮:item.areaname,
        村里:item.villagename,
        開票所編號:item.place_id,
        當選:o.s,
        編號:o.n,
        姓名:o.name,
        性別:o.g,
        票數:parseInt((o.c||o.cnt).replace(",",""),10),
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

console.log(all_checksum);

csvStream.end();
csvStream2.end();


for(var k in alltypes){

  fs.writeFileSync("outputs/votes_type_"+k+".json",JSON.stringify(  items.filter(function(o){
    return o.type == k;
  })));
}

