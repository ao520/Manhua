$("#sort-btn1").click(function(){
    var chapter_list=$("#chapter-list1").find("a");
    $("#chapter-list1").empty()
    for (i = 0; i < chapter_list.length; i++) {
    var a_html=chapter_list[chapter_list.length-i-1];
    $("#chapter-list1").append(a_html);
    //	console.log(a_html)
    }
    var sort_value=$("#sort1").text();
    if(sort_value=="正序"){
    $("#sort1").text('降序');
    $("#sort-asc1").css('display','none');
    $("#sort-dsc1").css('display','block');
    }else if(sort_value=="降序"){
    $("#sort1").text('正序');
    $("#sort-asc1").css('display','block');
    $("#sort-dsc1").css('display','none');
    }
    });
    
    
    $("#sort-btn2").click(function(){
    var chapter_list=$("#chapter-list2").find("a");
    $("#chapter-list2").empty()
    for (i = 0; i < chapter_list.length; i++) {
    var a_html=chapter_list[chapter_list.length-i-1];
    $("#chapter-list2").append(a_html);
    //	console.log(a_html)
    }
    var sort_value=$("#sort2").text();
    if(sort_value=="正序"){
    $("#sort2").text('降序');
    $("#sort-asc2").css('display','none');
    $("#sort-dsc2").css('display','block');
    }else if(sort_value=="降序"){
    $("#sort2").text('正序');
    $("#sort-asc2").css('display','block');
    $("#sort-dsc2").css('display','none');
    }
    });
    
    $(".gengduo_dt1").one('click',function(){
    $(".gengduo_dt1 a").text('正在加载...');
    var id = $(".gengduo_dt1").data("id");
    var vid = $(".gengduo_dt1").data("vid");	
    
    $.ajax({
    type: "POST",
    url: "/bookchapter/",
    data: { "id": id, "id2": vid},
    dataType: 'json',
    success: function (res) {    
    for (var a = 0; a < res.length; a++){
    var mh_id=res[a].chapterid;
    var mh_name=res[a].chaptername;
    var b_sn='<a href="/'+id+'/'+mh_id+'.html" class=""><li class=""><p class="chapter-title">'+mh_name+'</p></li></a>';
    $("#chapter-list1").append(b_sn);
    }
    
    $(".gengduo_dt1").css('display','none');
    }
    });
    
    });		
    
    $(".gengduo_dt2").one('click',function(){
    $(".gengduo_dt2 a").text('正在加载...');
    var id = $(".gengduo_dt2").data("id");
    var vid = $(".gengduo_dt2").data("vid");	
    
    $.ajax({
    type: "POST",
    url: "/bookchapter/",
    data: { "id": id, "id2": vid},
    dataType: 'json',
    success: function (res) {    
    for (var a = 0; a < res.length; a++){
    var mh_id=res[a].chapterid;
    var mh_name=res[a].chaptername;
    var b_sn='<a href="/'+id+'/'+mh_id+'.html" class=""><li class=""><p class="chapter-title">'+mh_name+'</p></li></a>';
    $("#chapter-list2").append(b_sn);
    }
    
    $(".gengduo_dt2").css('display','none');
    }
    });
    
    });		
    
    
    $(".getmore").click(function(){
    var scroll_type=$(".getmore").data("id");
    var scroll_num=$(".getmore").data("page");
    
    if(scroll_num>5){ $(".getmore").text('没有更多了~');return;}else{$(".getmore").text('正在加载中~');}
    
    getmore_btn(scroll_num,scroll_type);
    
    $(".getmore").data("page",scroll_num+1);
    $(".getmore").data("nums",2);
    });
    
    
    
    function getmore_btn(page_num,type){
    if($(".getmore").data("nums")==2){return;}
        
    $.ajax({
    type: "POST",
    url: "/rankdata.php",
    data: { "page_num": page_num, "type": type},
    dataType: 'json',
    success: function (res) {   
    for (var a = 0; a < res.length; a++){
    var mh_id=res[a].id;
    var mh_name=res[a].name;
    var mh_imgurl=res[a].imgurl;
    var mh_author=res[a].author;
    var mh_remarks=res[a].remarks;
    var mh_intro=res[a].intro;
    var mh_tag=(page_num-1)*20+a+1;
    var b_sn='<li><div class="poster-box"><a href="/'+mh_id+'/" class=""><img referrerpolicy="no-referrer" alt="" class="cartoon-poster" src="'+mh_imgurl+'" lazy="loaded"></a></div><div class="cartoon-info"><div class="simple-info"><a href="/'+mh_id+'/" class=""><h2>'+mh_name+'</h2><p>'+mh_author+'&nbsp;</p><p>最新：'+mh_remarks+'&nbsp;</p></a></div><div class="rank-index"><div class="rank-default">'+mh_tag+'</div></div></div><p class="cartoon-introduction"><span>'+mh_intro+'&nbsp;</span></p></li>';
    $(".rank-list").append(b_sn);
    
    }
    $(".getmore").data("nums",1);
    if(page_num>=5){ $(".getmore").text('没有更多了~');}else{$(".getmore").text('点击加载更多');}
    }
    });
    }
    
    
    
    $(".getmore1").click(function(){
    var scroll_type=$(".getmore1").data("id");
    var scroll_num=$(".getmore1").data("page");
    
    if(scroll_num>5){ $(".getmore1").text('没有更多了~');return;}else{$(".getmore1").text('正在加载中~');}
    
    getmore_btn1(scroll_num,scroll_type);
    
    var page=$(".getmore1").data("page",scroll_num+1);
    $(".getmore1").data("nums",2);
    });
    
    
    
    function getmore_btn1(page_num,type){
    if($(".getmore1").data("nums")==2){return;}
    $.ajax({
    type: "POST",
    url: "/sortdata.php",
    data: { "page_num": page_num, "type": type},
    dataType: 'json',
    success: function (res) {   
    for (var a = 0; a < res.length; a++){
    var mh_id=res[a].id;
    var mh_name=res[a].name;
    var mh_imgurl=res[a].imgurl;
    var mh_author=res[a].author;
    var mh_remarks=res[a].remarks;
    var mh_intro=res[a].intro;
    var mh_tag=(page_num-1)*20+a+1;
    var b_sn='<li><div class="poster-box"><a href="/'+mh_id+'/" class=""><img referrerpolicy="no-referrer" alt="" class="cartoon-poster" src="'+mh_imgurl+'" lazy="loaded"></a></div><div class="cartoon-info"><div class="simple-info"><a href="/'+mh_id+'/" class=""><h2>'+mh_name+'</h2><p>'+mh_author+'&nbsp;</p><p>最新：'+mh_remarks+'&nbsp;</p></a></div><div class="rank-index"><div class="rank-default">'+mh_tag+'</div></div></div><p class="cartoon-introduction"><span>'+mh_intro+'&nbsp;</span></p></li>';
    $(".rank-list").append(b_sn);
    }
    $(".getmore1").data("nums",1);
    if(page_num>=5){ $(".getmore1").text('没有更多了~');}else{$(".getmore1").text('点击加载更多');}
    }
    });
    }
    
    
    $(".searh-btn").one('click',function(){
    var search_value=$("#search").val();
    location.href = "/search?keyword=" + search_value
    });
    
    
    
    $(function(){
    $("#mainView_img").click(function(){
    $(".reader-footer").fadeToggle(300);
    $(".van-nav-bar").fadeToggle(300);
    }
    );
    }
    ); 
    
    $(".clearfix li").click(function(){
                                
                                switch ($(this).index()) {
                                    case 0:
                                        $(this).addClass("active");	
                                        $(this).siblings().removeClass('active');
                                        $(".underline").css("left","11.1%");
                                        $(".chalist2").hide();
                                        $(".chalist1").show();
                                        $(".chalist3").show();
                                        $(".chalist4").show();
                                        $(".chalist5").hide();
                                        $(".comment-input-box").hide();
                                        break;
                                    case 1:
                                        $(this).addClass("active");	
                                        $(this).siblings().removeClass('active');
                                        $(".underline").css("left","41.9%");
                                        $(".chalist1").hide();
                                        $(".chalist2").show();
                                        $(".chalist3").show();
                                        $(".chalist4").show();
                                        $(".chalist5").hide();
                                        $(".comment-input-box").hide();
                                        break;	
                                    case 2:
                                        $(this).addClass("active");	
                                        $(this).siblings().removeClass('active');
                                        $(".underline").css("left","72.4%");
                                        $(".chalist1").hide();
                                        $(".chalist2").hide();
                                        $(".chalist3").hide();
                                        $(".chalist4").hide();
                                        $(".chalist5").show();
                                        $(".comment-input-box").show();
                                        
                                        var ajax_nums=$(this).data("nums");
                                        var pinglun_id=$(this).data("id");
                                        $(this).data("nums",ajax_nums+1);
                                        
    if(ajax_nums==1){
    
        $.ajax({
            type: "GET",
            url: "/pinglun/",
            data: { "id": pinglun_id},
            dataType: 'json',
            success: function (data) {
    
                var pl_data_len=data.length;
                var pl_List="";
                var blk_cont_html="";
                if(data.length<=0){$(".no_content").show();return;}
    
    
    
                for ( var pl_i = 0; pl_i <= (pl_data_len-1); pl_i++){
                    if(pl_i>=10){break;}
                    var blk_cont=data[pl_i]['blk_cont'];
                    if(pl_i==0){
                        if(blk_cont==""){
                            blk_cont_html='<div class="reply-list-box"><div class="reply-list"><div class="reply-item-box comment-line content-line"><span class="rep-user">推荐:</span><span class="rep-content">关注我们的微信公众号“(kuwancy)”，及时了解更新！</span></div></div></div>';
                        }else{
                            blk_cont_html='<div class="reply-list-box"><div class="reply-list"><div class="reply-item-box comment-line content-line"><span class="rep-user">小编回复:</span><span class="rep-content">'+blk_cont+'</span></div></div></div>';
    
                        }
    
                    }else{blk_cont_html="";}
    
    
                    pl_List+='<div class="comment-item"><div class="avatar-outer"><div class="avatar component_avatar"><img referrerpolicy="no-referrer" src="'+data[pl_i]['touxiang']+'"></div></div><div class="comment-item-content"><div class="comment-nickname comment-line content-line"><div class="bold">'+data[pl_i]['name']+'</div><div class="comment-time comment-line">'+data[pl_i]['addtime']+'</div></div><div class="comment-content comment-line content-line">'+data[pl_i]['cont']+'</div>'+blk_cont_html+'</div></div>';
                }
                $(".comment-list").prepend(pl_List);
                if(pl_data_len>10){
                    $(".more_pinglun").css("display","block");
                }else{
                    $(".comment_more").hide();
                }
            }
        });
    }
    
                                        break;	
                                    
                                }
                            })
    $('.more_pinglun').click(function(){
            var pl_id_num=$('.more_pinglun').data("id");
             var pl_page_num=$('.more_pinglun').data("page");
             
             $(".more_pinglun").hide();
             $(".more_pinglun2").css("display","block");
             
             
                 $.ajax({
                    type: "GET",
                    url: "/pinglun/",
                    data: { "id": pl_id_num,"page": pl_page_num},
                    dataType: 'json',
                    success: function (data) {
                    $('.more_pinglun').data("page",pl_page_num+1);
                    var pl_data_len=data.length;
                    var pl_List="";
                    var blk_cont_html="";
                    
                    for ( var pl_i = 0; pl_i <= (pl_data_len-1); pl_i++){
                        if(pl_i>=10){break;}
                        var blk_cont=data[pl_i]['blk_cont'];
                            
                                if(blk_cont==""){
                                     blk_cont_html="";
                                }else{
                                    blk_cont_html='<div class="reply-list-box"><div class="reply-list"><div class="reply-item-box comment-line content-line"><span class="rep-user">小编回复:</span><span class="rep-content">'+blk_cont+'</span></div></div></div>';
                                }
                                
                        
                              pl_List+='<div class="comment-item"><div class="avatar-outer"><div class="avatar component_avatar"><img referrerpolicy="no-referrer" src="'+data[pl_i]['touxiang']+'"></div></div><div class="comment-item-content"><div class="comment-nickname comment-line content-line"><div class="bold">'+data[pl_i]['name']+'</div><div class="comment-time comment-line">'+data[pl_i]['addtime']+'</div></div><div class="comment-content comment-line content-line">'+data[pl_i]['cont']+'</div>'+blk_cont_html+'</div></div>';
                        }
                        $(".comment-list").append(pl_List);
                        
                        if(pl_data_len>10){
                              $(".more_pinglun").css("display","block");
                              $(".more_pinglun2").hide();
                              }else{
                                  $(".more_pinglun2").html("快畅聊一番吧～");	
                                  $(".more_pinglun2").css("display","block");
                                  }
    
                    }
                    
                    
                    
                    });
    
    })
    $('.pinglun-btn').click(function(){
        
        $(".comment_layout_qm").show();
        
    })
    $('.ift-nav_close_qm').click(function(){
        
        $(".comment_layout_qm").hide();
        
    })
    //监听输入事件
    $('#commentArea_qm').keyup(function(){
    
            var remain = $(this).val().length;
            if(remain > 0){
                $('.comment-sumit_qm').css("background","#ff7830")
            }else{
                $('.comment-sumit_qm').css("background","#ccc")
            }
        });
    //判读评论内容长度
    function commentVerify(){
    var remain = $("#commentArea_qm").val().length;
    if(remain < 5){
    alert("评论字数不能低于5字");
    return false;
    }
    else if(remain > 180){
    alert("评论字数不能高于180字");
    return false;
    }
    else{
    return true;
    }
    }
    //提交评论
    $('.comment-sumit_qm').click(function(){
    
        
        if(commentVerify()){
        var pl_idnum=$('.comment-sumit_qm').data("pl_idnum");
        $('.comment-sumit_qm').data("pl_idnum",pl_idnum+1);
        if(pl_idnum==1){
            var test = $("#commentArea_qm").val();
            var pinglun_id=$('#commentArea_qm').data("pl_id");
            var pl_List="";
         $.ajax({
                type: "Post",
                url: "/pinglun/pinglun_add.php",
                data: { "message": test, "pinglun_id": pinglun_id},
                dataType: 'json',
                success: function (res) {
                    if (res.msg == "success") {
                      alert("评论成功");
                      $('.comment-sumit_qm').data("pl_idnum",1);
                      $('.no_content').hide();
                      $('.comment_layout_qm').hide();
                      pl_List='<div class="comment-item"><div class="avatar-outer"><div class="avatar component_avatar"><img referrerpolicy="no-referrer" src="https://p3.dcarimg.com/origin/ff500000aeea1b4f621a"></div></div><div class="comment-item-content"><div class="comment-nickname comment-line content-line"><div class="bold">用户88'+parseInt(Math.random()*(99999-10000+1)+10000,10)+'</div><div class="comment-time comment-line">刚刚</div></div><div class="comment-content comment-line content-line">'+test+'</div><div class="reply-list-box"><div class="reply-list"><div class="reply-item-box comment-line content-line"><span class="rep-user">推荐:</span><span class="rep-content">关注我们的微信公众号“(kuwancy)”，及时了解更新！</span></div></div></div></div></div>';
                      
                      $(".comment-list").prepend(pl_List);
                      $("#commentArea_qm").val("");
                      
                    }
                    else if (res.msg == "error") {
                         alert("出错了，请重新尝试");
                        $('.comment-sumit_qm').data("pl_idnum",1);
                        return;
                    }
                    else {
                        alert("出错了，请重新尝试");
                        $('.comment-sumit_qm').data("pl_idnum",1);
                        return;
                    }
                },
                error: function () {
                    alert("出错了，请重新尝试");
                    $('.comment-sumit_qm').data("pl_idnum",1);
                        return;
                }
            });	
            
            
        }	
            
        }
        
    })
    

    var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?f45078584a7d9771700659afbaa08ef7";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

    