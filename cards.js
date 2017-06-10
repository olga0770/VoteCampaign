// Original JavaScript code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header.

 var card_value = ['1C','2C','3C','4C','5C','6C','7C','8C','1H','2H','3H','4H','5H','6H','7H','8H'];

// set default positions
var card_left = [];
var card_top = [];

for(var i=0; i < 16; i++) {
  card_left[i] = 70 + 100 * (i%4);
  card_top[i] = 15 + 120 * Math.floor(i/4);}

var started = false;

function moveToPlace(id)
{
console.log('moveToPlace');

  var el = document.getElementById("card_" + id);
  el.style["zIndex"] = 1000;
  el.style["left"] = card_left[id] + "px";
  el.style["top"] = card_top[id] + "px";
  el.style["WebkitTransform"] = "rotate(180deg)";
  el.style["zIndex"] = 0;}

// flip over card and check for match
function showCard(id)
{
  var el = document.getElementById("card_" + id);

    // TODO
    // maybe we have to put our own PNG file here ?

 el.firstChild.src = "picture/" + card_value[id] + ".png";

    // animating - the card is shown

  el.style["WebkitTransform"] = "scale(1.2) rotate(185deg)";
  el.style["MozTransform"] = "scale(1.2)";
  el.style["OTransform"] = "scale(1.2)";
  el.style["msTransform"] = "scale(1.2)";}

function cardClick(id){
    //console.log('cardClick was called...');
if(started) {
    showCard(id);
  } else {
    // shuffle and deal cards
    //card_value.sort(function() { return Math.round(Math.random()) - 0.5; });
    for(i=0; i < 16; i++) setTimeout("moveToPlace(" + i + ")", i * 100);
    started = true;}
}

