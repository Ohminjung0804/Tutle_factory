// 수정하기
let get_turtle = function (email) {
    var data1 = null
    console.log(email)
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: 'http://107.21.77.37/turtle/user?user_email='+email,
            
            //전달할 때 사용되는 파라미터 변수명
            // 이 속성을 생략하면 callback 파라미터 변수명으로 전달된다.
            success: function (data, textStatus, jqXHR) {
                console.log('success');
                console.log(data);
                var data1 = {
                    email: data[0].email,
                    name: data[0].name,
                    number: data[0].num,
                    ease: data[0].ease,
                    best: data[0].best,
                    created: data[0].created,
                }
                console.log(data1)
                // console.log(JSON.parse(data[0]));
                return data1;
                $('.result').html('dfdjflks' + data1.email);
            },
            complete: function (d) {
                console.log('d')
            },
            error: function (xhr, textStatus, error) {
                console.log(xhr.responseText);
                console.log(textStatus);
                console.log(error);
            }
        });
    });
}

// 거북이 정보 수정
let edit_turtle = function (email,name,num) {
    let user = get_turtle(email)
    console.log(email)
    $(document).ready(function () {
        $.ajax({
            type: "PUT",
            url: 'http://107.21.77.37/turtle/user?user_email=w2015@e-mirim.hs.kr',
            dataType:"json",
            accept: "application/json",
            data: JSON.stringify({
                "email":email, 
                "name":name,
                "num":num,
                "best": user.best,
                "ease": user.ease
            }),
            //전달할 때 사용되는 파라미터 변수명
            // 이 속성을 생략하면 callback 파라미터 변수명으로 전달된다.
            success: function (data, textStatus, jqXHR) {
                console.log('success');
                console.log(data)
                return data;
                // console.log(JSON.parse(data[0]));
            },
            complete: function (d) {
                console.log('d')
            },
            error: function (xhr, textStatus, error) {
                console.log(xhr.responseText);
                console.log(textStatus);
                console.log(error);
            }
        });
    });
}


// 거북이 테스트 정보 수정
let edit_ease_turtle = function (email,ease) {
    let user = get_turtle(email)
    console.log(email)
    $(document).ready(function () {
        $.ajax({
            type: "PUT",
            url: 'http://107.21.77.37/turtle/user?user_email=w2015@e-mirim.hs.kr',
            dataType:"json",
            accept: "application/json",
            data: JSON.stringify({
                "email":email, 
                "name":user.name,
                "num":user.num,
                "best": user.best,
                "ease": ease
            }),
            //전달할 때 사용되는 파라미터 변수명
            // 이 속성을 생략하면 callback 파라미터 변수명으로 전달된다.
            success: function (data, textStatus, jqXHR) {
                console.log('success');
                console.log(data)
                return data;
                // console.log(JSON.parse(data[0]));
            },
            complete: function (d) {
                console.log('d')
            },
            error: function (xhr, textStatus, error) {
                console.log(xhr.responseText);
                console.log(textStatus);
                console.log(error);
            }
        });
    });
}

export {get_turtle, edit_turtle, edit_ease_turtle}