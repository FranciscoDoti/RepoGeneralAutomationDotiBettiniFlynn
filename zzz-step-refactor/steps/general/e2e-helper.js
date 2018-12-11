const fs = require("fs");


const writeNewJSON = async function (pageName, file) {
    let fileName = "./page/pageDefsRefactor/LearningCurve/" + file + ".json";
    var resultObj = {};
    fs.readFile(fileName, "utf-8", (error, pageDef) => {
        if (error) throw error;
        const pageDefArr = JSON.parse(pageDef)
        console.log('pageDeffArr', pageDefArr);
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
        pageDefFile = "./page/pageDefs/LearningCurve/" + pageName + ".json";
        fs.writeFile(pageDefFile, header, (err) => {
            if (err) throw err;
            console.log("File Created for ", pageDefFile);
        });
        fs.appendFile(pageDefFile, resultJSON, (err) => {
            if (err) throw err;
        });
    });
  }

const compareNewJSON = async function (firstPageName, secondPageName) {
    let firstFileName = "./page/" + firstPageName + ".json";
    let secondFileName = "./page" + secondPageName + ".json";
    var firstPageDefObject;
    var secondPageDefObject;
    var resultObj = {};
    fs.readFile(firstFileName, "utf-8", (error, pageDefOne) => {
        if (error) throw error;
        firstPageDefObject = JSON.parse(pageDefOne)
        fs.readFile(secondFileName, "utf-8", (error, pageDefTwo) => {
            if (error) throw error;
            secondPageDefObject = JSON.parse(pageDefTwo);
            if(secondPageDefObject[secondPageName] === firstPageDefObject[firstPageName]){
                console.log('they are the same object');
            } else {
                console.log('there are some differences');
                var secondObj = secondPageDefObject[secondPageName]
                var firstObj = firstPageDefObject[firstPageName]
                var resultObj = {};
                for (var ele in firstObj){
                    if(secondObj[ele] == undefined){
                        resultObj[ele + '1'] = firstObj[ele];
                    } else if(secondObj[ele] !== firstObj[ele]) {
                        resultObj[ele + '1'] = firstObj[ele];
                        resultObj[ele + '2'] = secondObj[ele];
                    }
                }
                console.log(resultObj)
            }
        })
    })
}

  module.exports = {
    writeNewJSON,
    compareNewJSON
  }