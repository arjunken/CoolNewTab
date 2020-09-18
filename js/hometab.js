//**Function Declarations**//
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


//**Local Clock */
const CURRENTTIME = document.querySelector("#timedisplay");

function runClock() {
var date = new Date();

let day = date.getDay();
let month = date.getMonth();

CURRENTTIME.innerHTML = date.toDateString() + " " + date.toLocaleTimeString();

}

var interval = setInterval(runClock, 1000)

chrome.storage.sync.get(['quoteText','quoteAuthor','todayswords'], function(dataObj) {
  
  //**QUOTES SCRIPT */
  document.querySelector("#quoteblock").innerHTML = dataObj.quoteText;
  document.querySelector("#author").innerHTML = dataObj.quoteAuthor;

  //*** WORD OF THE DAY */
  let index = Math.floor(Math.random() * dataObj.todayswords.length);
  document.querySelector("#wordoftheday").innerHTML = dataObj.todayswords[index];
  
  //** Call google word definition API for defnitions */
  let URL = "https://api.dictionaryapi.dev/api/v2/entries/en/" + dataObj.todayswords[index];
  var mwURL = "https://www.merriam-webster.com/dictionary/" + dataObj.todayswords[index];
  readTextFile(URL, function(text){
    var data = JSON.parse(text);
    if( data.length>0){
      if(data[0].meanings.length>0){
        if(data[0].meanings[0].definitions.length>0){
          document.querySelector("#wod-def").innerHTML = data[0].meanings[0].definitions[0].definition;
          if(data[0].meanings[0].definitions[0].example!=null){
          document.querySelector("#wod-ex").innerHTML = data[0].meanings[0].definitions[0].example;
          }else{
          document.querySelector("#wod-ex").innerHTML = "No examples found"
          }
          if(data[0].meanings[0].definitions[0].synonyms!=null){
          document.querySelector("#wod-syn").innerHTML = String(data[0].meanings[0].definitions[0].synonyms).trim().replace(/,/g,', ');
          }else{
          document.querySelector("#wod-syn").innerHTML = "No synonyms found";
          }
        }
        document.querySelector("#wod-pos").innerHTML = data[0].meanings[0].partOfSpeech;
      
       if(data[0].phonetics.length>0){
          document.querySelector("#wod-phonetics").innerHTML = data[0].phonetics[0].text;
          /* console.log(data[0].phonetics[0].audio);*/
        }

          document.querySelector("#wod-link").innerHTML = "Read more about the word";
          document.querySelector("#wod-link").setAttribute("href",mwURL);

      } else{

          document.querySelector("#wod-link").innerHTML = "Tough one! Check the Dictionary!";
          document.querySelector("#wod-link").setAttribute("href",mwURL);
      }        

    } else {
     
          document.querySelector("#wod-link").innerHTML = "Tough one! Check the Dictionary!";
          document.querySelector("#wod-link").setAttribute("href",mwURL);

    } 
    

  });

  


});
  






//*** WEATHER SCRIPT */  

