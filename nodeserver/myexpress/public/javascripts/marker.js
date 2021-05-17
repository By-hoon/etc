//----마커 추가 부분----------------------------------------------------------
const stopBtn = document.querySelector(".stopBtn");
const mapShadow = document.querySelector(".mapsh");
const uploadPage = document.querySelector(".contentBox");

let markerLat = [];

const MARKERLAT_LS = 'markerLat'
const MAPSHADOW_LS = 'mapshadow'
const UPLOADPAGE_LS = 'pageon'
const STOPBTN_LS = 'stop';

//불러온 값으로 마커 출력
function printMarker(lat, lng){
    var imageSrc = './' + 'KakaoTalk_20200623_145500408.jpg', 
    imageSize = new kakao.maps.Size(20, 20), 
    imageOption = {offset: new kakao.maps.Point(10 , 20)}; 

var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
    markerPosition = new kakao.maps.LatLng(lat, lng);
var marker = new kakao.maps.Marker({
  position: markerPosition,
  image: markerImage 
});
marker.setMap(map);

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

//클릭 이벤트 마커 추가 부분
function makeMarker(mouseEvent){
    mapShadow.classList.add(MAPSHADOW_LS);
    var latlng = mouseEvent.latLng; 
    var imageSrc = './' + 'KakaoTalk_20200623_145500408.jpg', // 마커이미지의 주소입니다    
    imageSize = new kakao.maps.Size(20, 20), // 마커이미지의 크기입니다
    imageOption = {offset: new kakao.maps.Point(10 , 20)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
    markerPosition = new kakao.maps.LatLng(latlng.getLat(), latlng.getLng()); // 마커가 표시될 위치입니다

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
  position: markerPosition,
  image: markerImage // 마커이미지 설정 
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);  

//찍은 마커 정보 배열에 저장
const markerLatobj = {
    lat : latlng.getLat(),
    lng : latlng.getLng()
} ;
 markerLat.push(markerLatobj);
 saveMarkerLat();
}

function addMarker(){
    kakao.maps.event.addListener(map, 'click', makeMarker);
    stopBtn.classList.remove(STOPBTN_LS);
}

function stopAdd(){
    kakao.maps.event.removeListener(map, 'click', makeMarker);
    stopBtn.classList.add(STOPBTN_LS);
    mapShadow.classList.remove(MAPSHADOW_LS);
    uploadPage.classList.add(UPLOADPAGE_LS);
}

function saveMarkerLat(){
    localStorage.setItem(MARKERLAT_LS, JSON.stringify(markerLat));
}

function addPage(){
    uploadPage.classList.remove(UPLOADPAGE_LS);
}

function init(){
    loadMarkers();
}

init();