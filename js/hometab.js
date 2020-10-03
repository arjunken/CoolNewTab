
jQuery(document).ready(function($) {

// //**Local Clock */
const CURRENTTIME = document.querySelector("#timedisplay");

function runClock() {
var date = new Date();

let day = date.getDay();
let month = date.getMonth();

 $("#timedisplay").text(date.toDateString() + " " + date.toLocaleTimeString());
}

var interval = setInterval(runClock, 1000);

//Navigation Functionality
$('#wzToggle').css('display','none');
$(".grid").css('display','none');
$(".BookmarkPage").css('display','none');

$("#SearchBtn").click(function(){
  $(".SearchPage").css('display','');
  $(".grid").css('display','none');
  $('#wzToggle').css('display','none');
  $('.BookmarkPage').css('display','none');
  $("#searchbox").focus();
})
$("#WidgetsBtn").click(function(){
  $(".grid").css('display','');
  $('#wzToggle').css('display','');
  $(".SearchPage").css('display','none');
  $('.BookmarkPage').css('display','none');
})
$("#BookmarkBtn").click(function(){
  $('.BookmarkPage').css('display','');
  $(".SearchPage").css('display','none');
  $(".grid").css('display','none');
  $('#wzToggle').css('display','none'); 
})

// Functionality for Search Page

$("#searchbox").on('keyup', function (e) {
  if (e.key === 'Enter' || e.keyCode === 13) {
    
    var searchterms = $("#searchbox").val();
    var searchType = $("#optionsbox").find(":selected").text();
     
    if(searchType == "Web Search"){
     var URL = "https://www.google.com/search?q="+ searchterms;
     window.open(URL, "_self");
    }
      
  }
});


// packery and draggable initialization
var $grid = $('.grid').packery({
  itemSelector: '.grid-item', 
  columnWidth: 20,
  initLayout: true
});

var draggies = [];
var isDrag = true;
function makeDraggable(){
  $grid.find('.grid-item').each( function( i, gridItem ) {
    var draggie = new Draggabilly( gridItem );
     // bind drag events to Packery
     draggies.push( draggie );
    $grid.packery( 'bindDraggabillyEvents', draggie );    
  });
  };

// create widgets
$('#widgetSave').on( 'click', function() {
  let n = $(".widget").length+1;
  let wcolor = document.forms["wform"]["wcolor"].value;
  let wwidth = document.forms["wform"]["wwidth"].value;
  if(wwidth==1){
    var $items = ('<div id="widget-'+n+'" class="grid-item" style="background-color:'+ wcolor +';"></div>');   
  } else {
    var $items = ('<div id="widget-'+n+'" class="grid-item grid-item--width'+ wwidth +'" style="background-color:'+ wcolor +';"></div>');
  }
  $grid.prepend( $items )    
  $grid.packery( 'prepended', $items );
  $grid.packery('destroy');
  $grid = $('.grid').packery({
    itemSelector: '.grid-item',
    columnWidth: 20,
    initLayout: true // disable initial layout
   });
  // makeDraggable();  
});

//trigger draggable only when Rearrange button is clicked
 $("#rearrange").click(function(){
  if(isDrag){
    $grid.packery('destroy');
    $grid = $('.grid').packery({
      itemSelector: '.grid-item',
      columnWidth: 20,
      initLayout: true // disable initial layout
     });     
    makeDraggable();
  } else{
    draggies.forEach( function( draggie ) {
      draggie[0]();
    });
  }
  // switch flag
  isDrag = !isDrag;
});


});