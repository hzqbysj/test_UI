// var getarticle = "http://localhost:8002/article/getallarticle"
// var up_article = "http://localhost:8002/article/savearticle"
// var deleteairticle_url = "http://localhost:8002/article/deletearticle"
// var changearticle_url = "http://localhost:8002/article/updatearticle"
// var search_url = "http://localhost:8002/article/searcharticle"

var getarticle="http://119.23.15.225/api/article/getallarticle"
var up_article = "api/article/savearticle"
var deleteairticle_url = "api/article/deletearticle"
var changearticle_url = "api/article/updatearticle"
var search_url = "api/article/searcharticle"

var user_id = sessionStorage.getItem("userId");
var article_list;
var change_article_id;

document.getElementById('article_sub').onclick = function () {
    var type = document.getElementById("type").value;
    var title = document.getElementById("title").value;
    var content = document.getElementById("content").value;

    if (title == "") {
        alert("请输入文章名字");
    } else if (content == "") {
        alert("请输入文章内容");
    } else if (type == "") {
        alert("请选择文章类型");
    } else {
        article = {
            title: title,
            content: content,
            userId: sessionStorage.getItem('userId'),
            userName: sessionStorage.getItem('userName'),
            readNum: 0,
            replyNum: 0,
            type: type
        }
        $.ajax({
            type: 'POST',
            url: up_article,
            data: JSON.stringify(article),
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                alert(data.message);
                $('#add-article').modal('hide');
                window.location.reload(true);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });

    }
};

!function ($) {
    $.ajax({
        url: getarticle,
        data: {},
        dataType: 'json'
    }).done(function (res) {
        article_list = res.data;
        var $metal = '';
        var $rock = '';
        var $popular = '';
        var $classical = '';
        var $own = '';
        $.each(res.data, function (index, value) {
            if (value.type == "摇滚") {
                $rock += `<div class="forum_list row">
            <div class="left_box col-md-1">
                <img src="images/img.jpg">
            </div>
            <div class="right_box col-md-8">
                <a class="forum_detail" href="forum_detail.html?articleId=${value.articleId}">
                <p class="right_name">${value.userName}<span>${value.createTime.substring(0, 10)}</span></p>
                <p class="right_text">${value.content} </p>
                <p class="">
                    <span class="right_read">阅读数量<i>${value.readNum}</i></span>
                    <span class="right_comment">评论数量<i>${value.replyNum}</i></span>
                </p>
                </a>
            </div>
        </div>`;
            } else if (value.type == "古典") {
                $classical += `<div class="forum_list row">
            <div class="left_box col-md-1">
                <img src="images/img.jpg">
            </div>
            <div class="right_box col-md-8">
                <a class="forum_detail" href="forum_detail.html?articleId=${value.articleId}">
                <p class="right_name">${value.userName}<span>${value.createTime.substring(0, 10)}</span></p>
                <p class="right_text">${value.content} </p>
                <p class="">
                    <span class="right_read">阅读数量<i>${value.readNum}</i></span>
                    <span class="right_comment">评论数量<i>${value.replyNum}</i></span>
                </p>
                </a>
            </div>
        </div>`;
            } else if (value.type == "流行") {
                $popular += `<div class="forum_list row">
            <div class="left_box col-md-1">
                <img src="images/img.jpg">
            </div>
            <div class="right_box col-md-8">
                <a class="forum_detail" href="forum_detail.html?articleId=${value.articleId}">
                <p class="right_name">${value.userName}<span>${value.createTime.substring(0, 10)}</span></p>
                <p class="right_text">${value.content} </p>
                <p class="">
                    <span class="right_read">阅读数量<i>${value.readNum}</i></span>
                    <span class="right_comment">评论数量<i>${value.replyNum}</i></span>
                </p>
                </a>
            </div>
        </div>`;
            } else {
                $metal += `<div class="forum_list row">
            <div class="left_box col-md-1">
                <img src="images/img.jpg">
            </div>
            <div class="right_box col-md-8">
                <a class="forum_detail" href="forum_detail.html?articleId=${value.articleId}">
                <p class="right_name">${value.userName}<span>${value.createTime.substring(0, 10)}</span></p>
                <p class="right_text">${value.content} </p>
                <p class="">
                    <span class="right_read">阅读数量<i>${value.readNum}</i></span>
                    <span class="right_comment">评论数量<i>${value.replyNum}</i></span>
                </p>
                </a>
            </div>
        </div>`;
            }
            if (value.authorId == user_id) {
                $own += `<div class="forum_list row">
            <div class="left_box col-md-1">
                <img src="images/img.jpg">
            </div>
            <div class="right_box col-md-8">
                <a class="forum_detail" href="forum_detail.html?articleId=${value.articleId}">
                <p class="right_name">${value.userName}<span>${value.createTime.substring(0, 10)}</span></p>
                <p class="right_text">${value.content} </p>
                <p class="">
                    <span class="right_read">阅读数量<i>${value.readNum}</i></span>
                    <span class="right_comment">评论数量<i>${value.replyNum}</i></span>
                </p>
                </a>
                <button class="layui-btn layui-btn-xs layui-btn-normal" onclick="changearticle(${value.articleId})"><i class="layui-icon"></i></button>
                <button class="layui-btn layui-btn-xs layui-btn-normal" onclick="deletearticle(${value.articleId})"><i class="layui-icon"></i></button>
            </div>
        </div>`;
            }
        });

        $('#rock').html($rock);
        $('#metal').html($metal);
        $('#popular').html($popular);
        $('#classical').html($classical);
        $('#own').html($own);
    })
}(jQuery);

layui.use('element', function () {
    var $ = layui.jquery
        , element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块

    //触发事件
    var active = {
        tabChange: function () {
            //切换到指定Tab项
            element.tabChange('demo', '22'); //切换到：用户管理
        }
    };

    $('.site-demo-active').on('click', function () {
        var othis = $(this), type = othis.data('type');
        active[type] ? active[type].call(this, othis) : '';
    });

    //Hash地址的定位
    var layid = location.hash.replace(/^#test=/, '');
    element.tabChange('test', layid);

    element.on('tab(test)', function (elem) {
        location.hash = 'test=' + $(this).attr('lay-id');
    });

});

function deletearticle(article_id) {

    var msg = "您真的确定要删除吗？\n\n请确认！";
    if (confirm(msg)==true){
        $.ajax({
            type: 'POST',
            url: deleteairticle_url,
            async: false,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            dataType: "json",
            contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
            data: {
                article_id: article_id
            },
            success: function (data) {
                alert("删除成功");
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
};

function changearticle(article_id) {
    $.each(article_list, function (index, value) {
        if (value.articleId == article_id) {
            change_article_id = article_id;
            $('#change-article').modal('show');
            $('#c-title').val(value.title) ;
            $('#c-content').val(value.content);
        }
    });
};

document.getElementById('c_article_sub').onclick = function () {
    var type = document.getElementById("c-type").value;
    var title = document.getElementById("c-title").value;
    var content = document.getElementById("c-content").value;

    if (title == "") {
        alert("请输入文章名字");
    } else if (content == "") {
        alert("请输入文章内容");
    } else if (type == "") {
        alert("请选择文章类型");
    } else {
        article = {
            articleId:change_article_id,
            title: title,
            content: content,
            userId: sessionStorage.getItem('userId'),
            userName: sessionStorage.getItem('userName'),
            readNum: 0,
            replyNum: 0,
            type: type
        }
        $.ajax({
            type: 'POST',
            url: changearticle_url,
            data: JSON.stringify(article),
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                alert(data.message);
                $('#change-article').modal('hide');
                window.location.reload(true);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
    }
};

function searchinput(e,search) {
    if(e.keyCode == 13){
        var s = search.value;
        $.ajax({
            type: 'POST',
            url: search_url,
            xhrFields: {
                withCredentials: true
            },
            async: false,
            data: {
                seacher:s
            },
            crossDomain: true,
            dataType: "json",
            contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
            success: function (data) {
                alert(data.message);
                var $result = '';
                $.each(data.data, function (index, value) {
                    $result += `<div class="forum_list row">
            <div class="left_box col-md-2">
                <img src="images/img.jpg">
            </div>
            <div class="right_box col-md-8">
                <a class="forum_detail" href="forum_detail.html?articleId=${value.articleId}">
                <p class="right_name">${value.userName}<span>${value.createTime.substring(0, 10)}</span></p>
                <p class="right_text">${value.content} </p>
                <p class="">
                    <span class="right_read">阅读数量<i>${value.readNum}</i></span>
                    <span class="right_comment">评论数量<i>${value.replyNum}</i></span>
                </p>
                </a>
            </div>
        </div>`;
                });

                $('#search-article').html($result);
                $('#search-modal').modal('show');
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(data.message);
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
    }
}