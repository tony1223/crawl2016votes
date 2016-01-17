


import cheerio from "cheerio";
import fs from "fs";



function parseTable(content,type){
  var $ = cheerio.load(content);

  var tb = $(".tableT");

  tb.find("* table").remove();

  return {
    type:type,
    update_time:"2016/"+$(".fontTimer").text().split("：")[1].trim(),
    votes:
      tb.find(".trT").map(function(ind,dom){
        var tds = $(dom).find("td");
        var status = "";
        if(tds.eq(0).text().indexOf("◎") != -1){
          status ="當選";
        }else if(tds.eq(0).text().indexOf("？") != -1){
          status ="同票待抽籤";
        }else{
          status = "";
        }
        if(type == "政黨票不分區"){
          return {
            status:status,
            num:tds.eq(0).text(),
            name:tds.eq(1).text(),
            count:tds.eq(2).text(),
            percent:tds.eq(3).text()
          };
        }else{
          return {
            status:status,
            num:tds.eq(1).text(),
            name:tds.eq(2).text(),
            gender:tds.eq(3).text(),
            count:tds.eq(4).text(),
            percent:tds.eq(5).text(),
            party:tds.eq(6).text().replace("推薦","").trim()
          };
        }
        
      })
  };

}

console.log(parseTable(fs.readFileSync("crawl_results/區域立委/T1-n100010100000017.html"),"區域立委"));
console.log(parseTable(fs.readFileSync("crawl_results/總統/P1-n100000100000008.html"),"總統"));
console.log(parseTable(fs.readFileSync("crawl_results/山地原住民立委/T3-n100000100000012.html"),"山地原住民立委"));
console.log(parseTable(fs.readFileSync("crawl_results/政黨票不分區/T4-n100000100000007.html"),"政黨票不分區"));
console.log(parseTable(fs.readFileSync("crawl_results/平地原住民立委/T2-n100000100000012.html"),"平地原住民立委"));

