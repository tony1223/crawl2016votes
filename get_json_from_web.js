//run in web console.

var areas = [],secname = {};
thrAreaID.forEach(function(item,l1){
  item.forEach(function(item,l2){
    item.forEach(function(item,l3){
      item.forEach(function(item,l4){


        var sn = [l1+1,l2,l3,l4];
        if(sn[3] == 0){
          sn = sn.slice(0,3);

          if(sn[2] == 0){
            sn = sn.slice(0,2);
          }
        }
        secname[sn.join("-")] = thrAreaName[l1][l2][l3][l4];
        
        areas.push({
          代號:sn.join("-"),
          L1:(l1+1),
          L2:sn.length > 2 ? secname[sn.slice(0,2).join("-")] : null,
          L3:sn.length > 3 ? secname[sn.slice(0,3).join("-")] : null,
          名稱:thrAreaName[l1][l2][l3][l4],
          網頁代碼:item
        });
        console.log({
          代號:sn.join("-"),
          L1:(l1+1),
          L2:sn.length > 2 ? secname[sn.slice(0,2).join("-")] : null,
          L3:sn.length > 3 ? secname[sn.slice(0,3).join("-")] : null,
          名稱:thrAreaName[l1][l2][l3][l4],
          網頁代碼:item
        });

      });

    });
  });
});



var secAreas = [],secname = {};
secAreaID.forEach(function(item,l1){
  item.forEach(function(item,l2){
    item.forEach(function(item,l3){

      var sn = [l1+1,l2,l3];
      if(sn[2] == 0){
        sn = sn.slice(0,2);
      }
      secname[sn.join("-")] = secAreaName[l1][l2][l3];
      
      secAreas.push({
        代號:sn.join("-"),
        L1:(l1+1),
        L2:sn.length > 2 ? secname[sn.slice(0,2).join("-")] : null,
        名稱:secAreaName[l1][l2][l3],
        網頁代碼:item.substring(0,item.length - 8)
      });
      console.log({
        代號:sn.join("-"),
        L1:(l1+1),
        L2:sn.length > 2 ? secname[sn.slice(0,2).join("-")] : null,
        名稱:secAreaName[l1][l2][l3],
        網頁代碼:item.substring(0,item.length - 8)
      });

    });
  });
});


console.log(JSON.stringify(secAreas));

