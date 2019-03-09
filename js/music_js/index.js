// var getmusicurl = "http://localhost:8002/music/getallmusic";
// var like = "http://localhost:8002/music/collection";
// var unlike = "http://localhost:8002/music/dislike";
// var up_load = "http://localhost:8002/music/savemusic";
// var up_file = "http://localhost:8003/upfile";
// var getcomment_url = "http://localhost:8002/musiccomment/getcommentbymusic"
// var savecomment_url = "http://localhost:8002/musiccomment/savecomment"

var getmusicurl = "http://119.23.15.225/api/music/getallmusic";
var like = "http://119.23.15.225/api/music/collection";
var unlike = "http://119.23.15.225/api/music/dislike";
var up_load = "http://119.23.15.225/api/music/savemusic";
var up_file = "http://119.23.15.225/api/upfile";
var getcomment_url = "http://119.23.15.225/api/musiccomment/getcommentbymusic"
var savecomment_url = "http://119.23.15.225/api/musiccomment/savecomment"

var music_list;
var comment_list;
var tag = 0;

$(document).ready(function () {

    var userName = sessionStorage.getItem("userName");

    document.getElementById('user-name').innerText = userName;

    $.ajax({
        type: 'POST',
        url: getmusicurl,
        async: false,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
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

function addlike(tag) {

    $.ajax({
        type: 'POST',
        url: like,
        xhrFields: {
            withCredentials: true
        },
        data: {
            song_id: music_list[tag].songId
        },
        crossDomain: true,
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        success: function (data) {
            // music_list = data.data[0];
            // console.log(music_list);
            document.getElementById("collection" + tag).innerText = data.data.collection;
            document.getElementById("collection" + tag + "-" + tag).innerText = data.data.collection;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        }
    });
};

function dislikes(tag) {

    $.ajax({
        type: 'POST',
        url: unlike,
        xhrFields: {
            withCredentials: true
        },
        data: {
            song_id: music_list[tag].songId
        },
        crossDomain: true,
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        success: function (data) {
            // music_list = data.data[0];
            // console.log(music_list);
            document.getElementById("dislike" + tag).innerText = data.data.dislike;
            document.getElementById("dislike" + tag + "-" + tag).innerText = data.data.dislike;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        }
    });
};

layui.use('flow', function () {
    var flow = layui.flow;
    //alert(music_list.length);
    flow.load({
        elem: '#main-music' //流加载容器
        , done: function (page, next) { //执行下一页的回调

            //模拟数据插入
            setTimeout(function () {
                var lis = [];
                for (var i = 0; i < 2; i++) {
                    lis.push(musicplay(tag + i));
                }

                //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
                next(lis.join(''), page < (music_list.length / 2)); //假设总页数为 10
                loadMusic(tag);
                tag = tag + 2;
            }, 500);
        }
    });
});

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
                // sessionStorage.setItem("userId", data.data.userId);
                // sessionStorage.setItem("userName", data.data.userName);
                // window.location = "newsfeed-music.html" ;
            }
            else {
                alert('11111');
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

function commentinput(e,obj, tag) {
    if(e.keyCode == 13){

        var musicComment = {
            userId:sessionStorage.getItem("userId"),
            userName:sessionStorage.getItem("userName"),
            toUserId:1,
            musicId:music_list[tag].songId,
            comments:document.getElementById("comment-input"+tag).value
        }
        $.ajax({
            type: 'POST',
            url: savecomment_url,
            xhrFields: {
                withCredentials: true
            },
            async: false,
            data: JSON.stringify(musicComment),
            crossDomain: true,
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                var father = document.getElementById("comments"+tag);

                while(father.hasChildNodes()){
                    father.removeChild(father.firstChild);
                };

                comment_list = data.data;

                for (var i = 0; i < comment_list.length; i++) {
                    document.getElementById("comments"+tag).insertAdjacentHTML("beforeEnd", musiccomment(tag,i));
                };

                for (var i = 0; i < comment_list.length; i++) {
                    var comments = comment_list[i].comments;
                    var user = comment_list[i].userName;

                    document.getElementById("comment"+tag+"-"+i).innerText = comments;
                    document.getElementById("user"+tag+"-"+i).innerText = user;
                };
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });

    }

}

function getcomments(tag) {
    if (document.getElementById("comments"+tag).getElementsByTagName("div").length == 0) {
        $.ajax({
            type: 'POST',
            url: getcomment_url,
            xhrFields: {
                withCredentials: true
            },
            async: false,
            data: {
                song_id: music_list[tag].songId
            },
            crossDomain: true,
            dataType: "json",
            contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
            success: function (data) {
                comment_list = data.data;

                for (var i = 0; i < comment_list.length; i++) {
                    document.getElementById("comments"+tag).insertAdjacentHTML("beforeEnd", musiccomment(tag,i));

                };

                for (var i = 0; i < comment_list.length; i++) {
                    var comments = comment_list[i].comments;
                    var user = comment_list[i].userName;

                    document.getElementById("comment"+tag+"-"+i).innerText = comments;
                    document.getElementById("user"+tag+"-"+i).innerText = user;
                };
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
    }

};

function loadMusic(tag) {
    for (var i = 0; i < 2; i++) {

        var colletion = music_list[tag + i].collection;
        var dislike = music_list[tag + i].dislike;
        var authorName = music_list[tag + i].authorName;
        var authorId = music_list[tag + i].authorId;
        var songInfo = music_list[tag + i].songInfo;

        document.getElementById("collection" + (tag + i)).innerText = colletion;
        document.getElementById("dislike" + (tag + i)).innerText = dislike;
        document.getElementById("authorName" + (tag + i)).innerText = authorName;

        document.getElementById("collection" + (tag + i) + "-" + (tag + i)).innerText = colletion;
        document.getElementById("dislike" + (tag + i) + "-" + (tag + i)).innerText = dislike;
        document.getElementById("authorName" + (tag + i) + "-" + (tag + i)).innerText = authorName;
        document.getElementById("song-info" + (tag + i)).innerText = songInfo;

        var playlist = [{
            title: music_list[tag + i].songName,
            artist: music_list[tag + i].authorName,
            mp3: music_list[tag + i].songUrl,
            //oga:"http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
            poster: "http://33.media.tumblr.com/0b35eb42176eedbf4a96e52efa760875/tumblr_mxp7a0v3fr1rqx86wo1_500.png"
        }];

        var cssSelector = {
            jPlayer: "#jquery_jplayer" + (tag + i),
            cssSelectorAncestor: "#music-player" + (tag + i)
        };

        var cssSelectorson = {
            jPlayer: "#jquery_jplayer" + (tag + i) + "-" + (tag + i),
            cssSelectorAncestor: "#music-player" + (tag + i) + "-" + (tag + i)
        };

        var options = {
            swfPath: "http://cdnjs.cloudflare.com/ajax/libs/jplayer/2.6.4/jquery.jplayer/Jplayer.swf",
            supplied: "ogv, m4v, oga, mp3"
        };

        var myPlaylist = new jPlayerPlaylist(cssSelector, playlist, options);
        var myPlaylistson = new jPlayerPlaylist(cssSelectorson, playlist, options);
    }
};

function musiccomment(tag,i) {
    var html = '<div class="post-comment row">\n' +
        '         <img  src="http://placehold.it/300x300" alt="" class="profile-photo-sm post_comment_img  col-md-2"/>\n' +
        '           <a id="user'+tag+"-"+i+'" class="profile-link post_comment_a col-md-2">John</a>\n' +
        '<br/>\n' +
        '<p id="comment'+tag+"-"+i+'" " class="post_comment_p col-md-9"> test</p>\n' +
        '       </div>'

    return html;
};

function musicplay(tag) {
    var html = '<div class="grid-item col-md-6 col-sm-6">\n' +
        '    <div class="media-grid">\n' +
        '        <div class="music-player" id="music-player' + tag + '">\n' +
        '            <div class="info">\n' +
        '                <div class="left">\n' +
        '                </div>\n' +
        '                <div class="center">\n' +
        '                    <div class="jp-playlist">\n' +
        '                        <ul>\n' +
        '                            <li></li>\n' +
        '                        </ul>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="right">\n' +
        '                </div>\n' +
        '                <div class="progress jp-seek-bar">\n' +
        '                    <span class="jp-play-bar" style="width: 0%"></span>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="controls">\n' +
        '                <div class="current jp-current-time">00:00</div>\n' +
        '                <div class="play-controls">\n' +
        '                    <a href="javascript:;" class="icon-play jp-play" title="play"></a>\n' +
        '                    <a href="javascript:;" class="icon-pause jp-pause" title="pause"></a>\n' +
        '                </div>\n' +
        '                <div class="volume-level jp-volume-bar">\n' +
        '                    <span class="jp-volume-bar-value" style="width: 0%"></span>\n' +
        '                    <a href="javascript:;" class="icon-volume-up jp-volume-max"\n' +
        '                       title="max volume"></a>\n' +
        '                    <a href="javascript:;" class="icon-volume-down jp-mute" title="mute"></a>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div id="jquery_jplayer' + tag + '" class="jp-jplayer"></div>\n' +
        '        </div>\n' +
        '        <div class="media-info">\n' +
        '            <div class="reaction">\n' +
        '                <i class="fa fa-thumbs-up"></i><a id="collection' + tag + '" class="btn text-green" onclick="addlike(' + tag + ')"> 46</a>\n' +
        '                <i class="fa fa-thumbs-down" ></i><a id="dislike' + tag + '" class="btn text-red" onclick="dislikes(' + tag + ')"> 11</a>\n' +
        '                <img src="images/gengduo.png" id="more' + tag + '" onclick="getcomments(' + tag + ')" width="20px" height="20px" data-toggle="modal" data-target="#modal' + tag + '">\n' +
        '            </div>\n' +
        '            <div class="user-info">\n' +
        '                <img src="http://placehold.it/300x300" alt="" class="profile-photo-sm pull-left"/>\n' +
        '                <div class="user">\n' +
        '                    <h6><a id="authorName' + tag + '" href="#" class="profile-link">Julia Cox</a></h6>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="modal fade modal-1" tabindex="-1" role="dialog" aria-hidden="true" id="modal' + tag + '">\n' +
        '            <div class="modal-dialog modal-lg">\n' +
        '                <div class="modal-content">\n' +
        '                    <div class="post-content">\n' +
        '                        <div class="music-player" style="margin-top:0px" id="music-player' + tag + "-" + tag + '">\n' +
        '                            <div class="info">\n' +
        '                                <div class="left">\n' +
        '                                </div>\n' +
        '                                <div class="center">\n' +
        '                                    <div class="jp-playlist">\n' +
        '                                        <ul>\n' +
        '                                            <li></li>\n' +
        '                                        </ul>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                                <div class="right">\n' +
        '                                </div>\n' +
        '                                <div class="progress jp-seek-bar">\n' +
        '                                    <span class="jp-play-bar" style="width: 0%"></span>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="controls">\n' +
        '                                <div class="current jp-current-time">00:00</div>\n' +
        '                                <div class="play-controls">\n' +
        '                                    <a href="javascript:;" class="icon-play jp-play" title="play"></a>\n' +
        '                                    <a href="javascript:;" class="icon-pause jp-pause" title="pause"></a>\n' +
        '                                </div>\n' +
        '                                <div class="volume-level jp-volume-bar">\n' +
        '                                    <span class="jp-volume-bar-value" style="width: 0%"></span>\n' +
        '                                    <a href="javascript:;" class="icon-volume-up jp-volume-max" title="max volume"></a>\n' +
        '                                    <a href="javascript:;" class="icon-volume-down jp-mute" title="mute"></a>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div id="jquery_jplayer' + tag + "-" + tag + '" class="jp-jplayer"></div>\n' +
        '                        </div>\n' +
        '                        <div class="post-container">\n' +
        '                            <img src="http://placehold.it/300x300" alt="user" class="profile-photo-md pull-left"/>\n' +
        '                            <div class="post-detail">\n' +
        '                                <div class="user-info">\n' +
        '                                    <h5><a id="authorName' + tag + "-" + tag + '" href="timeline.html" class="profile-link">Alexis Clark</a>\n' +
        '                                </div>\n' +
        '                                <div class="reaction">\n' +
        '                                    <i class="fa fa-thumbs-up"></i><a id="collection' + tag + "-" + tag + '" class="btn text-green" onclick="addlike(' + tag + ')"> 13</a>\n' +
        '                                    <i class="fa fa-thumbs-down"></i><a id="dislike' + tag + "-" + tag + '" class="btn text-red" onclick="dislikes(' + tag + ')"> 0</a>\n' +
        '                                </div>\n' +
        '                                <div class="line-divider"></div>\n' +
        '                                <div class="post-text" >\n' +
        '                                    <p id="song-info' + tag + '">test</p>\n' +
        '                                </div>\n' +
        '                                <div class="line-divider"></div>\n' +
        '                                <ul class="flow-default" id="comments'+tag+'"></ul>\n' +
        '                                <div class="post-comment">\n' +
        '                                    <img src="http://placehold.it/300x300" alt=""\n' +
        '                                         class="profile-photo-sm"/>\n' +
        '                                    <input id="comment-input'+tag+'" type="text" class="form-control" placeholder="Post a comment" onkeydown="commentinput(event, this, '+tag+')">\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>'

    return html;
};