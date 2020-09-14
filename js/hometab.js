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

chrome.storage.sync.get(['quoteText','quoteAuthor'], function(qtObj) {
  
  document.querySelector("#quoteblock").innerHTML = qtObj.quoteText;
  document.querySelector("#author").innerHTML = qtObj.quoteAuthor;
  
});
 
  


//*** WEATHER SCRIPT */       


//*** WORD OF THE DAY */


