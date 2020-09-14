
chrome.runtime.onInstalled.addListener(function() {
    var today = new Date();
    chrome.storage.sync.set({'installedDate': today.toDateString(),'runningDate' : today.toDateString(), 'quoteText' : "Genius is one percent inspiration and ninety-nine percent perspiration.", 'quoteAuthor' : "Thomas Edison"}, function() {
      console.log('Settings saved'); 
      
    });

  });


chrome.browserAction.onClicked.addListener(function(activeTab)
{
// Making HomeTab as a new tab in the browser
chrome.tabs.create({ url: "index.html" });
    
});


chrome.tabs.onCreated.addListener(function(tab){ 

    //Save a daily quote to Chrome Storage for content script to pick up

    var today = new Date();

    chrome.storage.sync.get(['installedDate','runningDate'], function(datesObj){

      var idate = new Date(datesObj.installedDate);
      var rdate = new Date(datesObj.runningDate);

  if(rdate.toDateString() != today.toDateString()){
    
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

      //get the index of quote array for the running date
            
      var currentQtIndex = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(idate.getFullYear(), idate.getMonth(), idate.getDate()) ) /(1000 * 60 * 60 * 24));

      //get the quote from Quotes JSON data file

      readTextFile("../data/quotes.json", function(text){
        var data = JSON.parse(text);
        var fetchedquote;
        if (currentQtIndex <= data.length){
          fetchedquote = [data[currentQtIndex].text, data[currentQtIndex].author];
          chrome.storage.sync.set({'quoteText' : fetchedquote[0],'quoteAuthor' : fetchedquote[1],'runningDate' : today}, function() {
          message('Quote of the day updated!'); 
          });
            
        }else{    
          currentQtIndex = ((currentQtIndex - (data.length * Math.trunc(( currentQtIndex / data.length))))-1);
          fetchedquote = [data[currentQtIndex].text, data[currentQtIndex].author];
          chrome.storage.sync.set({'quoteText' : fetchedquote[0],'quoteAuthor' : fetchedquote[1],'runningDate' : today}, function() {
          message('Quote of the day updated!'); 
          });

        }        
      

        });
  } 

});
 
});





