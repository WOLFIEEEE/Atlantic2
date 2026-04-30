<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FloorPlan.aspx.cs" Inherits="Aareas247Marketing.FloorPlan" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
<%--    <link rel="stylesheet" type="text/css" href="css/homefinder.css" />
    <link rel="stylesheet" type="text/css" href="css/AboutUs.css" />
    <link rel="stylesheet" type="text/css" href="css/Main.css" />
    <link rel="stylesheet" type="text/css" href="css/styleNew.css" />--%>
    <link rel="stylesheet" type="text/css" href="CSSHandler.ashx?file=css/AboutUs.css" />
    <link rel="stylesheet" type="text/css" href="CSSHandler.ashx?file=css/homefinder.css" />
    <link rel="stylesheet" type="text/css" href="CSSHandler.ashx?file=css/Main.css" />
    <link rel="stylesheet" type="text/css" href="CSSHandler.ashx?file=css/styleNew.css" />
    
    <script type="text/javascript" src="js/gordon.js"></script>
    <style type="text/css">
        div.hfVisibleF
        {
            background-color: #070707;
            color: #ffffff;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 800px;
            opacity: 0.3;
            filter: alpha(opacity=30);
            -moz-opacity: 0.3;
            z-index: 30000;
        }
        div.hfNone
        {
            visibility: hidden;
            display: none;
        }
    </style>

    <script language="javascript" src="js/Utility.js" type="text/javascript"></script>

    <script type="text/javascript" src="js/jquery-1.3.2.min.js"></script>

    <script language="javascript" src="js/homefinder.js" type="text/javascript"></script>

    <script language="javascript" type="text/javascript">
        function proceedToFavorite(param) {
            document.getElementById("btnFavorites_<%=Model_SCID%>").checked = !document.getElementById("btnFavorites_<%=Model_SCID%>").checked;
            addremoveFavorite(param);
        }

        function addremoveFavorite(param) {
            var scid = document.getElementById("SCID").value;
            try {
                //                debugger;
                //window.parent.document.getElementById("ctl00_hdnModelId").value = param;
                window.parent.document.getElementById("dvFloorPlanCloseHide").className = "GMapCancelButtonNewShade";
                window.parent.document.getElementById("dvFloorPlanClose").className = "GMapCancelButtonNewHide";
                var image = window.parent.document.getElementById("imgFavorite");
                if (!image) {
                    image = document.getElementById("imgFavorite");
                }
                if (image.innerHTML.toLowerCase().indexOf('save') == 0) {
                    if (image) image.innerHTML = "Remove";
                    SaveTo247('AddFavorites', "&modelid=" + param, scid);
                    //document.getElementById("lblFavorites_" + param).innerText = "Remove from Favotires";
                    //document.getElementById("btnFavorites_" + param).checked = "true";
                }
                else {
                    if (image) image.innerHTML = "Save";
                    SaveTo247('RemoveFavorites', "&modelid=" + param, scid);
                    //document.getElementById("lblFavorites_" + param).innerText = "Add to Favorites";
                    //document.getElementById("btnFavorites_" + param).src = "images/uncheck.gif";
                }
            }
            catch (err) {
                alert('This functionality is not available from backend');
            }
            //    }

        }

        //Open Save page
        function SaveTo247(dataType, dataValue, scid) {
            try {
                set_cookie("saveSearch", dataValue, 999999);
                var URL = document.getElementById("247URL").value;
                var oifrm = document.getElementById("ifrmSave");
                var sURL = document.location.href.split('/');
                sURL.length = 3;
                var domain = sURL.join('/');
                //oifrm.src = URL + '/Marketing/SaveTo247.aspx?domain=' + domain + '&dataType=' + dataType + '&dataValue=' + dataValue + '&source=hideframe' + '&SCID=' + scid;
                document.getElementById("divGrayBG").className = "hfVisibleF";
                //document.getElementById("divGrayBG").style.height = document.body.clientHeight + "px";
                //new code
                if (document.getElementById("hdnAnonymousSearch") && document.getElementById("hdnAnonymousSearch").value == "1") {
                    //debugger;
                    document.getElementById("hdnAnonymousSearch").value = "";
                    document.getElementById("divGrayBG").className = "hfNone";
                    //var location = URL + '/Marketing/AnonymousSearch.aspx?domain=' + domain + '&dataType=' + dataType + '&dataValue=' + dataValue + '&source=hideframe' + '&SCID=' + scid;
                    var location = URL + '/Marketing/AnonymousSearch.aspx?dataType=' + dataType + dataValue + '&source=hideframe' + '&SCID=' + scid;
                    try {
                        xss_ajax(location);
                    }
                    catch (ex) { }
                }
                else {
                    window.frames['frmLogin'].location.href = URL + '/Marketing/SaveTo247.aspx?domain=' + domain + '&dataType=' + dataType + '&dataValue=' + dataValue + '&source=Floorplanhideframe' + '&SCID=' + scid;
                    showElement();
                }
                //oifrm.src = 'http://localhost:1000/247/Marketing/SaveTo247.aspx?dataType=' + dataType + '&dataValue=' + dataValue;
                //oifrm.style.display = "";
                //setTimeout("checkSaveTo247Statue()", 2000);
            }
            catch (err) {
                alert("This functionality is not available from the backend");
            }
        }

        function xss_ajax(url) {
            //debugger;
            var script_id = null;
            var script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            var date = new Date();
            try {
                script.setAttribute('src', url + "&date=" + date);
                script.setAttribute('id', 'script_id');
            }
            catch (ex) { }
            script_id = document.getElementById('script_id');
            var browser = navigator.appName;

            if (script_id) {
                document.getElementsByTagName('head')[0].removeChild(script_id);
            }
            // Insert <script> into DOM
            if (browser != "Microsoft Internet Explorer")
                document.getElementsByTagName('head')[0].appendChild(script);
        }

        function showElement() {
            //debugger;
            //hideScrollBar();
            window.parent.document.getElementById("dvFloorPlanCloseHide").className = "GMapCancelButtonNewShade";
            window.parent.document.getElementById("dvFloorPlanClose").className = "GMapCancelButtonNewHide";
            var myWidth = 0, myHeight = 0;
            if (typeof (window.innerWidth) == 'number') {
                //Non-IE    
                myWidth = window.innerWidth;
                myHeight = window.innerHeight;
                myWidth = (myWidth / 2) - 200;
                myHeight = (myHeight / 2) - 170;
            } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                //IE 6+ in 'standards compliant mode'    
                myWidth = document.documentElement.clientWidth;
                myHeight = document.documentElement.clientHeight;
                myWidth = (myWidth / 2) - 200;
                myHeight = (myHeight / 2) - 170;
            } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                //IE 4 compatible    
                myWidth = document.body.clientWidth;
                myHeight = document.body.clientHeight;
                myWidth = (myWidth / 2) - 200;
                myHeight = (myHeight / 2) - 170;
            }

            document.getElementById('divLogin').style.left = myWidth + 'px';
            document.getElementById('divLogin').style.top = myHeight + 'px';
            //document.getElementById('divLogin').style.visibility = "visible";
            document.getElementById('divLogin').style.display = "block";
            //hideScrollBar();
        }

        function hideElement() {

            //document.getElementById('divLogin').style.visibility = "hidden";
            document.getElementById('divLogin').style.display = "none";
            //ShowScrollBar();            
        }

        function CloseLoginPopup() {
            document.getElementById('divGrayBG').className = 'hfNone';
            hideElement();
            window.parent.document.getElementById("dvFloorPlanCloseHide").className = "GMapCancelButtonNewShadeHidden";
            window.parent.document.getElementById("dvFloorPlanClose").className = "GMapCancelButtonNew";
            var modelid = document.getElementById('hfModelId').value;
            var scid = document.getElementById('hfSID').value;
            try {
                if (modelid != "0") {
                    var chk = document.getElementById("btnFavorites_" + modelid + "_" + scid);
                    var image = document.getElementById("imgFavorite");
                    if (image.innerHTML.toLowerCase().indexOf('save') == 0) {
                        chk.checked = false;
                        if (image) image.innerHTML = "Remove";
                    }
                    else {
                        chk.checked = true;
                        if (image) image.innerHTML = "Save";
                    }
                    //document.getElementById('hfModelId').value = "0";
                }
            }
            catch (e) { document.getElementById('hfModelId').value = "0"; }
        }

        function showInlineDisclaimerPopup() {
            window.parent.document.getElementById("dvFloorPlanCloseHide").className = "GMapCancelButtonNewShade";
            window.parent.document.getElementById("dvFloorPlanClose").className = "GMapCancelButtonNewHide";
            document.getElementById("divGrayBG").className = "hfVisible";
            $("#divGrayBG").height(getPageSize()[1]);
            window.frames['frmDisclaimer'].location.href = 'LegalDisclaimer.aspx';

            var myWidth = 0, myHeight = 0;
            if (typeof (window.innerWidth) == 'number') {
                //Non-IE    
                myWidth = window.innerWidth;
                myHeight = window.innerHeight;
                myWidth = (myWidth / 2) - 220;
                myHeight = (myHeight / 2) - 100;
            } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                //IE 6+ in 'standards compliant mode'    
                myWidth = document.documentElement.clientWidth;
                myHeight = document.documentElement.clientHeight;
                myWidth = (myWidth / 2) - 220;
                myHeight = (myHeight / 2) - 100;
            } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                //IE 4 compatible    
                myWidth = document.body.clientWidth;
                myHeight = document.body.clientHeight;
                myWidth = (myWidth / 2) - 220;
                myHeight = (myHeight / 2) - 100;
            }

            document.getElementById('divDisclaimer').style.left = myWidth + 'px';
            document.getElementById('divDisclaimer').style.top = myHeight + 'px';
            //document.getElementById('divLogin').style.visibility = "visible";
            document.getElementById('divDisclaimer').style.display = "block";

        }

        function CloseDisclaimerPopup() {
            window.parent.document.getElementById("dvFloorPlanCloseHide").className = "GMapCancelButtonNewShadeHidden";
            window.parent.document.getElementById("dvFloorPlanClose").className = "GMapCancelButtonNew";
            document.getElementById('divGrayBG').className = 'hfNone';
            document.getElementById('divDisclaimer').style.display = "none";
        }

        function getPageSize() {
            // handle IE 6
            if ($.browser.msie && $.browser.version < 7) {
                var scrollHeight = Math.max(
				        document.documentElement.scrollHeight,
				        document.body.scrollHeight
			        );
                var offsetHeight = Math.max(
				        document.documentElement.offsetHeight,
				        document.body.offsetHeight
			        );
                if (scrollHeight < offsetHeight) {
                    pageHeight = $(window).height();
                } else {
                    pageHeight = scrollHeight;
                }
                // handle "good" browsers
            } else {
                pageHeight = $(document).height();
            }
            return new Array('100%', pageHeight);
        }
        
    </script>

</head>
<body>
    <form id="form1" runat="server">
    <input id="247URL" type="hidden" value="<%=_247URL%>" />
    <input id="Model_SCID" type="hidden" value="<%=Model_SCID%>" />
    <input id="SCID" type="hidden" value="<%=SID%>" />
    <div style="clear: both; width: 790px; height: 7px;">
    </div>
    <div style="width: 800px; height: 40px; overflow: hidden;">
        <div class="ModelInfo">
            <div align="center" style="width: 730px;">
                <asp:Label runat="server" ID="lblSCName" CssClass="hfLabelHeader"></asp:Label>&nbsp;
                <asp:Label runat="server" ID="lblBedRooms" CssClass="hfLabelHeader"></asp:Label>/
                <asp:Label runat="server" ID="lblBathrooms" CssClass="hfLabelHeader"></asp:Label>/
                <asp:Label runat="server" ID="lblSqft" CssClass="hfLabelHeader"></asp:Label>
            </div>
            
            <a style="position: absolute; left: 750px; top: 10px;display:none;" class="gridLinkFav" href="javascript:void(0);"
                id="imgFavorite" onclick="proceedToFavorite('<%=Model_SCID%>');">Save</a>
           
        </div>
    </div>
    <div style="clear: both; width: 790px; height: 7px;">
    </div>
    <div style="width: 780px; height: 720px; margin: 0 10px 0 10px; vertical-align: top;position:relative;
        overflow: hidden;">
        <img id="imgFloorplanEdit" alt="Floorplan" onclick="popupWindow('1');" src="images/Information_icon.gif"
            style="display: none; cursor: pointer;position:absolute;top:0px; left:0px;" />
            <img id="imgFloorplanwebEdit" alt="Floorplan Web" onclick="popupWindow('151');" src="images/Information_icon.gif"
            style="display: none; cursor: pointer;position:absolute;top:0px; left:20px;" />
        <div id="dvFloorPlan" runat="server" style="text-align:center; width: 780px; float: left; height: 590px; margin: auto; vertical-align: top;
            overflow: hidden;">                                          
        </div>
        <div class="CommunitySalesFacebookTwitterIntegration">
            <ul class="CommunitySalesFacebookTwitterIntegrationInner">
                <li><a href="#" class="FacebookTwitterLink" id="sharebyTwitter" target="_blank" runat="server">
                    <img alt="Share on Twitter" class="CommunitySharebyEmailAlign" src="images/twitter_17.png" />
                    Share on Twitter</a>&nbsp; &nbsp;</li> <li><a href="#" class="FacebookTwitterLink" id="sharebyFacebook"
                        runat="server" target="_blank">
                        <img alt="Share on Facebook" class="CommunitySharebyEmailAlign" src="images/facebook_17.png" />
                        Share on Facebook</a>&nbsp; &nbsp; </li><li><a href="#" class="FacebookTwitterLink" id="sharebyEmail"
                            target="_blank" runat="server">
                            <img alt="Share on Email" class="CommunitySharebyEmailAlign" src="images/email_17.png" />
                            Share by Email </a>&nbsp; &nbsp;</li>
                            <li><a href="#" class="FacebookTwitterLink" id="A1" onclick="javascript:window.print()" >
                                <img alt="Share on Email" class="CommunitySharebyEmailAlign" src="images/printer_17.png" />
                                Print</a></li>
            </div>
        </div>
        <div style="float: left; width: 100%; height: 20px; vertical-align: top; text-align: left;
            overflow: hidden;">
            <div style="margin: 0 auto 0 auto; width: 100px; height: 100%; vertical-align: top;
                text-align: center; overflow: hidden; line-height: 100%;">
                <a href="javascript:showInlineDisclaimerPopup()" class="FacebookTwitterLink" style="position: absolute;
                    left: 365px;" id="legalDisclaimer" runat="server">Legal Disclaimer </a>
            </div>
        </div>
    </div>
    <input type="checkbox" id="btnFavorites_<%=Model_SCID%>" onclick="proceedToFavorite('<%=Model_SCID%>');"
        class="displayNone" />
    <asp:HiddenField ID="hfModelId" runat="server" Value="0" />
    <asp:HiddenField ID="hfSID" runat="server" Value="0" />
    <asp:HiddenField ID="hdnFlagEdit" runat="server" Value="0" />
    <div id="divLogin" class="divLoginPanel">
        <div class="divLoginPanelInner">
            <div class="divLoginFrame" align="center">
                <iframe id="frmLogin" class="loginFrame" name="frmLogin" src="blank.htm" title="Sign in form" frameborder="0"
                    scrolling="no" ></iframe>
            </div>
            <div id="dvCancel" class="loginCancelButton">
                <asp:LinkButton ID="lnkLoginClose" runat="server" OnClientClick="CloseLoginPopup(); return false;"
                    EnableViewState="false" Text="CLOSE X" CssClass="PopupCancelButtonText"></asp:LinkButton>
            </div>
        </div>
    </div>
    <div id="divGrayBG" class="hfNone">
    </div>
    <div id="divDisclaimer" class="divDisclaimer">
        <div class="divLoginPanelInner">
            <div class="divDisclaimerFame" align="center" test>
                <iframe tabindex="-1" id="frmDisclaimer" class="DisclaimerFrame" name="frmDisclaimer" src="blank.htm" title="Disclaimer details"
                    frameborder="0" scrolling="no" ></iframe>
            </div>
            <div class="DisclaimerCancelButton">
                <asp:LinkButton ID="lnkDisclaimerClose" runat="server" OnClientClick="CloseDisclaimerPopup(); return false;"
                    EnableViewState="false" Text="CLOSE X" CssClass="PopupCancelButtonText"></asp:LinkButton>
            </div>
        </div>
    </div>

    <script language="javascript" type="text/javascript">

        if (document.getElementById('hdnFlagEdit').value != 0) {
            document.getElementById('imgFloorplanEdit').style.display = 'block';
            document.getElementById('imgFloorplanwebEdit').style.display = 'block';
        }

        function popupWindow(MediaTypeId) {
            //debugger;
            var scid = document.getElementById('hfSID').value;
            var rid = document.getElementById('hfModelId').value;
            var BackUrl = document.getElementById('247URL').value;
            var popWidth = 1000;
            var popHeight = 800;
            var popX = (screen.width - popWidth) / 2;
            var popY = (screen.height - popHeight) / 2;
            var settings = "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=1,width=" + popWidth + ",height=" + popHeight + ", top=" + popY + ", left=" + popX + "";
            url = BackUrl + "/MediaCatalog/MediaDetails.aspx?Module=Models&rid=" + rid + "&scid=" + scid + "&MediaTypeId="+ MediaTypeId;
            window.open(url, "Media", settings);
        }

        if ("<%=_isFavourites %>" == "1") {
            var image = window.parent.document.getElementById("imgFavorite");
            if (!image) {
                image = document.getElementById("imgFavorite");
            }

            if (image) image.innerHTML = "Remove";
        }
        else {
            var image = window.parent.document.getElementById("imgFavorite");
            if (!image) {
                image = document.getElementById("imgFavorite");
            }

            if (image) image.innerHTML = "Save";
        }
    
    </script>

    </form>
</body>
</html>
