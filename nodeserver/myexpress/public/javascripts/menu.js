const form = document.querySelector("#map")
var cnt = 0;
$(".menuBtn").click(function(e){
    e.preventDefault();
    $(".nav").animate({width:"toggle"},100);
    if(cnt === 0){
        mapShadow.classList.add(MAPSHADOW_LS);
        cnt = 1;
    }
    else{
        mapShadow.classList.remove(MAPSHADOW_LS); 
        cnt = 0;
    }
});