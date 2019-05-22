var modulePallete="";
const Actions= function(){
    var that = {};
    const selectModulePallete = function(moduleName){
        console.log("I am inside method 1");
        switch(moduleName.toLowerCase()){
            case 'chemical equation':
                    modulePallete = 'module-palette-chemical_equation'; 
                    break;      
        }
            return modulePallete;
    }

    that.selectModulePallete=selectModulePallete;
    return that;
}

module.exports = { Actions };