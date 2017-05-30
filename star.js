$(window).on("load", sidenVises);
$(".tag").hide();


function sidenVises() {
    console.log("siden vises");

$(".gethashtag").on("click", buttonworks);
}


function buttonworks() {
    console.log("tag cames");

$(".gethashtag").off("click", buttonworks);

setTimeout(tagmovement, 20);
}


function tagmovement() {
$(".tag").show(1000);
$(".gethashtag").hide();
$(".tag").addClass("tagmove");
$(".tag").on("animationend", ontheplace);
}


function ontheplace() {
console.log("tag on the place");

$(".tag").removeClass("tagmove");
$(".tag").off("animationend", ontheplace);

}














function rememberPosition(element) {
        console.log($(element).offset().left + "offset");
        $(element).offset($(element).offset());
    }
