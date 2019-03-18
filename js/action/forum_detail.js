var getarticle_detail = "http://119.23.15.225:8004/getarticlebyid"
var up_comment="http://119.23.15.225/api/articlecomment/savecomment"
var add_reply = "api/article/addreply"
var getcomments = "http://119.23.15.225:8004/getcommentbyarticle"

// var getarticle_detail = "http://localhost:8004/getarticlebyid"
// var up_comment = "http://localhost:8002/articlecomment/savecomment"
// var add_reply = "http://localhost:8002/article/addreply"
// var getcomments = "http://localhost:8002/articlecomment/getcommentbyarticle"

var article_id = location.search.substring(1).split('=')[1];

!function ($) {
    $.ajax({
        url: getarticle_detail,
        data: {
            article_id: article_id,//获取地址栏后面的id，根据id来渲染不同的评论详情
            // user_id: userId
        },
        dataType: 'json'
    }).done(function (res) {
        var $strhtml = '';

        console.log(res, '测试', '1');
        $strhtml += `<div id="content">
    <div class="grid-16-8 clearfix">
        <div class="article">
            <h1>
                <span property="v:summary">${res.data.title}</span>
            </h1>
            <div>
                <div class="main" id="10031642">
                    <a class="avatar author-avatar left"><img width="48" height="48" src="https://img3.doubanio.com/icon/u193070090-5.jpg"></a>
                    <header class="main-hd">
                        发表
                        <a>${res.data.userName}</a>
                        <span class="allstar50 main-title-rating" title="力荐"></span>
                        <span class="main-title-hide">5</span>
                        <span class="main-meta">${res.data.createTime}</span>
                    </header>
                    <div class="main-bd">
                        <div id="link-report">
                            <div class="review-content clearfix" data-author="繁华转眼CR7"
                                 data-url="https://music.douban.com/review/10031642/" data-original="1">
                                <p>${res.data.content}</p>
                            </div>
                        </div>
                    </div>
                    <div class="main-ft">
                        <div class="main-panel" name="10031642">

                            <div class="main-sharing">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="comment-list" data-start="0" data-reply_length="90">
                <div  id="comments"></div>
                <div id="last" data-last_page_start="0"></div>
                <span class="pl2" align="right"><a class="j a_show_login" data-toggle="modal" data-target="#add-comment"> 我来回应</a></span>
            </div>
        </div>
    </div>
</div>
 `
        $('#forum_detail_page').html($strhtml);
        setComment();
    })
}(jQuery);

document.getElementById('comment_sub').onclick = function () {
    var comment = document.getElementById("comment").value;

    if (comment == "") {
        alert("请输入评论");
    } else {
        article = {
            articleId: article_id,
            comment: comment,
            userId: sessionStorage.getItem('userId'),
            userName: sessionStorage.getItem('userName')
        }
        $.ajax({
            type: 'POST',
            url: up_comment,
            data: JSON.stringify(article),
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                addReply();
                alert(data.message);
                $('#add-comment').modal('hide');
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

function addReply() {
    $.ajax({
        type: 'POST',
        url: add_reply,
        data: {
            article_id: article_id
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        success: function (data) {
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        }
    });
};

function setComment() {
    $.ajax({
        url: getcomments,
        data: {article_id: article_id},
        dataType: 'json'
    }).done(function (res) {
        var $rock = '';
        $.each(res.data, function (index, value) {
            $rock += `<div class="comment-item" id="10712858" data-cid="10712858" data-user_name="曲奇饼🍪"
     data-user_url="https://www.douban.com/people/152151672/" data-target_id="10031642"
     data-target_kind="1012" data-ref_cid="0">
    <div class="avatar left">
        <a><img width="48" height="48" src="https://img3.doubanio.com/icon/u152151672-2.jpg"
                alt="曲奇饼🍪"></a>
    </div>
    <div class="content report-comment">
        <div class="header">
            <a>${value.userName}</a>
            <span>${value.comment}</span>
        </div>


        <p class="comment-text">${value.createTime.substring(0, 10)}</p>

        <div class="group_banned">
         <span class="gact hidden p_u152151672 p_admin p_intern fright">&gt;
         <a href="javascript:;" data-cid="10712858" class="remove_comment">删除</a>
         </span>
        </div>
    </div>
</div>`;
        });

        $('#comments').html($rock);
    })
};