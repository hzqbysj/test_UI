var getuserinfo_url = "http://119.23.15.225:8003/getmusicbyauthor";
var up_load = "http://119.23.15.225/api/music/savemusic";
var up_file = "http://119.23.15.225/api/upfile";

var userId = sessionStorage.getItem("userId");
var userName = sessionStorage.getItem("userName");

//个人信息
!function ($) {
    document.getElementById('user-name').innerText = userName;
    $.ajax({
        url: getuserinfo_url,
        data: {
            user_id:userId
        },
        dataType: 'json'
    }).done(function (res) {
        var $strhtml = '';

        $.each(res.data, function (index, value) {

            $strhtml += `<div class="music-player jp-video-270p" style="margin-top:0px" id="music-player` + index + `">
     <div class="info">
         <div class="left">
         </div>
         <div class="center">
             <div class="jp-playlist">
                 <ul style="display: block;"><li class="jp-playlist-current"><div><a href="javascript:;" class="jp-playlist-item-remove" style="display: none;">×</a><a href="javascript:;" class="jp-playlist-item jp-playlist-current" tabindex="1">${value.songName} <span class="jp-artist">by ${value.authorName}</span></a></div></li></ul>
             </div>
         </div>
         <div class="right">
         </div>
         <div class="progress jp-seek-bar" style="width: 100%;">
             <span class="jp-play-bar" style="width: 0%"></span>
         </div>
     </div>
     <div class="controls">
         <div class="current jp-current-time">00:00</div>
         <div class="play-controls">
             <a href="javascript:;" class="icon-play jp-play" title="play"></a>
             <a href="javascript:;" class="icon-pause jp-pause" title="pause" style="display: none;"></a>
         </div>
         <div class="volume-level jp-volume-bar">
             <span class="jp-volume-bar-value" style="width: 80%;"></span>
             <a href="javascript:;" class="icon-volume-up jp-volume-max" title="max volume"></a>
             <a href="javascript:;" class="icon-volume-down jp-mute" title="mute"></a>
         </div>
     </div>
     <div id="jquery_jplayer`+ index +`" class="jp-jplayer" style="width: 480px; height: 270px;"><img id="jp_poster_1" src="http://33.media.tumblr.com/0b35eb42176eedbf4a96e52efa760875/tumblr_mxp7a0v3fr1rqx86wo1_500.png" style="width: 480px; height: 270px; display: block;"><audio id="jp_audio_1" preload="metadata" src="http://127.0.0.1:8080/test_UI/music/Pink%20Floyd%20-%20Cluster%20One.mp3"></audio><video id="jp_video_1" preload="metadata" style="width: 0px; height: 0px;"></video></div>
 </div>


 <div class="post-detail" style="padding-bottom:50px;">
                                <div class="user-info">
                                    <h5><a id="authorName0-0" href="timeline.html" class="profile-link">zhenqinghe</a>
                                </h5></div>
                                <div class="reaction">
                                    <i class="fa fa-thumbs-up"></i><a id="collection0-0" class="btn text-green">${value.collection}</a>
                                    <i class="fa fa-thumbs-down"></i><a id="dislike0-0" class="btn text-red">${value.dislike}</a>
                                </div>
                                <div class="line-divider"></div>
                                <div class="post-text">
                                    <p id="song-info0">${value.songInfo}</p>
                                </div>
                                <div class="line-divider"></div>
                            </div>
 `
            $('#personal_music').html($strhtml);



        })
        loadMusic(res.data);
    })
}(jQuery);

function loadMusic(ojb) {

    for (var i=0;i<ojb.length;i++) {
        var playlist = [{
            title: ojb[i].songName,
            artist: ojb[i].authorName,
            mp3: ojb[i].songUrl,
            //oga:"http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
            poster: "http://33.media.tumblr.com/0b35eb42176eedbf4a96e52efa760875/tumblr_mxp7a0v3fr1rqx86wo1_500.png"
        }];

        var cssSelector = {
            jPlayer: "#jquery_jplayer" + i,
            cssSelectorAncestor: "#music-player" + i
        };

        var options = {
            swfPath: "http://cdnjs.cloudflare.com/ajax/libs/jplayer/2.6.4/jquery.jplayer/Jplayer.swf",
            supplied: "ogv, m4v, oga, mp3"
        };

        var myPlaylist = new jPlayerPlaylist(cssSelector, playlist, options);
    }


};

document.getElementById('song_sub').onclick = function () {
    var patt1 = /[^/]+(?!.*)/;
    var songName = document.getElementById("songName").innerText;
    var songUrl = document.getElementById("song_url").value;
    var songInfo = document.getElementById("songInfo").value;
    var x = songUrl.substr(songUrl.lastIndexOf('\\') + 1);

    music = {
        songName: songName,
        songInfo: songInfo,
        authorId: sessionStorage.getItem('userId'),
        authorName: sessionStorage.getItem('userName'),
        collection: 0,
        dislike: 0,
        songUrl: "music/" + x
    }
    console.log(music);
    $.ajax({
        type: 'POST',
        url: up_load,
        data: JSON.stringify(music),
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        }
    });

    var formData = new FormData();
    var temp = document.getElementById("song_url").files[0];
    console.log(temp);
    formData.append('file', temp);

    $.ajax({
        type: 'POST',
        url: up_file,
        data: formData,
        processData: false, // 告诉jQuery不要去处理发送的数据
        contentType: false, // 告诉jQuery不要去设置Content-Type请求头
        success: function (data) {
            if (data.message == "保存音乐成功") {
                alert('上传成功');
            }
            else {
                alert('上传失败');
                alert(data.message);
            }
            ;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        }
    });
};









