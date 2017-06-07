

var valgte;

var info;

var aktiv;


        //1. load svg fil

    $("#icon").load("infografics.svg", svg_loaded);



function svg_loaded(){
    console.log("har loaded svg");

        //2. load JSON

    $.getJSON("data.json", data_loaded);
}


        //3. sÃ¦t tekstvariable og aktiver click
function data_loaded(data){
    info = data;
    $("#icon svg g").on("click", vis_info);

    console.table(data);
}

        //4. handlinger ved click
function vis_info(e){
    aktiv = $(e.currentTarget).children();
    valgte = $(e.currentTarget).attr("id");
        //vis tekst fra json
    info.forEach(vis_tekst);

}

function vis_tekst(val){
    if(val.id == valgte){
        document.querySelector(".data_navn").textContent = val.navn;
        document.querySelector(".data_text").textContent = val.text;

    };
}



