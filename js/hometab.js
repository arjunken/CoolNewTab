
jQuery(document).ready(function($) {


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


// Functionality to toggle pages
$(".nav").on('click','li',function(){

  $(this).children("button").removeClass("btn-secondary");
  $(this).children("button").addClass("btn-primary");
  $(this).siblings().children("button").removeClass("btn-primary");
  $(this).siblings().children("button").addClass("btn-secondary");

});

$('li').click(function(){
  
  $(this).addClass('active')
       .siblings()
       .removeClass('active');
  var feature = $(this).attr('class').split(' ')[0];
  
  if(feature == "bkm-btn") {
    $("#wz-AddBtn").css("display","none");
    $("#bkm-AddBtn").css("display","");
    $("#td-AddBtn").css("display","none");
    $("#nt-AddBtn").css("display","none");
    $(".wz-tab").css("display","none");
    $(".wz-add-remove").css("display","none");
    $(".bookmarks-tab").css("display","");
    $(".todos-tab").css("display","none");
    $(".notes-tab").css("display","none");
   }

   if(feature == "wgt-btn") {
    $("#wz-AddBtn").css("display","");
    $("#bkm-AddBtn").css("display","none");
    $("#td-AddBtn").css("display","none");
    $("#nt-AddBtn").css("display","none");
    $(".wz-tab").css("display","");
    $(".wz-add-remove").css("display","none");
    $(".bookmarks-tab").css("display","none");
    $(".todos-tab").css("display","none");
    $(".notes-tab").css("display","none");
   }

   if(feature == "td-btn") {
    $("#wz-AddBtn").css("display","none");
    $("#bkm-AddBtn").css("display","none");
    $("#td-AddBtn").css("display","");
    $("#nt-AddBtn").css("display","none");
    $(".wz-tab").css("display","none");
    $(".wz-add-remove").css("display","none");
    $(".bookmarks-tab").css("display","none");
    $(".todos-tab").css("display","");
    $(".notes-tab").css("display","none");
   }

   if(feature == "nt-btn") {
    $("#wz-AddBtn").css("display","none");
    $("#bkm-AddBtn").css("display","none");
    $("#td-AddBtn").css("display","none");
    $("#nt-AddBtn").css("display","");
    $(".wz-tab").css("display","none");
    $(".wz-add-remove").css("display","none");
    $(".bookmarks-tab").css("display","none");
    $(".todos-tab").css("display","none");
    $(".notes-tab").css("display","");
   }
   
     
});

// packery and draggable initialization
var $grid = $('.grid').packery({
  itemSelector: '.grid-item', 
  columnWidth: 20,
  initLayout: true
});

// Add widgets
var wcolor = 'white';
var wwidth = 1;
$("#colorpick").css("width","15%");
$("input[name='wsize']").click(function(){
    var radioValue = $("input[name='wsize']:checked").val();
    if(radioValue == 'small'){
      $("#colorpick").css("width","15%");
      wwidth=1;
    }
    if(radioValue == 'medium'){
      $("#colorpick").css("width","30%");
      wwidth=2;
    }
    if(radioValue == 'big'){
      $("#colorpick").css("width","50%");
      wwidth=3;
    }
    if(radioValue == 'banner'){
      $("#colorpick").css("width","75%");
      wwidth=4;
    }
   
  });
  
$("#colorpick").blur(function(){
wcolor = $("#colorpick").val();
$("#size-preview").css("fill",wcolor);
});


$('#widgetSave').on( 'click', function() {
  let n = $(".widget").length+1;
  let wname = $("#wname").val();
  
  if(wwidth==1){    
  var $items =  ('<div id="widget-'+n+'" class="grid-item card">'+
                  '<div class="card-header p-1">'+ 
                  '<h6 id="card-header-text">'+wname+'</h6>'+
                  '<img id="trash-icon" src="Icons/trash-can.png">'+ 
                  '<img id="edit-icon" src="Icons/edit.png">'+ 
                  '</div>'+
                  '<div class="card-body p-1" style="background-color:'+wcolor+'; opacity:0.5"><p> </p>'+
                  '</div>'+
                  '</div>');
  } else{
    var $items =  ('<div id="widget-'+n+'" class="grid-item grid-item--width'+wwidth+' card">'+
    '<div class="card-header p-1">'+ 
    '<h6 id="card-header-text">'+wname+'</h6>'+
    '<img id="trash-icon" src="Icons/trash-can.png">'+ 
    '<img id="edit-icon" src="Icons/edit.png">'+ 
    '</div>'+
    '<div class="card-body p-1" style="background-color:'+wcolor+'; opacity:0.5"><p> </p>'+
    '</div>'+
    '</div>');
  }

  $grid.prepend( $items )    
  $grid.packery( 'prepended', $items );
  $grid.packery('destroy');
  $grid = $('.grid').packery({
    itemSelector: '.grid-item',
    columnWidth: 20,
    initLayout: true // disable initial layout
   });  
   
});


//Delete Widgets


// $(document).keyup(function(e) {
//   if (e.keyCode === 27) { 
//    //Do stuff here
  
//  }
// });



//trigger draggable only when Rearrange button is clicked

// function makeDraggable(){
//   $grid.find('.grid-item').each( function( i, gridItem ) {
//     var draggie = new Draggabilly( gridItem );
//      // bind drag events to Packery     
//     $grid.packery( 'bindDraggabillyEvents', draggie );    
//   });
//   };
//   makeDraggable(); 

  
});