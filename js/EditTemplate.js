var strREs = "";
function PopMedia(url) {
    var popWidth = 1000;
    var popHeight = 800;
    var popX = (screen.width - popWidth) / 2;
    var popY = (screen.height - popHeight) / 2;
    var settings = "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=1,width=" + popWidth + ",height=" + popHeight + ", top=" + popY + ", left=" + popX + "";
    var popMediaWin = window.open(url, "Media", settings);
    popMediaWin.focus();
}
var jg;
function ControlDrawing(objTop, objLeft, objWidth, objHeight) {
    if (jg) {
        jg.clear();
    }
    var objBody = document.getElementById('ctl00_pageBody');
    jg = new jsGraphics(objBody);
    jg.setColor("#76a0d5");
    jg.setStroke(3);
    var tempTop = 0, tempLeft = 0;
    tempTop = objTop;
    tempLeft = objLeft;
    jg.drawRect(tempLeft, tempTop, objWidth, objHeight);
    jg.paint();
}
function GenerateControl(objControl, tooltip, rid, TemplateId, TempalteType, scid, BackUrl, TempTag, IsRecursive) {
    try {
        var curleft = 0, curtop = 0, curWidth = 0, curHeight = 0, tempLeft = 0;
        var dv = objControl;
        if (dv.style.display == "none" || dv.parentNode.style.display == "none") {
            if (document.getElementById("img_" + TemplateId)) {
                document.getElementById("img_" + TemplateId).style.display = "none";
            }
            return;
        }
        var hfCur = document.getElementById('ctl00_hfCurrentLeft');
        var hfIncr = document.getElementById('ctl00_hfIncreament');
        curWidth = dv.offsetWidth;
        curHeight = dv.offsetHeight;
        var url;
        //debugger;
        if (TempalteType == "WebTemplate") {
            //url = BackUrl + "/MediaCatalog/MediaDetails.aspx?Module=" + TempalteType + "&rid=" + rid + "&scid=" + scid + "&MediaTypeId=" + TemplateId;
            url = BackUrl + "/MediaCatalog/MediaDetails.aspx?Module=" + TempalteType + "&rid=" + rid + "&MediaTypeId=" + TemplateId + "&TempalteTag=" + TempTag + "&IsRecursive=" + IsRecursive;
        }
        else {
            //url = BackUrl + "/MediaCatalog/MediaDetails.aspx?Module=" + TempalteType + "&rid=" + rid + "&scid=" + scid + "&MediaTypeId=" + TemplateId;
            url = BackUrl + "/MediaCatalog/MediaDetails.aspx?Module=" + TempalteType + "&rid=" + rid + "&scid=" + scid + "&MediaTypeId=" + TemplateId + "&TempalteTag=" + TempTag + "&IsRecursive=" + IsRecursive;
        }
                
        do {
            curleft += dv.offsetLeft;
            curtop += dv.offsetTop;
        } while (dv = dv.offsetParent);
        var newImg = document.createElement('img');
        //if (document.getElementById("img_" + TemplateId)) newImg = document.getElementById("img_" + TemplateId);
        
        newImg.id = "img_"+TemplateId;
        newImg.style.cursor = "pointer";
        newImg.style.position = "absolute";
        newImg.style.height = 16;
        newImg.style.width = 16;
        newImg.src = "/images/Information_icon.gif";
        tempLeft = curleft;
        if (objControl.className == "loginControl") {
            //if (curleft == 1020) {
                curleft = curleft - 230;
            //}
        }
        var preTop = hfCur.value;
        var preLeft = hfIncr.value;
        if ((curtop == preTop) || (curtop - preTop) < 5) {            
            curleft = curleft + parseInt(preLeft);
            hfIncr.value = parseInt(preLeft) + 20;
        }
        else {
            hfIncr.value = "20";
        }
        newImg.style.top = curtop;
        newImg.style.left = curleft;
        newImg.alt = tooltip;
        newImg.style.zIndex = "1000";
        hfCur.value = curtop;
        newImg.onclick = function() { PopMedia(url); }
        newImg.onmouseover = function() { ControlDrawing(curtop, tempLeft, curWidth, curHeight); }
        document.body.appendChild(newImg);
    }
    catch (ex)
	        { }
	    }

