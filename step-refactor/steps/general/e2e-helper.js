const fs = require("fs");


const writeNewJSON = async function (pageName, file) {
    let fileName = "./page/pageDefs/" + file + ".json";
    var resultObj = {};
    fs.readFile(fileName, "utf-8", (error, pageDef) => {
        if (error) throw error;
        const pageDefArr = JSON.parse(pageDef)
        pageDefArr["webElements"].forEach((ele)=>{
            if(resultObj[ele["name"]]){
                console.log("Why is the a repeat?")
            } else {
                if(ele.byType === "xpath"){
                    if(ele["definition"][1] !== "/"){
                        resultObj[ele["name"]] = "/" + ele["definition"];
                    } else {
                        resultObj[ele["name"]] = ele["definition"];
                    }
                } else if(ele.byType === "id"){
                    resultObj[ele["name"]] = "#" + ele["definition"];
                } else if(ele.byType === "classname"){
                    resultObj[ele["name"]] = "." + ele["definition"];
                }
            }
        })
        var result = {}
        let header = ""
        result[pageName] = resultObj;
        let resultJSON = JSON.stringify(result);
        pageDefFile = "./page/" + pageName + ".json";
        fs.writeFile(pageDefFile, header, (err) => {
            if (err) throw err;
            console.log("File Created for ", pageDefFile);
        });
        fs.appendFile(pageDefFile, resultJSON, (err) => {
            if (err) throw err;
        });
    });
  }

  module.exports = {
    writeNewJSON
  }