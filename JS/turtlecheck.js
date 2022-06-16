// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose

// the link to your model provided by Teachable Machine export panel
const URL = "./my_model/";
// import { edit_ease_turtle } from "../JS/turtles.js";
let model, webcam, ctx, labelContainer, maxPredictions;

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
    // labelContainer.appendChild(document.createElement("div"));
}

// document.getElementById('startbtn').addEventListener('click', init);

async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
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

    var result = Number(prediction[0].probability.toFixed(2));

    setTimeout(function () {
        if(result == 1.00){
            labelContainer.innerHTML = "100%";
            Object.freeze(labelContainer);
            return;
        } else if(result >= 9.00){
            labelContainer.innerHTML = "90%";
            Object.freeze(labelContainer);
            return;
        } else if(result >= 8.00){
            labelContainer.innerHTML = "80%";
            Object.freeze(labelContainer);
            return;
        } else if(result >= 7.00){
            labelContainer.innerHTML = "70%";
            Object.freeze(labelContainer);
            return;
        } else if(result >= 6.00){
            labelContainer.innerHTML = "60%";
            Object.freeze(labelContainer);
            return;
        } else if(result >= 5.00){
            labelContainer.innerHTML = "50%";
            Object.freeze(labelContainer);
            return;
        } else if(result >= 4.00){
            labelContainer.innerHTML = "40%";
            Object.freeze(labelContainer);
            return;
        } else if(result >= 3.00){
            labelContainer.innerHTML = "30%";
            Object.freeze(labelContainer);
            return;
        } else if(result >= 2.00){
            labelContainer.innerHTML = "20%";
            Object.freeze(labelContainer);
            return;
        } else if(result >= 1.00){
            labelContainer.innerHTML = "10%";
            Object.freeze(labelContainer);
            return;
        } else{
            labelContainer.innerHTML = "조금 떨어져서 우측을 바라보고 올바르게 서주세요.";
            Object.freeze(labelContainer);
            return;
        }
    }, 5000);

    // setTimeout(function () {
    //     switch (result) {
    //         case 1.00:
    //             labelContainer.innerHTML = "100%";
    //             break;
    //         case result >= 0.90:
    //             labelContainer.innerHTML = "90%";
    //             break;
    //         case result >= 0.80:
    //             labelContainer.innerHTML = "80%";
    //             break;
    //         case result >= 0.70:
    //             labelContainer.innerHTML = "70%";
    //             break;
    //         case result >= 0.60:
    //             labelContainer.innerHTML = "60%";
    //             break;
    //         case result >= 0.50:
    //             labelContainer.innerHTML = "50%";
    //             break;
    //         case result >= 0.40:
    //             labelContainer.innerHTML = "40%";
    //             break;
    //         case result >= 0.30:
    //             labelContainer.innerHTML = "30%";
    //             break;
    //         case result >= 0.20:
    //             labelContainer.innerHTML = "20%";
    //             break;
    //         case result >= 0.10:
    //             labelContainer.innerHTML = "10%";
    //             break;
    //         default:
    //             labelContainer.innerHTML = "0%";
    //             // console.log(prediction[0].probability.toFixed(2));
    //     }
    // }, 5000);

    // // 거북목 여부 문구
    // if (prediction[0].probability.toFixed(0) == 1) {
    //     result = "당신은 거북목입니다.";
    //     // pause(result);
    // } else if (prediction[1].probability.toFixed(0) == 1) {
    //     result = "당신은 정상입니다.";
    //     // pause(result);
    // }

    // Object.freeze(result);
    // labelContainer.innerHTML = result;

    // finally draw the poses
    drawPose(pose);
}

// function pause(result) {

//     // labelContainer.innerHTML = result;
//     // const fresult = Object.freeze(labelContainer);

//     // console.log(fresult);

//     if (result == '당신은 거북목입니다.') {
//         Object.freeze(result);
//     } else if (result == '당신은 정상입니다.') {
//         Object.freeze(result);
//     }

//     labelContainer.innerHTML = result;
// }

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