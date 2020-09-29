
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

// external js: packery.pkgd.js
var $grid = $('.grid').packery({
  itemSelector: '.grid-item', 
  columnWidth: 20,
  initLayout: true
});

// make all grid-items draggable
function makeDraggable(){
$grid.find('.grid-item').each( function( i, gridItem ) {
  var draggie = new Draggabilly( gridItem );
  // bind drag events to Packery
  $grid.packery( 'bindDraggabillyEvents', draggie );
});
};
makeDraggable();

$('#widgetSave').on( 'click', function() {
  // create new item elements
  // var $items = getItemElement().add( getItemElement() ).add( getItemElement() );

  let n = $(".widget").length+1;
  
  // let wname = document.forms["wform"]["wname"].value;
  let wcolor = document.forms["wform"]["wcolor"].value;
  let wwidth = document.forms["wform"]["wwidth"].value;

  // if(wname==""){
  //   wname = "Widget Title";
  // }

  if(wwidth==1){
    var $items = ('<div id="widget-'+n+'" class="grid-item" style="background-color:'+ wcolor +';"></div>');   
  } else {
    var $items = ('<div id="widget-'+n+'" class="grid-item grid-item--width'+ wwidth +'" style="background-color:'+ wcolor +';"></div>');
  }
   


  // append elements to container
  $grid.prepend( $items )
    // add and lay out newly appended elements
  $grid.packery( 'prepended', $items );
  $grid.packery('destroy');
  $grid = $('.grid').packery({
    itemSelector: '.grid-item',
    columnWidth: 20,
    initLayout: true // disable initial layout
  });
  makeDraggable();
  
});


// make <div class="grid-item grid-item--width# grid-item--height#" />
// function getItemElement() {
//   var $item = $('<div class="grid-item"></div>');
//   // add width and height class
//   var wRand = Math.random();
//   var hRand = Math.random();
//   var widthClass = wRand > 0.85 ? 'grid-item--width3' : wRand > 0.7 ? 'grid-item--width2' : '';
//   var heightClass = hRand > 0.85 ? 'grid-item--height3' : hRand > 0.5 ? 'grid-item--height2' : '';
//   $item.addClass( widthClass ).addClass( heightClass );
//   return $item;
// }

});