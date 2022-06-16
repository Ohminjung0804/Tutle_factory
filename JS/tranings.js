
// 스트레칭 생성
let create_cure = function (stretchingNum, cnt) {
    var data1 = null
    $(document).ready(function () {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "stretch": stretchingNum,
                "status": cnt,
                "user_email": localStorage.getItem('key')
            }),
            url: 'http://107.21.77.37/cure/',
            dataType: "json",
            accept: "application/json",
            //전달할 때 사용되는 파라미터 변수명
            // 이 속성을 생략하면 callback 파라미터 변수명으로 전달된다.
            success: function (data, textStatus, jqXHR) {
                console.log('success');
                console.log(data);
                var data1 = {
                    id: data[0].id,
                    craeted: data[0].created,
                    stretch: data[0].stretch,
                    status: data[0].status,
                    user_email: data[0].user_email,
                }
                // console.log(JSON.parse(data[0]));
                console.log(data1)
                // console.log(JSON.parse(data[0]));
                console.log(data1)
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


export {create_cure};