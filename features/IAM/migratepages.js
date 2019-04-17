const fs = require('fs');
const path = require('path');

module.exports = {
    runner : function(){
        //creating page object for the feature
        fs.existsSync("_page") || fs.mkdirSync("_page");
        
        var ffn = require.main.filename.split("/");
        ffn = ffn[ffn.length - 2];

        //read each page object file and create page object files
        var includefiles = "";
        var files = fs.readdirSync(`_page`);
        var stepsPath = '/features/ffn/_page/';

        files.forEach(f=> {
            const pages = require(`../${ffn}/_page/${path.basename(f)}`);
            console.log(`reading file ../${ffn}/_page/${path.basename(f)}.`);

            Object.keys(pages).forEach(p => {
                //add file name to be included in the file paths
                includefiles = includefiles + `${p} : new PageObject('${p}.json', stepsPath),\n`
                
                var webElements = pages[p];
                var obj = {
                    webElements : []
                };

                //create json with formatted webelements //then //create file and add the formatted webelements json
                this.formatWebElements(webElements, obj).then(
                this.writeFile(`_page/${p}.json`, JSON.stringify(obj))
                );
            });

            //rename the source file after reading
            this.renameFile(`./_page/${f}`, `./_page/_${f}`);

            
            //create the module name .js file with all file paths
            this.writeFile(`_page/${ffn}.js`, `const stepsPath = process.cwd() + "${stepsPath}";\n\nlet pages = {\n${includefiles}};\n\nmodule.exports = pages;`);
        });
    },

    formatWebElements : async function(webElements, obj){
        Object.keys(webElements).forEach(w => {
            var value = webElements[w], id;
            
            if(value.substring(0,2) == "//"){id = "xpath";}
            else if(value.substring(0,1) == "." || value.substring(0,1) == "["){id = "css";}
            else {id = "id";};
            
            obj.webElements.push({
                "name": w,
                "byType": id,
                "definition": webElements[w],
                "frame": "default",
                "specialInstr": "NA"
            });
        });
    },

    writeFile : async function(path, contents){
        fs.writeFileSync(path,contents, function(err){
            if(err){
                console.log(`Error while creating the file ${path}. ${err}`);
            }else{
                console.log(`Created the file at ${path}.`);
            };
        });
    },

    renameFile : async function(oldPath, newPath){
        fs.renameSync(oldPath,newPath,function(err){
            if(err){
                console.log(`error renaming ${oldPath} to ${newPath}. \n ${err}`);
            }else{
                console.log(`renamed ${oldPath} to ${newPath}.`);
            }
            ;
        });
    },
};

module.exports.runner();