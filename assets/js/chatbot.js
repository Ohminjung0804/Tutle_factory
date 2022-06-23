"use strict";
const Chat = (function () {

    // init 함수
    function init() {
        const chat_ul = document.querySelector(".chat-text");
        const qnas = document.querySelectorAll(".ask");
        const vals = qnas[0].innerText;
        // //console.log('버튼들',qnas,vals);

        // 질문 버튼 클릭 시
        qnas.forEach(btn => {
            btn.addEventListener('click',(e)=>{
                //console.log('scroll',document.querySelector(".chat-text").scrollHeight,document.querySelector(".chat-text").scrollTop);

                // 2. 추가할 li element 생성
                // 2-1. 추가할 li element 생성
                const li = document.createElement("li");
                
                // 2-2. li에 id 속성 추가 
                li.classList.add("content");
                li.classList.add("right");
    
                li.innerHTML = `<div class="chat-li">${qnas[e.target.id].innerText}</div>`
                
                //console.log(li);
                chat_ul.appendChild(li);
                
                let answer_text = "";
                let answer_text2 = "";
                switch(Number(e.target.id)){
                    case 0:{
                        answer_text=`[거북목치료센터 가이드]<br/>
                        1. 먼저 [상단바]에서 로그인을 해주세요. <br/>
                        2. 로그인 후 [메인]의 거북목 테스트를 통해 거북목을 진단해보세요.<br/>
                        3. [메인]에서 세가지의 스트레칭 챕터를 매일 참여할 수 있어요.<br/>
                        4. [마이페이지]에 들어가셔서 거북이정보변경/스트레칭분석결과/거북이경주참여를 이용하실 수 있어요!<br/>
                        5. 총 100일동안 완주가 완료되시면 [거북완주전당]에 이름이 들어가고 계속/중단이 가능해요.<br/>
                        `;
                        answer_text2 = "함께 꾸준히 거북목치료센터에서 거북목을 치료해나가봐요!"
                        break;
                    };
                    case 1:{
                        answer_text="거북목치료센터란 컴퓨터와 전자기기에 쉽게 발견되는 거북목 증후군 완화를 돕고자 기획된 프로젝트 입니다.";
                        break;
                    };
                    case 2:{
                        answer_text="거북목이란 사람의 목이 마치 거북이 목처럼 앞으로 구부러진 모양을 보인다고 해서 붙여진 이름입니다.";
                        break;
                    };
                    case 3:{
                        answer_text=`1. 머리 무게 중심이 앞으로 쏠리며 목과 어깨에 지속적인 통증이 있습니다. <br/>
                        2. 앉아 있거나 서 있을 때에 머리가 거북이처럼 나와 있습니다. <br/>
                        3. 목 뒤가 뻣뻣하며 눈이 쉽게 피로해집니다. <br/>
                        4. 수면을 방해하며 만성피로를 느끼게 됩니다. <br/>
                        5. 손이 저리며 팔꿈치가 아픈 증상이 나타납니다.<br/>`;
                        break;
                    };
                    case 4:{
                        answer_text="대부분은 잦은 스마트폰 사용과 잘못된 독서, 공부 자세, 컴퓨터 사용 등등 만성적으로 잘못된 근육 사용이 축적되면서 경과가 나타나는 때가 많습니다.";
                        break;
                    };
                    case 5:{
                        answer_text="정상적인 목뼈는 7개의 뼈로 구성되어 있으며 옆에서 볼때 'C'형 커브를 이루고 있습니다. ";
                        answer_text2 = "일자목은 목뼈가 일자로 펴져있는 상태를 말하며 거북목은 역 C자형이 된 상태를 말합니다.";
                        break;
                    };
                    
                    default :{
                        answer_text = "찾으시는 답을 클릭해주세요";
                    }
                }
                setTimeout(function(){
    
                    const answer_li = document.createElement("li");
                    answer_li.classList.add("content");
                    answer_li.classList.add("left");
    
                    if(answer_text2.length>1){
                        answer_li.innerHTML = `
                        <div class="chat-li" style="margin-left: 30px;">${answer_text}</div>`
                    }else{
                        answer_li.innerHTML = `
                        <img src="./assets/images/turtlebot.png" alt="로봇" width="25px" style="margin-right: 2px;">
                        <div class="chat-li">${answer_text}</div>`
                    }
                    
                    chat_ul.appendChild(answer_li);
                },1000);

                setTimeout(function(){
                    if(answer_text2.length >1){
                        const answer_li = document.createElement("li");
                        answer_li.classList.add("content");
                        answer_li.classList.add("left");
        
                        answer_li.innerHTML = `
                        <img src="./assets/images/turtlebot.png" alt="로봇" width="25px" style="margin-right: 2px;">
                        <div class="chat-li">${answer_text2}</div>`
                        
                        //console.log(answer_li);
                        chat_ul.appendChild(answer_li);
                    }
                },1000)
                

            },false);
        });

        focusListener();
        input();
    }

    function focusListener(){
        const input = document.getElementById("input-ask");
        const back = document.querySelector(".chat-text");
        back.addEventListener('click',function(){
            document.querySelector(".qna_list").style.display ='none';
        });
        input.addEventListener('focus',function(){
            document.querySelector(".qna_list").style.display ='';
        });
        
        // 스크롤 최하단 고정
        document.querySelector(".chat-text").scrollTop = document.querySelector(".chat-text").scrollHeight; 
        //console.log('scroll',document.querySelector(".chat-text").scrollTop);

    }

    function input(){
        const submit = document.querySelector(".submit");
        document.getElementById("input-ask").addEventListener('keyup',function(){
            if(window.event.keyCode==13){
                putText();
            }
        })
        submit.addEventListener("click", putText());
        
    }

    // function putask(event){
    //     switch(event){
    //         case 1:
    //     }
    // }

    // // 메세지 태그 생성
    // function createMessageTag(LR_className, senderName, message) {
    //     // 형식 가져오기
    //     let chatLi = $('div.chat.format ul li').clone();

    //     // 값 채우기
    //     chatLi.addClass(LR_className);
    //     chatLi.find('.sender span').text(senderName);
    //     chatLi.find('.message span').text(message);

    //     return chatLi;
    // }

    // // 메세지 태그 append
    // function appendMessageTag(LR_className, senderName, message) {
    //     const chatLi = createMessageTag(LR_className, senderName, message);

    //     $('div.chat:not(.format) ul').append(chatLi);

    //     // 스크롤바 아래 고정
    //     $('div.chat').scrollTop($('div.chat').prop('scrollHeight'));
    // }

    // // 메세지 전송
    // function sendMessage(message) {
    //     // 서버에 전송하는 코드로 후에 대체
    //     const data = {
    //         "senderName": "blue",
    //         "message": message
    //     };

    //     // 통신하는 기능이 없으므로 여기서 receive
    //     resive(data);
    // }

    // // 메세지 입력박스 내용 지우기
    // function clearTextarea() {
    //     $('div.input-div textarea').val('');
    // }

    // // 메세지 수신
    // function resive(data) {
    //     const LR = (data.senderName != myName) ? "left" : "right";
    //     appendMessageTag("right", data.senderName, data.message);
    // }

    return {
        'init': init
    };
})();


Chat.init();

// 사용자가 직접 입력한 경우 
// 사용자 답변 출력 + 문의사항 받기
function putText(e){
    const chat_ul = document.querySelector(".chat-text");
    let line = document.getElementById("input-ask");
    //console.log('라인',line);

    if((line.value).length <=0){
        return
    }

    const li = document.createElement("li");
                
    // 2-2. li에 id 속성 추가 
    li.classList.add("content");
    li.classList.add("right");

    li.innerHTML = `<div class="chat-li">${line.value}</div>`
    
    //console.log(li);
    chat_ul.appendChild(li);

    line.value = ''; // 비우기

    // 답변 넣기
    setTimeout(function(){
        let answer_text = "버튼의 질문 외에 문의사항/건의사항이 있으시다면 [w2015@e-mirim.hs.kr]로 부탁드립니다^^";
        //console.log('답변 ',answer_text);
        const answer_li = document.createElement("li");
        answer_li.classList.add("content");
        answer_li.classList.add("left");
    
        answer_li.innerHTML = `
        <img src="./assets/images/turtlebot.png" alt="로봇" width="25px" style="margin-right: 2px;">
        <div class="chat-li">${answer_text}</div>`
        
        chat_ul.appendChild(answer_li);

    },800);


}
    // enter 키 이벤트
    // $(document).on('keydown', 'div.input-div textarea', function (e) {
    //     if (e.keyCode == 13 && !e.shiftKey) {
    //         e.preventDefault();
    //         const message = $(this).val();

    //         // 메시지 전송
    //         sendMessage(message);
    //         // 입력창 clear
    //         clearTextarea();
    //     }
    // });
