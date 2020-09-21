
//**Local Clock */
const CURRENTTIME = document.querySelector("#timedisplay");

function runClock() {
var date = new Date();

let day = date.getDay();
let month = date.getMonth();

$(document).ready(function(){

    $("#timedisplay").text(date.toDateString() + " " + date.toLocaleTimeString());

});

}

var interval = setInterval(runClock, 1000);

//* Adding a new widget **/


$(document).ready(function(){

  $("#widgetSave").click(function(){
   
  let n = $("div#divbox").length+1;
  
  let wname = document.forms["wform"]["wname"].value;
  let wcolor = document.forms["wform"]["wcolor"].value;
  let wwidth = document.forms["wform"]["wwidth"].value;

  if(wname==""){
    wname = "Widget Title";
  }

  let htmlel = '<div id="divbox" class="col-md-'+ wwidth +' card border-0 mt-2">'+
                '<div id="widget-'+n+'" style="background-color:'+ wcolor +';">'+
                '<h5 id="widgetTitle">' + wname.toUpperCase() + '</h5>'+
                '</div>'+
                '</div>';

  $("#addWidgetBox").before(htmlel);

  });

  $("#widget-1").click(function(){
    console.log("You have clicked!");
  });

 //** Enter Key response on form submission */
//  var input = addEventListener("keyup", function(event) {
//   if (KeyboardEvent.keyCode === 13) {
//     document.getElementById("widgetSave").click();
//   }
//   });

});

  //**QUOTES SCRIPT */
chrome.storage.sync.get(['quoteText','quoteAuthor'], function(dataObj) {
  
  $(document).ready(function(){
   
    $("#quoteblock").text(dataObj.quoteText);
    $("#author").text(dataObj.quoteAuthor); 

  });
  

 

});











//*** WEATHER SCRIPT */  

