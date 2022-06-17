// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose

// the link to your model provided by Teachable Machine export panel
const URL = "./my_model/";
// import { edit_ease_turtle } from "../JS/turtles.js";
let model, webcam, ctx, labelContainer, maxPredictions;
let percent = 0;
let call_cnt  =0;   // 호출횟수
// user_email = localStorage.getItem('key');
// edit_ease_turtle(email, result); // 이메일과 결과 넘겨주기 -> result는 int형
async function init() {

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // 이미지 삭제
    document.getElementById('temp_img').remove();

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
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }

}

// document.getElementById('startbtn').addEventListener('click', init);

async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    let t = window.requestAnimationFrame(loop);
    if(call_cnt>=80){
        window.cancelAnimationFrame(t);
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
    // var result = Number(prediction[0].probability.toFixed(2));

    var result = Number(prediction[0].probability.toFixed(2));

    setTimeout(function () {
        if(result == 1.00){

            Object.freeze(labelContainer);
            return;
        } else{
            labelContainer.innerHTML = "조금 떨어져서 우측을 바라보고 올바르게 서주세요.";
            Object.freeze(labelContainer);
            return;
        }
    }, 5000);

    // 무슨 동작을 하는지 적힘
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
    console.log('완화도',Math.round(prediction[1].probability.toFixed(2)*100));
    percent = Math.round(prediction[1].probability.toFixed(2));

    // Object.freeze(result);
    // labelContainer.innerHTML = result;

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