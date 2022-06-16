const logintag = document.querySelector(".login");
const user_id = localStorage.getItem("key",'');
function getCookie(key) {
    var result = null;
    var cookie = document.cookie.split(';');
    console.log(cookie);
    cookie.some(function (item) {
        // 공백을 제거
        item = item.replace(' ', '');

        var dic = item.split('=');

        if (key === dic[0]) {
            result = unescape(dic[1]);
            return true; // break;
        }
    });
    return result;
}


// 수정창 기본 데이터 넣기
function modify_data(){
    const user_name = document.getElementById("name-info");
    const user_char = document.querySelector(".radio-div");
    console.log(user_name)
    user_name.value = getCookie("name");
    $(`input[name='chk_char'][value=${getCookie("num")}]`).prop("checked", true);
}
function domcheck(){
    console.log(logintag);
    console.log(user_id);
    if(user_id){
        logintag.innerHTML = `${user_id}`;
    }else{
        let s = `<a href="./login.html">Login</a>`;
        logintag.innerHTML = s;
    };
}
domcheck();
