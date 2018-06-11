/**
 * http://usejsdoc.org/
 */
'use strict';

const HashTable = require('./HashTable');
const StringProcessing = require('./StringProcessing');
const ScenarioData = require('./ScenarioData');
const WebElement = require('./WebElement');
const fs = require('fs');
const { populateInput, populateClick, populateSelect, populateTextField } = require('./Populate');

const PageObject = function (name) {
  var that = {};
  that.ScenarioData = ScenarioData;

	let sp = StringProcessing(that.ScenarioData);
	that.sp = sp;
	that.pageName = name;
	that.pageDefinitionFileName = "./features/pages/pageDefinitions/" + name;
	that.pageElements = new HashTable({});  //a hash of all of the web elements for this page.
	console.log("New PageObject: " + name);

	var setDriver = function (driver, webdriver) {
		that.driver = driver;
		that.webdriver = webdriver;
	}

	var getDriver = function () {
		return that.driver;
	}

	const getWebDriver = function () {
		return that.webdriver;
	}
	
	var addElement = function (elementName, elements){
		that.pageElements.setItem(elementName, elements);
	}
	
	var getElement = function (elementName){
		return that.pageElements.getItem(elementName);
	}
	
	var hasElement = function (elementName) {
		return that.pageElements.hasItem(elementName);
	}
	
	var loadPageDefinitionFile = function(fullFileName){
		 var contents = fs.readFileSync(fullFileName);
		 var jsonContent = JSON.parse(contents);
		 		 
		 for (var i in jsonContent.webElements) {
			  var element = jsonContent.webElements[i];
			  addElement(element.name, element)
			  console.log("Element:" + element.byType)
		 }
	}
		

	var populateWebObject = function (elementName, value){
		let element = getElement(elementName);
		let newValue=sp.strEval(value);
		console.log("Populating Element: " + element.name + " with value '" + newValue + "'");
		//this.ca.test();
	}
	
	var getWebObjectValue = function (webElementName, variableName){
		that.ScenarioData.storeData("testme", "ronAsher")
	}
	
	var genericPopulateElement = function (elementName, value){
		let elementTarget = "";
		let specialInstr = "";
		let tempElement = {};
		let strTagName = null;
		
		if (hasElement(elementName)) {
			tempElement = getElement(elementName);
			specialInstr = tempElement.specialInstr;
			elementTarget = WebElement(that.driver, that.webdriver, tempElement);
	    	console.log("Info: Page Element '" + elementName + "' retrieved from Page Elements collection.");
	    
	    	strTagName = elementTarget.getWebElement();
	    	
	    	switch (strTagName.toLowerCase()){
    		case "input":
    			populateInput(elementTarget, value, specialInstr);
    			break;
    		case "textarea":
    			populateTextField(elementTarget, value, specialInstr);
    			break;
    		case  "a":
    			populateClick(elementTarget, value, specialInstr);
    			break;
    		case  "button":
    			populateClick(elementTarget, value, specialInstr);
    			break;
    		case  "div":
    			populateClick(elementTarget, value, specialInstr);
    			break;
    		case  "span":
    			populateClick(elementTarget, value, specialInstr);
    			break;
    		case  "ul":
    			populateClick(elementTarget, value, specialInstr);
    			break;
    		case "select":
    			populateSelect(elementTarget, value, specialInstr);
    			break;
    		default:
				console.log("ERROR: We tried to populate an unknown tag(" + strTagName + ") with data in populateGenericElement()\n\tWe failed.");
	    	}		
		}
    	else {
    		console.log("ERROR: WebElement '" + elementName + "' not found in PageElements during PopulateELement() attempt.");	
    	}
	
	}
	const populateElement = function ( strName,  strValue) {
		try {
			console.log("INFO: Starting populate the web element: '" + strName +"' with value '" + strValue + "'");
			console.log("INFO++: WorldData: " + this.worldData);

			strValue = sp.strEval(strValue);

			/*if(!customPopulateElement(strName, strValue)){
				genericPopulateElement(strName, strValue);
			}*/
			genericPopulateElement(strName, strValue);
		} catch (err) {
			console.error(err.stack);
			throw err;
		}
    }
	that.test = function() {
		console.log("PageObject testing.");
	}
	
	that.getWebObjectValue = getWebObjectValue;
	that.populateWebObject = populateWebObject;
	that.getElement = getElement;
	that.hasElement = hasElement;
	that.setDriver = setDriver;
	that.getDriver = getDriver;
	that.populate = populateElement;
	that.populateElement = populateElement;
	
	//that.loadFile = loadFile;
	//that.getPage = getPage;
	loadPageDefinitionFile(that.pageDefinitionFileName)
	return that;
	}


module.exports = PageObject;