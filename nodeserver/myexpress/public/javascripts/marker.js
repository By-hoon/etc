//----마커 추가 부분----------------------------------------------------------
const stopBtn = document.querySelector(".stopBtn");
const mapShadow = document.querySelector(".mapsh");
const uploadPage = document.querySelector(".contentBox");

const mainBtn = document.querySelector(".menuBtn");
const nav = document.querySelector("#nav");
const addAddress = document.querySelector("#addAddress");

let markerLat = [];

const MARKERLAT_LS = 'markerLat',
    MAPSHADOW_LS = 'mapshadow',
    UPLOADPAGE_LS = 'pageon',
    STOPBTN_LS = 'stop',
    NAV_LS = 'navhide',
    MAINBTN_LS = 'mainbtnhide';

//불러온 값으로 마커 출력
function printMarker(lat, lng){
    var imageSrc = './' + 'KakaoTalk_20200623_145500408.jpg', 
    imageSize = new kakao.maps.Size(20, 20), 
    imageOption = {}; 

var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
    markerPosition = new kakao.maps.LatLng(lat, lng);
var marker = new kakao.maps.Marker({
  position: markerPosition,
  image: markerImage 
});
marker.setMap(map);
//클릭이벤트
kakao.maps.event.addListener(marker, 'click', function() {
});
}

//배열에 저장된 값 불러오기
function loadMarkers(){
    const loadMarkerLat = localStorage.getItem(MARKERLAT_LS);
    if(loadMarkerLat !== null){
        const parsedMarker = JSON.parse(loadMarkerLat);
        parsedMarker.forEach(function(markerIn){
            printMarker(markerIn.lat, markerIn.lng);
        });
    }
}   

var callback = function(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        addAddress.innerText = result[0].address_name;
    }
};

//클릭 이벤트 마커 추가 부분
function makeMarker(mouseEvent){
    var latlng = mouseEvent.latLng; 
    var geoAddrees = new kakao.maps.services.Geocoder();
//찍은 마커 정보 배열에 저장
    const markerLatobj = {
    lat : latlng.getLat(),
    lng : latlng.getLng()
    } ;
 markerLat.push(markerLatobj);
 saveMarkerLat();
 kakao.maps.event.removeListener(map, 'click', makeMarker);
 geoAddrees.coord2RegionCode(latlng.getLng(), latlng.getLat(), callback);
 uploadPage.classList.remove(UPLOADPAGE_LS);
 stopBtn.classList.remove(STOPBTN_LS);
 mainBtn.classList.remove(MAINBTN_LS);
 nav.classList.remove(NAV_LS);
 mapShadow.classList.add(MAPSHADOW_LS); 
}

function addMarker(){
    kakao.maps.event.addListener(map, 'click', makeMarker);
}

function stopAdd(){
    stopBtn.classList.add(STOPBTN_LS);
    uploadPage.classList.add(UPLOADPAGE_LS);
    mainBtn.classList.remove(MAINBTN_LS);
    nav.classList.remove(NAV_LS);
}

function saveMarkerLat(){
    localStorage.setItem(MARKERLAT_LS, JSON.stringify(markerLat));
}

function addPage(){
    uploadPage.classList.remove(UPLOADPAGE_LS);
    stopBtn.classList.remove(STOPBTN_LS);
    mainBtn.classList.add(MAINBTN_LS);
    nav.classList.add(NAV_LS);
}

function latAdd(){
    uploadPage.classList.add(UPLOADPAGE_LS);
    stopBtn.classList.add(STOPBTN_LS);
    mainBtn.classList.add(MAINBTN_LS);
    nav.classList.add(NAV_LS);
    mapShadow.classList.remove(MAPSHADOW_LS); 
    map.setCursor('crosshair');
    addMarker();
}

function init(){
    loadMarkers();
}

init();