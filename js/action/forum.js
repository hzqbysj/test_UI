!function($){
    $.ajax({
        url:'http://119.23.15.225/api/article/getallarticle',
        data:{
         
        },
        dataType:'json'
    }).done(function(res){
        console.log(res.data ,'论坛测试');
        var $strhtml='';
        $.each(res.data,function(index,value){
            $strhtml+=`<div class="forum_list row">
            <div class="left_box col-md-1">
                <img src="images/img.jpg">
            </div>
            <div class="right_box col-md-8">
                <a class="forum_detail" href="forum_detail.html?articleId=${value.articleId}">
                <p class="right_name">${value.userName}<span>${value.createTime.substring(0,10)}</span></p>
                <p class="right_text">${value.content} </p>
                <p class="">
                    <span class="right_read">阅读数量<i>${value.readNum}</i></span>
                    <span class="right_comment">评论数量<i>${value.replyNum}</i></span>
                </p>
                </a>
            </div>
        </div>`;
        })
        
    $('#forum_container').html($strhtml);
    })
}(jQuery);