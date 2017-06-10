$(window).on("load", sidenVises);
var isChoiceMade = false;

function sidenVises() {
    console.log("siden vises");


$("#cross").addClass("updown");
$("#cross").on("animationend", updownmovement);
$("#cross").on("click", crossclick);
}

function updownmovement() {
console.log("up and down movement");


$("#cross").removeClass("updown");
$("#cross").off("animationend", crossclick);
}


function crossclick() {
    console.log("cross click");

$("#cross").off("click", crossclick);

setTimeout(crossfall, 10);
}

function crossfall() {
     console.log("cross falls");

$("#cross").addClass("crossdown");
$("#cross").on("animationend", insidethebox);
}


function insidethebox() {
console.log("cross in the box");

//$("#cross").removeClass("crossdown");
//$("#cross").off("animationend", insidethebox);

}














function rememberPosition(element) {
        console.log($(element).offset().left + "offset");
        $(element).offset($(element).offset());
    }
