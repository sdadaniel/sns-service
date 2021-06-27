$(document).ready(function(){
    menu_number();
    index_mk()
    count_lower_item();
    index_toggle()
})


function scroll_to(elem){
    $('html,body').animate({scrollTop:$('#'+elem).offset().top-$("header").height()-10},200);
    $('header').clientHeiht
}

function menu_number(){
    elem = $(".lnb .index_wrap > ul> li");
    elem.each(function(index,item) {
        var c_li = $(this).children('ul').children('li').length;
        $(item).children('a').after("<span class='index_num'>+ "+c_li+"</span>")
      })
}

function index_mk(){
    var regex = /[^0-9]/g;
    $(".index_wrap").append($("<ul class=u_base></ul>"));
    $(".content .cont").each(function(index,item){
        index = $(item).attr("id").replace(regex,"");
        $li = $("<li class='"+index_to_class(index)+" d_"+index.toString().length+"'></li>")
        $a = $("<a href = 'javascript:void(0)' onclick=scroll_to("+"&#34c_"+index+"&#34)>"+$(item).children('.tit').text().trim()+"</a>")

        $li.append($a)
        up_index= index.toString().substring(0,index.toString().length-1);
        if(index<10){
            $("ul.u_base").append($li)
        }else if($("ul.u_"+up_index).length==0){
            $ul = $("<ul class='u_"+up_index+"'></ul>");
            $($ul).append($li);
            $("li.l_"+up_index).append($ul);
        }else{
            $("ul.u_"+up_index).append($li);
        }
    })
    function index_to_class(int){return "l_"+int}
}

function count_lower_item(){
    $(".d_1").each(function(indet,item){
        if( !$(item).hasClass("l_0")){

            var num = $(item).children("ul").children("li").length;
            $p = $("<p class='count_index'>"+num+"</p>")
            if(num > 0 ){
                $(item).children("a").after($p);
                $(item).children("a").before("<span class='icon_arrow'>></span>");
            }
        }
    })
}
function index_toggle(){
    $(".lnb .pt_03 li span.icon_arrow").bind(function(){
    })
}


