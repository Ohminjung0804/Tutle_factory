var httpRequest;
if (window.XMLHttpRequest) { // 모질라, 사파리, IE7+ ...
    httpRequest = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE 6 이하
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}

const btn = document.getElementById('btn');
const box = document.getElementById('box');

// XMLHttpRequest 객체의 인스턴스를 생성합니다.
var xhr = new XMLHttpRequest();

// open() 메서드는 요청을 준비하는 메서드입니다. (http 메서드, 데이터를 받아올 URL 경로, 비동기 여부)
xhr.open("GET", "data/test.json", true);

// send() 메서드는 준비된 요청을 서버로 전송하는 메서드입니다. (서버에 전달될 정보)
xhr.send("search=alice");

xhr.onload = function () {
    // xhr 객체의 status 값을 검사한다.
    if (xhr.status === 200) {
        // 서버로 부터 받은 데이터를 처리할 코드
    }
}

function loadData(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            document.getElementById('panel').innerHTML = this.responseText;
        }
    };

    xhr.open("GET", "", true);
    xhr.send();
}