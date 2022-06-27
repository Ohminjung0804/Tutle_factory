// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose

// the link to your model provided by Teachable Machine export panel
// //console.log("init 실행시키기");

const URL = "./my_model/";
// import { edit_ease_turtle } from "../JS/turtles.js";
let model, webcam, ctx, labelContainer, maxPredictions;
let percent = 0;    // 테스트 완화도 데이터(정수)
let call_cnt  =0;   // 호출횟수
// user_email = localStorage.getItem('key');
// edit_ease_turtle(email, result); // 이메일과 결과 넘겨주기 -> result는 int형
async function init() {

    if(localStorage.getItem('key','')===null){
        alert('로그인 후 이용해주세요.');
        return
    }

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // 이미지 삭제
    document.getElementById('temp_img').remove();

    document.getElementById('restartbtn').style.display = '';


    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    // 화면 사이즈
    const size = 400;
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append/get elements to the DOM
    const canvas = document.getElementById("canvas");
    canvas.width = size;
    canvas.height = size;
    ctx = canvas.getContext("2d");
    labelContainer = document.getElementById("label-container");
}
// 쿠키 설정
function setCookie(key, value, expiredays) {
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = key + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}
// 쿠키 가져오기
function getCookie(key) {
    var result = null;
    var cookie = document.cookie.split(';');
    //console.log(cookie);
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

// 데이터 변경
let edit_turtle_check = function (email, ease) {
    ////console.log(email)
    $(document).ready(function () {
        $.ajax({
            type: "PUT",
            url: 'http://3.94.248.115/turtle/user?user_email=' + email,
            dataType: "json",
            accept: "application/json",
            data: JSON.stringify({
                "email": email,
                "name": getCookie("name"),
                "num": getCookie("num"),
                "best": getCookie("best"),
                "ease": ease
            }),
            //전달할 때 사용되는 파라미터 변수명
            // 이 속성을 생략하면 callback 파라미터 변수명으로 전달된다.
            success: function (data, textStatus, jqXHR) {
                //console.log('success');
                //console.log('테스트 데이터 ',data)
                setCookie("email",data.email,100);
                setCookie("name",data.name,100);
                setCookie("num",data.num,100);
                setCookie("ease",data.ease,100);
                setCookie("best",data.best,100);
                setCookie("created",data.created,100);
                //console.log(document.cookie);
                //console.log(JSON.parse(data[0]));
            },
            error: function (xhr, textStatus, error) {
                console.log(xhr.responseText);
                console.log(textStatus);
                console.log(error);
            }
        });
    });
}

// 테스트 데이터 수정 

// document.getElementById('startbtn').addEventListener('click', init);

async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    let t = window.requestAnimationFrame(loop);
    if(call_cnt>=80){
        window.cancelAnimationFrame(t);
        let user_email = localStorage.getItem("key",''); // 이메일 가져오기
        //console.log(user_email);
        edit_turtle_check(user_email,percent); // 테스트 데이터 저장부분 수정
    }
}

async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const {
        pose,
        posenetOutput
    } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);
    call_cnt+=1;

    // 무슨 동작을 하는지 적힘
    // percent = Math.round(prediction[1].probability.toFixed(4)*1000);

    // 전유리 turtl : 거북목 확률
    const turtle = ((prediction[0].probability.toFixed(2)) * 100);
    const face = ((prediction[2].probability.toFixed(2)) * 100);
    const left = ((prediction[3].probability.toFixed(2)) * 100);

    if(turtle >= face && turtle >= left){
        labelContainer.innerHTML = "당신은 거북목 확률 " + turtle + "% 입니다.";
    }  else if(face >= 10 || left >= 10) {
        labelContainer.innerHTML = "우측을 바라보고 서주세요.";
    }
    
    percent = Math.round(turtle);
    // finally draw the poses
    drawPose(pose);
}

function drawPose(pose) {
    if (webcam.canvas) {
        ctx.drawImage(webcam.canvas, 0, 0);
        // draw the keypoints and skeleton
        if (pose) {
            const minPartConfidence = 0.5;
            tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
            tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        }
    }
}