var getuserinfo_url = "http://119.23.15.225:8003/getmusicbyauthor?user_id=4";

var music_list;

// $(document).ready(function () {

//     var userId = sessionStorage.getItem("userId");
//     var userName = sessionStorage.getItem("userName");

//     document.getElementById('user-name').innerText = userName;

//     $.ajax({
//         type: 'POST',
//         url: "http://119.23.15.225:8003/getmusicbyauthor",
//         async: false,
//         xhrFields: {
//             withCredentials: true
//         },
//         crossDomain: true,
//         dataType: "json",
//         contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
//         data: {
//             user_id: userId
//         },
//         success: function (res) {
//             console.log(res.data ,'测试');
//             // music_list = data.data;

//         },
//         error: function (XMLHttpRequest, textStatus, errorThrown) {
//             console.log(XMLHttpRequest.status);
//             console.log(XMLHttpRequest.readyState);
//             console.log(textStatus);
//         }
//     });

//     // document.getElementById('collection').innerText = music_list.collection;


// });







var userId = sessionStorage.getItem("userId");
var userName = sessionStorage.getItem("userName");

//个人信息
!function($){
    $.ajax({
        url:getuserinfo_url,
        data:{
            // sid:location.search.substring(1).split('=')[1],
            // user_id: userId
        },
        dataType:'json'
    }).done(function(res){
        var $strhtml='';
       
        $.each(res.data,function(index,value){
            
            console.log(value,'测试','1');
     $strhtml+=`<div class="music-player jp-video-270p" style="margin-top:0px" id="music-player0-0">
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
     <div id="jquery_jplayer0-0" class="jp-jplayer" style="width: 480px; height: 270px;"><img id="jp_poster_1" src="http://33.media.tumblr.com/0b35eb42176eedbf4a96e52efa760875/tumblr_mxp7a0v3fr1rqx86wo1_500.png" style="width: 480px; height: 270px; display: block;"><audio id="jp_audio_1" preload="metadata" src="http://127.0.0.1:8080/test_UI/music/Pink%20Floyd%20-%20Cluster%20One.mp3"></audio><video id="jp_video_1" preload="metadata" style="width: 0px; height: 0px;"></video></div>
 </div>


 <div class="post-detail" style="padding-bottom:50px;">
                                <div class="user-info">
                                    <h5><a id="authorName0-0" href="timeline.html" class="profile-link">zhenqinghe</a>
                                </h5></div>
                                <div class="reaction">
                                    <i class="fa fa-thumbs-up"></i><a id="collection0-0" class="btn text-green" onclick="addlike(0)">${value.collection}</a>
                                    <i class="fa fa-thumbs-down"></i><a id="dislike0-0" class="btn text-red" onclick="dislikes(0)">${value.dislike}</a>
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
    })
}(jQuery);










