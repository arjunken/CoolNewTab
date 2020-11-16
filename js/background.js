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
          


    } 

});
 
});





