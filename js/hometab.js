//**Local Clock */
const CURRENTTIME = document.querySelector("#timedisplay");

function runClock() {
var date = new Date();

let day = date.getDay();
let month = date.getMonth();

CURRENTTIME.innerHTML = date.toDateString() + " " + date.toLocaleTimeString();

}

var interval = setInterval(runClock, 1000)

//**QUOTES SCRIPT */

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
  
  
  //initialize the beginning date
  var initializedDate = '09/09/2020';
  var currentQtIndex = date_diff_indays(initializedDate, new Date())
  
  //get the quote from Quotes JSON data file
  
  readTextFile("./data/quotes.json", function(text){
    var data = JSON.parse(text);
    var fetchedquote;
    if (currentQtIndex <= data.length){
      fetchedquote = [data[currentQtIndex].text, data[currentQtIndex].author];
        
    }else{    
      fetchedquote = ((currentQtIndex - (data.length * Math.trunc(( currentQtIndex / data.length))))-1);
    }
  
  const QUOTEELEMENT = document.querySelector("#quoteblock");
  const AUTHORELEMENT = document.querySelector("#author");
  
  // place the quote in the html element
  QUOTEELEMENT.innerHTML = fetchedquote[0];
  AUTHORELEMENT.innerHTML = fetchedquote[1];
  
  });


//*** WEATHER SCRIPT */       


//*** WORD OF THE DAY */


