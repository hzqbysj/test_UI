// var getarticle = "http://localhost:8002/article/getallarticle"
// var up_article = "http://localhost:8002/article/savearticle"

var getarticle="http://119.23.15.225/api/article/getallarticle"
var up_article = "api/article/savearticle"

var user_id = sessionStorage.getItem("userId");

document.getElementById('article_sub').onclick = function () {
    var type = document.getElementById("type").value;
    var title = document.getElementById("title").value;
    var content = document.getElementById("content").value;

    if (type == "") {
        alert("请输入文章名字");
    } else if (title == "") {
        alert("请输入文章内容");
    } else if (content == "") {
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
        console.log(res.data, '论坛测试');
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