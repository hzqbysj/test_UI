var getuserinfo_url = "http://localhost:8002/music/getmusicbyauthor";

var music_list;

$(document).ready(function () {

    var userId = sessionStorage.getItem("userId");
    var userName = sessionStorage.getItem("userName");

    document.getElementById('user-name').innerText = userName;

    $.ajax({
        type: 'POST',
        url: getuserinfo_url,
        async: false,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        data: {
            user_id: userId
        },
        success: function (data) {
            music_list = data.data;

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        }
    });

    // document.getElementById('collection').innerText = music_list.collection;


});