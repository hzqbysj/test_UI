!function($){
    $.ajax({
        url:"http://119.23.15.225:8004/getarticlebyid",
        data:{
            article_id:location.search.substring(1).split('=')[1],//获取地址栏后面的id，根据id来渲染不同的评论详情
            // user_id: userId
        },
        dataType:'json'
    }).done(function(res){
        var $strhtml='';
                     
            console.log(res,'测试','1');
     $strhtml+=`            <div id="content">
    
     <div class="grid-16-8 clearfix">
       
       
       <div class="article">
         
   <h1>
     <span property="v:summary">${res.data.title}</span>
   </h1>
 
   <div>
     <div class="main" id="10031642">
       <a class="avatar author-avatar left"><img width="48" height="48" src="https://img3.doubanio.com/icon/u193070090-5.jpg"></a>
 
       
   
 
   <header class="main-hd">
     评论
     <a>${res.data.userName}</a>
 
       <span class="allstar50 main-title-rating" title="力荐"></span>
       <span class="main-title-hide">5</span>
     <span class="main-meta">${res.data.createTime}</span>
     
 
   </header>
 
       
   
   
   
   <div class="main-bd">
 
 
     
   
     
 
     <div id="link-report">
       <div class="review-content clearfix" data-author="繁华转眼CR7" data-url="https://music.douban.com/review/10031642/" data-original="1">
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

 <div id="comments" class="comment-list" data-start="0" data-reply_length="90">

   <div class="comment-item" id="10712790" data-cid="10712790" data-user_name="一只葵酱" data-user_url="https://www.douban.com/people/174786796/" data-target_id="10031642" data-target_kind="1012" data-ref_cid="0">
     <div class="avatar left">
         <a><img width="48" height="48" src="https://img3.doubanio.com/icon/u174786796-3.jpg" alt="一只葵酱"></a>
     </div>
     <div class="content report-comment">
       <div class="header">
         <a>一只葵酱</a> 
         <span>2019-03-09 15:13:53</span>
       </div>

       <p class="comment-text">路过人间简直了</p>
 
 
       <div class="group_banned">
         <span class="gact hidden p_u174786796 p_admin p_intern fright">&gt;
         <a href="javascript:;" data-cid="10712790" class="remove_comment">删除</a>
         </span>
       </div>
     </div>
   </div>
 
     
   
   <div class="comment-item" id="10712858" data-cid="10712858" data-user_name="曲奇饼🍪" data-user_url="https://www.douban.com/people/152151672/" data-target_id="10031642" data-target_kind="1012" data-ref_cid="0">
     <div class="avatar left">
         <a><img width="48" height="48" src="https://img3.doubanio.com/icon/u152151672-2.jpg" alt="曲奇饼🍪"></a>
     </div>
     <div class="content report-comment">
       <div class="header">
         <a>曲奇饼🍪</a> 
         <span>2019-03-09 15:34:20</span>
       </div>
 
 
       
       <p class="comment-text">守墓人形容👍</p>
 
       <div class="group_banned">
         <span class="gact hidden p_u152151672 p_admin p_intern fright">&gt;
         <a href="javascript:;" data-cid="10712858" class="remove_comment">删除</a>
         </span>
       </div>
     </div>
   </div>

   <div class="comment-item" id="10712871" data-cid="10712871" data-user_name="柿子南红啊" data-user_url="https://www.douban.com/people/193069712/" data-target_id="10031642" data-target_kind="1012" data-ref_cid="0">
     <div class="avatar left">
         <a ><img width="48" height="48" src="https://img3.doubanio.com/icon/u193069712-1.jpg" alt="柿子南红啊"></a>
     </div>
     <div class="content report-comment">
       <div class="header">
         <a >柿子南红啊</a> 
         <span>2019-03-09 15:38:01</span>
       </div>
      <p class="comment-text">简直写到心里去了</p>
 
       <div class="group_banned">
         <span class="gact hidden p_u193069712 p_admin p_intern fright">&gt;
         <a href="javascript:;" data-cid="10712871" class="remove_comment">删除</a>
         </span>
       </div>
     </div>
   </div>            
   <div class="comment-item" id="10713105" data-cid="10713105" data-user_name="小哈哈" data-user_url="https://www.douban.com/people/153993202/" data-target_id="10031642" data-target_kind="1012" data-ref_cid="0">
     <div class="avatar left">
         <a><img width="48" height="48" src="https://img3.doubanio.com/icon/u153993202-1.jpg" alt="小哈哈"></a>
     </div>
     <div class="content report-comment">
       <div class="header">
         <a >小哈哈</a> 
         <span>2019-03-09 16:37:11</span>
       </div>                
       <p class="comment-text">初听是伤感，再听是能量的累积。这首歌真的是好音乐！</p>
 
       <div class="group_banned">
         <span class="gact hidden p_u153993202 p_admin p_intern fright">&gt;
         <a href="javascript:;" data-cid="10713105" class="remove_comment">删除</a>
         </span>
       </div>
     </div>
   </div>
 
 
 <div id="last" data-last_page_start="0"></div>
     
   
   <span class="pl2" align="right"><a class="j a_show_login">&gt; 我来回应</a></span>
   
   
 
 </div>               
       </div>
</div>
     </div>
 `
  
    $('#forum_detail_page').html($strhtml);

 
    })
}(jQuery);