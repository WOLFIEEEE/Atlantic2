<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="MediaList.ascx.cs" Inherits="Aareas247Marketing.wucs.MediaList" %>

<script src="<%=ResolveUrl("~/js/jquery-1.3.2.min.js")%>" type="text/javascript"></script>
<script src="<%=ResolveUrl("~/js/jquery.jcarousel.js")%>" type="text/javascript"></script>
<link href="<%=ResolveUrl("~/css/jquery.jcarousel.css")%>" rel="stylesheet" type="text/css" />
<link href="<%=ResolveUrl("~/css/styleNew.css")%>" rel="stylesheet" type="text/css" />
<link href="<%=CssFileName%>" rel="stylesheet" type="text/css" />

<script type="text/javascript">
    var <%=ClientID %>_json;
    var showNext=true;
    var showPrev=false;

    $(document).ready(function() {
        <%=ClientID %>_Initializer();
//        $("#divSelectedThumb").hide();
    });
        
//    $(window).bind('load', function() {
//        var off = $(temp_obj).offset();
//        $("#divSelectedThumb").show();
//        $("#divSelectedThumb").css({top:off.top+"px",left:off.left+"px"});
//    });
//    
    $(window).bind('resize', function() {
//        //alert('hi resizing...');
        var objOff = $("[id$='_imgPreviewMain']").offset();
        $("#divCaption").css({top:objOff.top +$("[id$='_imgPreviewMain']").height() - 20  +"px", left: objOff.left+"px"});
        $("#divleftbottom").css({top:objOff.top +$("[id$='_imgPreviewMain']").height() - 8  +"px", left: objOff.left+"px"});
        $("#divrightbottom").css({top:objOff.top +$("[id$='_imgPreviewMain']").height() -8 +"px", left: objOff.left + $("[id$='_imgPreviewMain']").width()-7 +"px"});

//        var off = $(temp_obj).offset();
//        $("#divSelectedThumb").css({top:off.top+"px",left:off.left+"px"});
    });
    
    function <%=ClientID %>_Initializer()
    {   
        jQuery("#<%=ClientID %>_MList").jcarousel({
            auto:<%=this.AutoPlay %>,
            scroll: 1,
            wrap: 'circular',
            initCallback: <%=ClientID %>_mycarousel_initCallback,
            itemFirstInCallback: {onAfterAnimation: <%=ClientID %>_mycarousel_itemFirstIn},
            itemVisibleInCallback: { onBeforeAnimation: <%=ClientID %>_mycarousel_itemVisibleInCallback },
            itemVisibleOutCallback: { onAfterAnimation: <%=ClientID %>_mycarousel_itemVisibleOutCallback }
     });
    }
    function <%=ClientID %>_mycarousel_itemFirstIn(eve,item,index){    
        var obj = $(item).find("img");
        var url = $(obj).attr("ImageTag");
        //<%=ClientID %>_loadContentRotator(url, 'mType',obj); 
    }
    function <%=ClientID %>_mycarousel_itemVisibleInCallback(carousel, item, i, state, evt) {        
        var idx = carousel.index(i, <%=ClientID %>_json.length);
        carousel.add(i,<%=ClientID %>_getItemHtml(<%=ClientID %>_json[idx -1]));
        if(state=="init")
        {
            if(i==1)
            {
                document.getElementById("divDO_1").innerHTML = <%=ClientID %>_json[idx -1].Longdesc +".";
            }
            else if(i==2)
            {
                document.getElementById("divDO_2").innerHTML = <%=ClientID %>_json[idx -1].Longdesc+".";
            }
            else if(i==3)
            {
                document.getElementById("divDO_3").innerHTML = <%=ClientID %>_json[idx -1].Longdesc+".";
            }
        }
        else if(state=="next")
        {
            $('#divDO_1').css('display','none');
            $('#divDO_2').css('display','none');
            $('#divDO_3').css('display','none');
           setTimeout(function() {
                $('#divDO_1').css('display','block');
                $('#divDO_2').css('display','block');
                $('#divDO_3').css('display','block');
                document.getElementById("divDO_1").innerHTML = document.getElementById("divDO_2").innerHTML;
                document.getElementById("divDO_2").innerHTML = document.getElementById("divDO_3").innerHTML;
                document.getElementById("divDO_3").innerHTML = <%=ClientID %>_json[idx -1].Longdesc+".";
            },400);
        }
        else if(state=="prev")
        {                        
            $('#divDO_1').css('display','none');
            $('#divDO_2').css('display','none');
            $('#divDO_3').css('display','none');
            setTimeout(function() {
                $('#divDO_1').css('display','block');
                $('#divDO_2').css('display','block');
                $('#divDO_3').css('display','block');
                document.getElementById("divDO_3").innerHTML = document.getElementById("divDO_2").innerHTML;
                document.getElementById("divDO_2").innerHTML = document.getElementById("divDO_1").innerHTML;            
                document.getElementById("divDO_1").innerHTML = <%=ClientID %>_json[idx -1].Longdesc+".";
            },400);
        }
    }
    function <%=ClientID %>_mycarousel_itemVisibleOutCallback(carousel, item, i, state, evt) {
        carousel.remove(i);
        carousel.startAuto(0);
    }
    function <%=ClientID %>_getItemHtml(item) {
        if (item) {
            return "<img src='" + item.Thumb + "' width='" + item.Width + "' height='" + item.Height + "' alt='"+item.Alt+"' longdesc='"+ item.Longdesc +"' ImageTag='"+item.ImageTag+"' onclick=\"Javascript:<%=ClientID %>_loadContentRotator(\'"+item.ImageTag+"\','type',this)\" /><img src='../images/transparent_triangle_Overlay.png' width='" + item.Width + "' height='" + item.Height + "' style='position:absolute;top:0px;left:0px;' alt='"+item.Alt+"' ImageTag='"+item.ImageTag+"' onclick=\"Javascript:<%=ClientID %>_loadContentRotator(\'"+item.ImageTag+"\','type',this)\" />";
        }
    }
   
    function <%=ClientID %>_mycarousel_initCallback(carousel) {   
        <%=ClientID %>_json = <%=ClientID %>_loadJson();
        carousel.buttonNext.bind('click', function() {carousel.startAuto(0);});
        carousel.buttonPrev.bind('click', function() {carousel.startAuto(0);});
        carousel.clip.hover(function() {carousel.stopAuto();}, function() {carousel.startAuto(0);});
        carousel.clip.click(function() {carousel.startAuto(0);

        });
    }
    function <%=ClientID %>_loadJson() {
        var jsonData = "[";
        $('#<%=ClientID %>_MList').find("li img").each(function(m, n) {
            if (m > 0)
                jsonData += ",";
            jsonData += "{Thumb:'"+$(n).attr("src")+"',Url:'"+$(n).attr("alt")+"',Height:'125',Width:'195',Alt:'"+$(n).attr("alt")+"',ImageTag:'"+$(n).attr("ImageTag")+"' ,Longdesc:'"+$(n).attr("longdesc")+"'}";
        });
        jsonData += "]";        
        return eval(jsonData);
    }
    function <%=ClientID %>_loadContentRotator(url, mType, obj) { 
        var caption = $(obj).attr("alt");
        var off;
         $("#lnkPrev").unbind("click");
         $("#lnkNext").unbind("click");
         $(document).unbind("keydown");
//         $("#PriviewContainer").unbind("mousemove");
//         $("#PriviewContainer").unbind("mouseout");
//         $("#lnkPrev").hide();
//         $("#lnkNext").hide();
         
        if(obj)
        {
            off = $(obj).offset();
        }
//        $("#divSelectedThumb").show();
//        $("#divSelectedThumb").css({top:off.top+"px",left:off.left+"px"});
        $("[id$='_imgPreviewMain']").attr("src",url);
       
       //document.getElementById("lnkNext").setAttribute("onclick","javascript:window.alert('hi');");
        //$("#lnkNext").setAttribute("onclick","javascript:window.alert('hi');");
         var i,j;
         var nextUrl, prevUrl;
         for(i = 0; i< <%=ClientID %>_json.length; i++)
         {
            if(url == <%=ClientID %>_json[i].ImageTag)
            {                   
                if(i==0)
                {
                    prevUrl =""
                    showPrev=false;
                     $("#lnkPrev").hide();
                }
                else
                {
                    prevUrl= <%=ClientID %>_json[i-1].ImageTag;
                    showPrev=true;
                    $("#lnkPrev").click(function(){
                        PrevisousButtonClicked(prevUrl,mType);
                    });
//                     if($("#lnkPrev").is(":visible"))
//                     {
                        $("#lnkPrev").show();
                     //}
                }
                
                if((i+1)==<%=ClientID %>_json.length)
                {
                    nextUrl ="";
                    showNext=false;
                    $("#lnkNext").hide();
                }
                else
                {
                    nextUrl = <%=ClientID %>_json[i+1].ImageTag
                    showNext=true;
                    $("#lnkNext").click(function(){
                         NextButtonClicked(nextUrl,mType);
                    });
//                    if($("#lnkNext").is(":visible"))
//                    {
                        $("#lnkNext").show();
                    //}
                }
                
              $(document).keydown(function(event){
                    if(nextUrl!="" && event.keyCode == '78'){
                        NextButtonClicked(nextUrl,mType);
                    }
                    if(prevUrl!="" && event.keyCode == '80'){
                        PrevisousButtonClicked(prevUrl,mType);
                    }
                });
                break;
            }
         }

//        $("#PriviewContainer").mousemove(function(e){
//                
//                var offset = $("#PriviewContainer").offset();
//                
//                var x = e.pageX;
//                var y = e.pageY;//              
//                
//                x = x - offset.left;
//                y = y - offset.top;
//                
//                //$("#mouseP").text(x+", "+y);
//                
//                if(x>=1 && x<=300 && y>=1 && y<=400)
//                {
//                    if(showPrev == true)
//                    {
//                       $("#lnkPrev").show(); 
//                    }
//                    else
//                    {
//                        $("#lnkPrev").hide();
//                    }
//                }
//                else
//                {
//                    $("#lnkPrev").hide();
//                }
//                
//                if(x>=301 && x<=600 && y>=1 && y<=400)
//                {
//                    if(showNext == true)
//                    {
//                        $("#lnkNext").show(); 
//                    }
//                    else
//                    {
//                        $("#lnkNext").hide(); 
//                    }
//                }
//                else
//                {
//                    $("#lnkNext").hide(); 
//                }
//             });                                                                             
//     
//            $("#PriviewContainer").mouseout(function(){
//                $("#lnkNext").hide();
//                $("#lnkPrev").hide(); 
//            });
        var objOff = $("[id$='_imgPreviewMain']").offset();
        if(!$("#imgMask").length){
            $('#PriviewContainer').append(CreateMaskImage($("[id$='_imgPreviewMain']").height(),$("[id$='_imgPreviewMain']").width(),objOff.top,objOff.left));            
        }
        
//        if(caption){
//        if(caption.length>0){
//            if(!$("#divCaption").length)
//                $("body").append("<div id='divCaption' style='padding-left:15px;padding-top:3px;z-index:2999;opacity: 0.85;filter: alpha(opacity=85);background-color:black;position:absolute;display:none;height:17px; text-align:left;vertical-align:top;color:#E1D3C6;font-family:Arial;font-weight:normal;font-size:8pt;'></div>");

//                $("#divCaption").width($("[id$='_imgPreviewMain']").width()-15);
//                $("#divCaption").css({top:objOff.top +$("[id$='_imgPreviewMain']").height() - 20  +"px", left: objOff.left+"px"});
//                $("#divCaption").html(caption);
//                $("#divCaption").show();
//                
//             if(!$("#divleftbottom").length)       
//                $("body").append("<div id='divleftbottom' style='z-index:3999;background-color:white;position:absolute;height:8px;width:7px;color:white;'></div>");
//                $("#divleftbottom").css({top:objOff.top +$("[id$='_imgPreviewMain']").height() - 8  +"px", left: objOff.left+"px"});
//                $("#divleftbottom").show();
//                
//             if(!$("#divrightbottom").length)    
//                $("body").append("<div id='divrightbottom' style='z-index:3999;background-color:white;position:absolute;height:8px;width:7px;color:white;'></div>");
//                $("#divrightbottom").css({top:objOff.top +$("[id$='_imgPreviewMain']").height() -8 +"px", left: objOff.left + $("[id$='_imgPreviewMain']").width()-7 +"px"});
//                $("#divrightbottom").show();
//        }}else{$("#divCaption").hide();}
$("#divCaption").html(caption);
//        if(document.getElementById("divSelectedThumb"))(document.getElementById("divSelectedThumb").parentNode.removeChild(document.getElementById("divSelectedThumb")));
//        if(obj)
//        {
//            if(obj.parentNode) 
//            {
//                obj.parentNode.innerHTML+=createSelectedDiv();
//            }
//            else 
//            {
//                obj.attr("parentNode").innerHTML+=createSelectedDiv();
//            }
//        }
        showInlinePopup(null,'divImage');
    }
    
    function PrevisousButtonClicked(url, mType)
    {
        <%=ClientID %>_loadContentRotator(url,mType,null);
    }
    
    function NextButtonClicked(url, mType)
    {
        <%=ClientID %>_loadContentRotator(url,mType,null);
    }
    
    function createSelectedDiv()
    {
        //return "<div id='divSelectedThumb' style='display:none;z-index:10000;position:absolute; background:url(../images/thumbmasker.png) no-repeat;height:48px;width:69px;cursor:pointer'><img src='../images/selectedthumb.png' /> </div>" ;
        if (navigator.userAgent.indexOf("Firefox")!=-1)
            return "<div id='divSelectedThumb' style='z-index:10000; position:relative; top:-53px; left:0px; background:url(../images/thumbmasker.png) no-repeat;height:125px;width:195px;cursor:pointer'> </div>" ;
        else
            return "<div id='divSelectedThumb' style='z-index:10000; position:relative; top:-48px; left:0px; background:url(../images/thumbmasker.png) no-repeat;height:125px;width:195px;cursor:pointer'> </div>" ;
    }
    function CreateMaskImage(objHeight,objWidth,objTop,objLeft)
    {
        return " <img id='imgMask'  style='position:absolute; height:"+objHeight+"; width:"+objWidth+"; top:"+objTop+"; left:"+objLeft+"px; z-index:3000' src='../images/mask1.png'  />"
        //return "";
    }
    
</script>

<style type="text/css">

#<%=ClientID %>_mListBody .jcarousel-skin-tango .jcarousel-container-horizontal {
    width: 630px;
    padding: 5px 20px 0px 25px;
}
#<%=ClientID %>_mListBody .jcarousel-skin-tango .jcarousel-clip-horizontal {
    width: 625px;         
}

#<%=ClientID %>_mListBody .jcarousel-skin-tango .jcarousel-item-horizontal {
    margin-right: 20px;
}

#<%=ClientID %>_mListBody .jcarousel-skin-tango .jcarousel-item-vertical {
    margin-bottom: 20px;
}

</style>
<div id="mListBody" runat="server">
    <ul id="MList" class="jcarousel-skin-tango" runat="server">
    </ul>
    <div id="divDO_1" style="z-index: 4000; position: absolute; color: gray; font-family: Verdana;
        font-size: 7pt; left: 30px; top: 257px; @top: 264px; height: 15px; width: 20px;">        
    </div>
    <div id="divDO_2" style="z-index: 4000; position: absolute; color: gray; font-family: Verdana;
        font-size: 7pt; left: 245px; top: 257px; @top: 264px; height: 15px; width: 20px;">        
    </div>
    <div id="divDO_3" style="z-index: 4000; position: absolute; color: gray; font-family: Verdana;
        font-size: 7pt; left: 460px; top: 257px; @top: 264px; height: 15px; width: 20px;">        
    </div>
</div>
