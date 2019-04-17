var fs = require('fs');
var path = require('path');
var pagesetup = require('./pagesetup');

fs.existsSync('steps') || fs.mkdirSync('steps');

var files = fs.readdirSync('steps');
files.forEach(f => {
    var data = fs.readFileSync(`./steps/${f}`);
    var statements = data.toString().split("\n");
    statements.forEach(function(s, i){
        let lineofcode = s;
        //console.log(s);
        if (s.includes(".click(")){
            lineofcode = lineofcode.split(".click(")[1];
            lineofcode = lineofcode.split(");")[0];
            lineofcode = lineofcode.split(".");
            let objectname = lineofcode[lineofcode.length - 1];
            let pagename = lineofcode[lineofcode.length - 2];
            
            statements[i] = `await pages.${pagename}.click(${objectname});`;
        }
        else if(s.includes(".input(")){
            lineofcode = lineofcode.split(".input(")[1];
            lineofcode = lineofcode.split(");")[0];
            lineofcode = lineofcode.split(",");
            let data = lineofcode[1];
            lineofcode = lineofcode[0].split(".");
            let objectname = lineofcode[lineofcode.length - 1];
            let pagename = lineofcode[lineofcode.length - 2];
            
            statements[i] = `await pages.${pagename}.populate(${objectname}, ${data});`;
        };
        //console.log(s);
    });
    //console.log(statements.join("\n"));

    
    data = statements.join("\n");
    pagesetup.renameFile(`./steps/${f}`, `./steps/_${f}`);
    pagesetup.writeFile(`./steps/${f}`, data);
    
});