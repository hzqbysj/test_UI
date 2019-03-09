!function($){
    $.ajax({
        url:'http://119.23.15.225/api/music/getbestmusic',
        data:{
            sid:location.search.substring(1).split('=')[1]
        },
        dataType:'json'
    }).done(function(res){
        console.log(res.data[0].songName ,'测试');
        var $strhtml='';
        $strhtml+=`<div class="suggestions" id="sticky-sidebar">
        <h4 class="grey">音乐排行榜</h4>
        <div class="follow-user">
            <img src="http://placehold.it/300x300" alt="" class="profile-photo-sm pull-left"/>
            <div>
                <h5><a href="#">${res.data[0].songName}</a></h5>
                <a href="#" class="text-green">${res.data[0].authorName}</a>
                <p>
                <i class="fa fa-thumbs-up"></i><span>${res.data[0].collection}</span>
                <i class="fa fa-thumbs-down"></i><span>${res.data[0].dislike}</span></p>
            </div>
        </div>
        <div class="follow-user">
            <img src="http://placehold.it/300x300" alt="" class="profile-photo-sm pull-left"/>
            <div>
                <h5><a href="#">${res.data[1].songName}</a></h5>
                <a href="#" class="text-green">${res.data[1].authorName}</a>
                <p>
                <i class="fa fa-thumbs-up"></i><span>${res.data[1].collection}</span>
                <i class="fa fa-thumbs-down"></i><span>${res.data[1].dislike}</span></p>
            </div>
        </div>
        <div class="follow-user">
            <img src="http://placehold.it/300x300" alt="" class="profile-photo-sm pull-left"/>
            <div>
                <h5><a href="#">${res.data[2].songName}</a></h5>
                <a href="#" class="text-green">${res.data[2].authorName}</a>
                <p>
                <i class="fa fa-thumbs-up"></i><span>${res.data[2].collection}</span>
                <i class="fa fa-thumbs-down"></i><span>${res.data[2].dislike}</span></p>
            </div>
        </div>
    </div>`;
    $('#music_top').html($strhtml);
    })
}(jQuery);