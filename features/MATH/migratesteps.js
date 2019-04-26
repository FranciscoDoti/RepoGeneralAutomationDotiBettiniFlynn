var fs = require('fs');
var pagesetup = require('./migratepages');

module.exports = {
    runner: function () {
        fs.existsSync('steps') || fs.mkdirSync('steps');

        var files = fs.readdirSync('steps');
        files.forEach(f => {
            var data = fs.readFileSync(`./steps/${f}`);
            var statements = data.toString().split("\n");
            statements.forEach(function (s, i) {
                let lineofcode = s,
                    objectname, pagename, data;
                //console.log(s);
                if (s.includes(".click(") && !s.includes(".click('")) {
                    lineofcode = lineofcode.split(".click(")[1];
                    lineofcode = lineofcode.split(");")[0];
                    lineofcode = lineofcode.split(".");
                    objectname = lineofcode[lineofcode.length - 1];
                    pagename = lineofcode[lineofcode.length - 2];

                    statements[i] = `await pages.${pagename}.click('${objectname}');`;
                } else if (s.includes(".input(")) {
                    lineofcode = lineofcode.split(".input(")[1];
                    lineofcode = lineofcode.split(");")[0];
                    lineofcode = lineofcode.split(",");
                    data = lineofcode[1];
                    lineofcode = lineofcode[0].split(".");
                    objectname = lineofcode[lineofcode.length - 1];
                    pagename = lineofcode[lineofcode.length - 2];

                    statements[i] = `await pages.${pagename}.populate('${objectname}', ${data});`;
                } else if (s.includes(".exists(") && !s.includes(".Exists('")) {
                    try {
                        lineofcode = lineofcode.split(".exists(")[1];
                        lineofcode = lineofcode.split(");")[0];
                        lineofcode = lineofcode.split(".");
                        objectname = lineofcode[lineofcode.length - 1];
                        pagename = lineofcode[lineofcode.length - 2];
                    } catch (err) {
                        console.log(err);
                        console.log(statements[i]);
                    }

                    statements[i] = `await pages.${pagename}.elementExists('${objectname}');`;
                } else if (s.includes(".sendKeys(")) {
                    lineofcode = lineofcode.split(".sendKeys(")[1];
                    lineofcode = lineofcode.split(");")[0];
                    lineofcode = lineofcode.split(",");
                    data = lineofcode[1];
                    lineofcode = lineofcode[0].split(".");
                    objectname = lineofcode[lineofcode.length - 1];
                    pagename = lineofcode[lineofcode.length - 2];

                    statements[i] = `await pages.${pagename}.sendKeys('${objectname}', ${data});`;
                } else if (s.includes("const _ = require('lodash');")) {
                    statements[i] = "";
                } else if (s.includes("let qa = new selenium(this.driver);")) {
                    statements[i] = "";
                };
            });

            data = statements.join("\n");
            console.log(data.toString());
            pagesetup.renameFile(`./steps/${f}`, `./steps/_${f}`);
            pagesetup.writeFile(`./steps/${f}`, data);
        });
    }
}

module.exports.runner();