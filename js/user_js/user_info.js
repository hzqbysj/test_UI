var getuserinfo_url = "http://119.23.15.225:8003/getmusicbyauthor";
var up_load = "api/music/savemusic";
var up_file = "http://119.23.15.225:8003/upfile";
var deletemusic_url = "api/music/deletemusic"
/*var up_load = "http://localhost:8002/music/savemusic";
var up_file = "http://localhost:8003/upfile";*/
// var getuserinfo_url = "http://localhost:8003/getmusicbyauthor";
// var deletemusic_url = "http://localhost:8002/music/deletemusic"









var userId = sessionStorage.getItem("userId");
var userName = sessionStorage.getItem("userName");

//个人信息
!function($){
    document.getElementById("userName").innerText = userName;
    $.ajax({
        url:getuserinfo_url,
        data:{
            // sid:location.search.substring(1).split('=')[1],
            user_id: userId
        },
        dataType:'json'
    }).done(function(res){
        var $strhtml='';
       
        $.each(res.data,function(index,value){

     $strhtml+=`<div class="music-player jp-video-270p" style="margin-top:0px" id="music-player${index}">
     <div class="info">
         <div class="left">
         </div>
         <div class="center">
             <div class="jp-playlist">
                 <ul style="display: block;"><li class="jp-playlist-current"><div><a href="javascript:;" class="jp-playlist-item-remove" style="display: none;">×</a><a href="javascript:;" class="jp-playlist-item jp-playlist-current" tabindex="1"><span class="jp-artist"></span></a></div></li></ul>
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
     <div id="jquery_jplayer${index}" class="jp-jplayer" style="width: 480px; height: 270px;"><img id="jp_poster_1" src="http://33.media.tumblr.com/0b35eb42176eedbf4a96e52efa760875/tumblr_mxp7a0v3fr1rqx86wo1_500.png" style="width: 480px; height: 270px; display: block;"><audio id="jp_audio_1" preload="metadata" src="http://127.0.0.1:8080/test_UI/music/Pink%20Floyd%20-%20Cluster%20One.mp3"></audio><video id="jp_video_1" preload="metadata" style="width: 0px; height: 0px;"></video></div>
 </div>


 <div class="post-detail" style="padding-bottom:50px;">
                                <div class="user-info">
                                    <h5><a id="authorName${index}" href="timeline.html" class="profile-link"></a>
                                </h5></div>
                                <div class="reaction">
                                    <i class="fa fa-thumbs-up"></i><a id="collection${index}" class="btn text-green" onclick="addlike(0)"></a>
                                    <i class="fa fa-thumbs-down"></i><a id="dislike${index}" class="btn text-red" onclick="dislikes(0)"></a>
                                    <i><img src="images/delete.png" width="20px" height="20px" onclick="deletemusic(${value.songId})"></i>
                                </div>
                                <div class="line-divider"></div>
                                <div class="post-text">
                                    <p id="song-info${index}"></p>
                                </div>
                                <div class="line-divider"></div>
                            </div>
 `
  
    $('#personal_music').html($strhtml);


        });
        loadMusic(res);
    })
}(jQuery);

function loadMusic(res) {
    $.each(res.data,function(index,value){

        var colletion = value.collection;
        var dislike = value.dislike;
        var authorName = value.authorName;
        var authorId = value.authorId;
        var songInfo = value.songInfo;

        document.getElementById("collection" + index).innerText = colletion;
        document.getElementById("dislike" + index).innerText = dislike;
        document.getElementById("authorName" + index).innerText = authorName;

        document.getElementById("song-info" + index).innerText = songInfo;

        var playlist = [{
            title: value.songName,
            artist: value.authorName,
            mp3: value.songUrl,
            //oga:"http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
            poster: "http://33.media.tumblr.com/0b35eb42176eedbf4a96e52efa760875/tumblr_mxp7a0v3fr1rqx86wo1_500.png"
        }];

        var cssSelector = {
            jPlayer: "#jquery_jplayer" + index,
            cssSelectorAncestor: "#music-player" + index
        };

        var options = {
            swfPath: "http://cdnjs.cloudflare.com/ajax/libs/jplayer/2.6.4/jquery.jplayer/Jplayer.swf",
            supplied: "ogv, m4v, oga, mp3"
        };


        var myPlaylist = new jPlayerPlaylist(cssSelector, playlist, options);
    });
};


document.getElementById('song_sub').onclick = function () {
    var patt1 = /[^/]+(?!.*)/;
    var songName = document.getElementById("songName").value;
    var songUrl = document.getElementById("song_url").value;
    var songInfo = document.getElementById("songInfo").value;
    var x = songUrl.substr(songUrl.lastIndexOf('\\') + 1);


    if (songName == ""){
        alert("请输入歌曲名字");
    } else if (songInfo == ""){
        alert("请输入歌曲信息")
    } else if (songUrl == "") {
        alert("请上传音频文件")
    } else {
        var formData = new FormData();
        var temp = document.getElementById("song_url").files[0];
        var filesize = temp.size;
        formData.append('file', temp);
        if (!/\.(mp3|MP3)$/.test(songUrl)) {
            alert("音乐文件类型必须是.mp3格式");
        } else if (filesize>(30*1024*1024)){
            alert("音乐文件必须小于30MB");
        } else {
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

            $.ajax({
                type: 'POST',
                url: up_file,
                data: formData,
                processData: false, // 告诉jQuery不要去处理发送的数据
                contentType: false, // 告诉jQuery不要去设置Content-Type请求头
                success: function (data) {
                    if (data.message == "上传成功") {
                        alert('上传成功');
                        $('#add-music').modal('hide');
                        // sessionStorage.setItem("userId", data.data.userId);
                        // sessionStorage.setItem("userName", data.data.userName);
                        // window.location = "newsfeed-music.html" ;
                    }
                    else {
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
        }
    }
};

function deletemusic(songId) {

    var msg = "您真的确定要删除吗？\n\n请确认！";
    if (confirm(msg)==true){
        $.ajax({
            type: 'POST',
            url: deletemusic_url,
            async: false,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            dataType: "json",
            contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
            data: {
                song_id: songId
            },
            success: function (data) {
                alert("删除成功")
                window.location.reload(true);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
                alert(data.message)
            }
        });
    }else{
        return false;
    }
}










