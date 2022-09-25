 // 0. 임의 위치의 값6
var myLat = 37.68828198962639;
var myLng = 126.93602389184888;

var cusLat = 37.58970095394986;
var cusLng = 126.92798311517365;

var cenLat = (myLat + cusLat) / 2;
var cenLng = (myLng + cusLng) / 2;

var middleAddress = document.getElementById("middleAddress_title");


// 1. 지도 생성
var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(cenLat, cenLng), // 지도의 중심좌표
        level: 6, // 지도의 확대 레벨
    };
if(localStorage.getItem("Lat")!=null){
    myLat = localStorage.getItem("Lat")
    myLng = localStorage.getItem("Lng")
    cusLat= parseFloat(partnerLat);
    cusLng = parseFloat(partnerLng);
    cenLat = (parseFloat(myLat) + cusLat) / 2;
    cenLng = (parseFloat(myLng) + cusLng) / 2;
    console.log(myLat, myLng);
    console.log(cusLat, cusLng);
    console.log(cenLat, cenLng);

    let geocoder = new kakao.maps.services.Geocoder();

    let callback = function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            middleAddress.innerText =result[0].address.address_name
        }
    };
    let coord = new kakao.maps.LatLng(cenLat, cenLng);
    var boardlocate = geocoder.coord2Address(coord.getLng(), coord.getLat(), callback)

    middleAddress.innerText=cusLng;

    mapOption.center = new kakao.maps.LatLng(cenLat, cenLng)
}

// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

// 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.BOTTOMRIGHT);


// 2. 센터 마커

// 마커가 표시될 위치입니다
var centerPosition = new kakao.maps.LatLng(cenLat, cenLng);

//마커 이미지를 변경
let iconCenter = new kakao.maps.MarkerImage(
    //middleMap.html이 별도 디렉토리 안에 있기 때문에 ../를 써줘야 한다.
    '../images/middleMapCenterPin.png',
    new kakao.maps.Size(40, 40)
);

// 센터 마커 표시 함수
function displayCenterMarker(markerPosition) {
    // 센터 마커를 생성합니다
    var markerCenter = new kakao.maps.Marker({
        map: map,
        position: markerPosition,
        image: iconCenter
    });
    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(centerPosition);
}

displayCenterMarker(centerPosition);

//2-(1). 센터마커 반경 표시하기
// 지도에 표시할 원을 생성합니다
var circle = new kakao.maps.Circle({
    center : new kakao.maps.LatLng(cenLat, cenLng),  // 원의 중심좌표 입니다
    radius: 250, // 미터 단위의 원의 반지름입니다
    strokeWeight: 1, // 선의 두께입니다
    strokeColor: '#75B8FA', // 선의 색깔입니다
    strokeOpacity: 0.5, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: 'solid', // 선의 스타일 입니다
    fillColor: '#CFE7FF', // 채우기 색깔입니다
    fillOpacity: 0.5  // 채우기 불투명도 입니다
});

// 지도에 원을 표시합니다
circle.setMap(map);


// 3. 나의 마커

// 마커가 표시될 위치입니다
var myMarkerPosition = new kakao.maps.LatLng(myLat,myLng);

//마커 이미지를 변경
let iconMy = new kakao.maps.MarkerImage(
    //middleMap.html이 별도 디렉토리 안에 있기 때문에 ../를 써줘야 한다.
    '../images/me.png',
    new kakao.maps.Size(40, 40)
);

// 센터 마커 표시 함수
function displayMyMarker(myMarkerPosition) {
    // 센터 마커를 생성합니다
    var markerCenter = new kakao.maps.Marker({
        map: map,
        position: myMarkerPosition,
        image: iconMy
    });
}
function goBack(){
    location.href="/";
}

displayMyMarker(myMarkerPosition);


// 4. 상대방의 마커

// 마커가 표시될 위치입니다
var customerMarkerPosition = new kakao.maps.LatLng(cusLat, cusLng);

//마커 이미지를 변경
let iconCustomer = new kakao.maps.MarkerImage(
    //middleMap.html이 별도 디렉토리 안에 있기 때문에 ../를 써줘야 한다.
    '../images/customer.png',
    new kakao.maps.Size(80, 100)
);

// 센터 마커 표시 함수
function displayCustomerMarker(customerMarkerPosition) {
    // 센터 마커를 생성합니다
    var markerCustomer = new kakao.maps.Marker({
        map: map,
        position: customerMarkerPosition,
        image: iconCustomer
    });
}

displayCustomerMarker(customerMarkerPosition);


// 5. 클릭하면 생성되는 마커(길찾기 용)

// 지도를 클릭한 위치에 표출할 마커입니다
var clickMarker = new kakao.maps.Marker({
    position: map.getCenter()
});

// 지도에 마커를 표시합니다
clickMarker.setMap(map);
clickMarker.setVisible(false);

// 지도에 클릭 이벤트를 등록합니다
// 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다


let clickMarkerLat = null;
let clickMarkerLng = null;

kakao.maps.event.addListener(map, 'click', function(mouseEvent) {

    // 클릭한 위도, 경도 정보를 가져옵니다
    var latlng = mouseEvent.latLng;
    clickMarkerLat = latlng.getLat();
    clickMarkerLng = latlng.getLng();
    // 마커 위치를 클릭한 위치로 옮깁니다
    clickMarker.setPosition(latlng);

});

//길찾기용 마커 끄기, 켜기
const clickBtn = document.getElementById("clickBtn")

clickBtn.addEventListener("click", function() {
    if(clickBtn.innerText == '켜기'){
        clickBtn.innerText = '끄기';
        setVisible(true);
        console.log(clickMarker.get);
    }else{
        clickBtn.innerText = '켜기';
        setVisible(false);
    }
});

function setVisible(value){
    clickMarker.setVisible(value);
}


// 6. 카카오 길찾기 페이지로 랜딩되는 버튼

function newTapSendUrl(){
    const url = changeUrl();
    return window.open(url);
}

function changeUrl(){
    // 길찾기용 마커의 위치를 반환하여 외부 url 전송
    const href = "http://map.daum.net/link/to/가려고하는위치," + clickMarkerLat + "," + clickMarkerLng
    return href;
}


