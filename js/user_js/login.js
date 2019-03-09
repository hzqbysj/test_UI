// var loginurl="http://localhost:8002/user/login"
var loginurl="api/user/login"


$("#login-button").click(function () {

    if($("#my-email").val()==""){
        $("#my-email").focus();
        alert("请输入正确的帐号！");
    }
    else if($("#my-password").val()==""){
        $("#my-password").focus();
        alert("你还没有输入密码！");
    } else {
        var myEmail = $("#my-email").val();
        var myPassword = $("#my-password").val();
        $.ajax({
            type: 'POST',
            url: loginurl,
            data: {
                user_email:myEmail,
                user_password:myPassword
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            dataType: "json",
            contentType:'application/x-www-form-urlencoded;charset=UTF-8',
            success: function(data){
                if(data.message == "登录成功"){
                    sessionStorage.setItem("userId", data.data.userId);
                    sessionStorage.setItem("userName", data.data.userName);
                    window.location = "newsfeed-videos.html" ;
                }
                else{
                    alert(data.message);
                };
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
    }

});