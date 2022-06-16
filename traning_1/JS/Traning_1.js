// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose

// the link to your model provided by Teachable Machine export panel
const URL = "./my_model/";
// import { create_cure } from "../../JS/tranings.js";
let model, webcam, ctx, labelContainer, maxPredictions;

// 스트레칭 번호
const stretchingNum = 1;
// 스트레칭 개수
var cnt = 0;

function pause() {
    webcam.pause();
}

function restart() {
    webcam.play();
}

function move() {

    // 버튼 누르면 위치 이동
    setTimeout(function () {
        document.getElementById("content").style.display = "inline";
        document.getElementById("first").style.display = "flex";
        document.getElementById("first").style.justifyContent = "center";
    }, 1500);

}

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // 시작 버튼 누르면 캔버스 나타내기
    document.getElementById("result").style.display = "";

    // 시작 버튼 누르면 시작 버튼 사라짐
    document.getElementById("startbtn").style.visibility = "hidden";

    // 버튼 누르면 버튼 보임
    setTimeout(function () {
        document.getElementById("pausebtn").style.visibility = "visible";
        document.getElementById("restartbtn").style.visibility = "visible";
    }, 1500);

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const size = 600;
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
    labelContainer = document.getElementById("label-containers");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

var posture = "face"

async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const {
        pose,
        posenetOutput
    } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);

    if (prediction[0].probability.toFixed(2) == 1.00) {

        if (posture == "left") {
            var audio = new Audio('../count/bent.mp3');
            audio.play();
        }
        posture = "right"

    } else if (prediction[1].probability.toFixed(2) == 1.00) {
        if (posture == "right") {
            var audio = new Audio('../count/bent.mp3');
            audio.play();
        }
        posture = "left"

    } else if (prediction[2].probability.toFixed(2) >= 0.90) {
        if (posture == "left") {
            cnt++
            var audio = new Audio('../count/' + cnt % 10 + '.mp3');
            audio.play();
        } else if (posture == "right") {
            cnt++
            var audio = new Audio('../count/' + cnt % 10 + '.mp3');
            audio.play();
        }
        posture = "face"
    }

    labelContainer.innerHTML = cnt + "개";

    if (cnt == 10) {
        labelContainer.innerHTML = "수고하셨습니다.";
    }

    // 창 닫을 때 alert창
    window.addEventListener("beforeunload", function (event) {
        
        event.returnValue = "나가겠습니까?";
        // 전유리 함수 호출
        
    });

    if (cnt == 10) {
        // 스트레칭 생성
        // 전유리 이거 넣으면 에러 남
        // create_cure(stretchingNum, cnt);
    }

    // 무슨 동작을 하는지 적힘
    // for (let i = 0; i < maxPredictions; i++) {
    //     const classPrediction =
    //         prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    //     labelContainer.childNodes[i].innerHTML = classPrediction;
    // }

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
