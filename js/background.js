//*** FUNCTIONS DECLARATIONS */
 //Functions to read JSON file and to find difference dates

 function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
          callback(rawFile.responseText);          
      }
  }
  rawFile.send(null);
  }

  var date_diff_indays = function(date1, date2) {
    var dt1 = new Date(date1);
    var dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
  }

  
//****** INITIALIZE DATA WHEN EXTENSION IS INSTALLED */
chrome.runtime.onInstalled.addListener(function() {
    var today = new Date();

    //** Quotes Data */
    readTextFile("../data/quotes.json", function(text){
      let data = JSON.parse(text);
      let index = Math.floor(Math.random() * data.length);
      chrome.storage.sync.set({'installedDate': today.toDateString(),'runningDate' : today.toDateString(), 'quoteText' : data[index].text, 'quoteAuthor' : data[index].author}, function() {
      console.log('Initial Quote saved');       
      });
    });

    //** Words Data */
    readTextFile("../data/MasterWordList.json", function(text){
      let data = JSON.parse(text);
      let index;
      let tenwords = new Array(10);
      for(var i=0;i<10;i++){ 
         index = Math.floor(Math.random() * data.length);
        tenwords[i] = data[index].FIELD1;
        } 
      chrome.storage.sync.set({'todayswords': tenwords}, function() {
      console.log('Initial words saved');           
      });
    });




  });

//****** CODE TO MAKE HOMETAB AS DEFAULT NEW TAB  */
chrome.browserAction.onClicked.addListener(function(activeTab)
{
// Making HomeTab as a new tab in the browser
chrome.tabs.create({ url: "index.html" });
    
});

//****** UPDATE QUOTES DAILY  */

chrome.tabs.onCreated.addListener(function(tab){ 

    //Save a daily quote to Chrome Storage for content script to pick up

    var today = new Date();

    chrome.storage.sync.get(['installedDate','runningDate','quoteText','quoteAuthor'], function(datesObj){

      var idate = new Date(datesObj.installedDate);
      var rdate = new Date(datesObj.runningDate);
     
    if((rdate.toDateString() != today.toDateString()) || datesObj.quoteText==null || datesObj.quoteAuthor==null){
    
      //get the quote from Quotes JSON data file and update storage

      readTextFile("../data/quotes.json", function(text){
        var data = JSON.parse(text);
        var index = Math.floor(Math.random() * data.length);
        chrome.storage.sync.set({'quoteText' : data[index].quoteText,'quoteAuthor' : data[index].quoteAuthor,'runningDate' : today}, function() {
        console.log('Quote of the day updated!'); 
        });       
        });

      //get ten new words and update the storage

      var wdIndex = 10* date_diff_indays(idate, new Date());
      let index;
      let tenwords = new Array(10);
      for(var i=0;i<10;i++){ 
         index = Math.floor(Math.random() * (data.length - wdIndex) ) + wdIndex;         
         tenwords[i] = data[index].FIELD1;
        } 
      chrome.storage.sync.set({'todayswords': tenwords}, function() {
      console.log('words updated for today!');           
      });


    } 

});
 
});





