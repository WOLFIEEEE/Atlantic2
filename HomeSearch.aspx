<%@ Page Language="C#" MasterPageFile="~/CollectiveMain.Master" AutoEventWireup="true"
    CodeBehind="HomeSearch.aspx.cs" Inherits="Aareas247Marketing.HomeSearchNew" %>
<%@ Register Src="wucs/wucPhotoGallery.ascx" TagName="wucPhotoGallery" TagPrefix="uc1" %>
<%@ MasterType TypeName="Aareas247Marketing.CollectiveMain" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <script type="text/javascript">var centerLatitude = <%=_GoogleMapCenterLatitude%>, centerLongitude = <%=_GoogleMapCenterLongitude%>, startZoom = <%=_GoogleMapStartZoom%>;</script>

    <script src="http://maps.google.com/maps?file=api&amp;v=2&amp;key=<%=_GoogleMapsApiKey%>"
        type="text/javascript"></script>

    <script language="javascript" src="js/labeledmarker.js" type="text/javascript"></script>

    <script language="javascript" src="js/markermanager.js" type="text/javascript"></script>

    <script language="javascript" src="js/mapiconmaker.js" type="text/javascript"></script>

    <script language="javascript" src="js/Utility.js" type="text/javascript"></script>

    <script language="javascript" src="js/homefinder.js" type="text/javascript"></script>

  <script language="javascript" src="js/EWindow.js" type="text/javascript"></script>
    <link rel="Stylesheet" type="text/css" href="css/EWindow.css" />
   

    <script language="javascript" type="text/javascript">

        function ShowText(me, id) {
            //debugger;
            if (document.getElementById(id).style.display == "none") {
                document.getElementById(id).style.display = "block";
                me.style.visibility = "hidden";
                //me.innerHTML = 'Less ...';
            }
        }

        function HideText(me, id) {
            if (document.getElementById(id).style.display == "block") {
                document.getElementById(id).style.display = "none";
                document.getElementById(me).style.visibility = "visible";
                //me.innerHTML = 'Less ...';
            }
        }
        
        function ShowTipCounty(text) {
            var textLower = text.toLowerCase();
            var TipText = "";
            var oText = document.getElementById('ctl00_ContentPlaceHolder1_hfJason').value.split('_');
            for (var i = 0; i < oText.length; i++) {
                var tempText = oText[i].split('|');
                if (tempText[0] == textLower) {
                    TipText = tempText[1];
                    break;
                }
            }
            if (TipText.length > 0) {
                return Tip(TipText, WIDTH, 420, BGCOLOR, '#FFFFFF', FONTFACE, 'Verdana', FONTSIZE, '7pt', FONTCOLOR, '#808080', BORDERCOLOR, '#dcdddf', ABOVE, true, JUMPHORZ, true, PADDING, 15);
            }
        }
        function DoFilter(text) {
            var obj = document.getElementById("ctl00_ContentPlaceHolder1_ddlCounty");
            var oText = "";
            for (var count = 0; count < obj.options.length; count++) {
                if (obj.options[count].innerHTML.toUpperCase().search(text.toUpperCase()) != -1) {
                    oText = obj.options[obj.options[count].index].text;
                    oValue = obj.options[obj.options[count].index].value;
                    obj.selectedIndex = obj.options[count].index;
                    break;
                }
            }
            //document.getElementById('imgMap').style.zIndex = "-1";
            //GoCounty(oText);
            ddlCounty_Selected(obj);
        }
        function GoCounty(county) {
//            document.getElementById('ctl00_ContentPlaceHolder1_hfCity').value = "";
//            document.getElementById('ctl00_ContentPlaceHolder1_hfCounty').value = county;
//            GenerateTown(document.getElementById('ctl00_ContentPlaceHolder1_ddlCounty'));
//            DoSetup('C');
            //            AjaxCallCounty(county);
            ddlCounty_Selected(document.getElementById('ctl00_ContentPlaceHolder1_ddlCounty'));
        }
        function GoCounty1(county) {
            document.getElementById('ctl00_ContentPlaceHolder1_hfCity').value = "";
            document.getElementById('ctl00_ContentPlaceHolder1_hfCounty').value = county;
            GenerateTown(document.getElementById('ctl00_ContentPlaceHolder1_ddlCounty'));
            //DoSetup('C');
            //AjaxCallCounty(county);
        }
        function GoCity(city, county) {
            document.getElementById('ctl00_ContentPlaceHolder1_hfCounty').value = county;
            document.getElementById('ctl00_ContentPlaceHolder1_hfCity').value = city;
            GenerateTown(document.getElementById('ctl00_ContentPlaceHolder1_ddlCounty'));
            DoSetup('C');
            AjaxCallCity(county, city);
        }
        function GoCity1(city, county) {
            document.getElementById('ctl00_ContentPlaceHolder1_hfCounty').value = county;
            document.getElementById('ctl00_ContentPlaceHolder1_hfCity').value = city;
            GenerateTown(document.getElementById('ctl00_ContentPlaceHolder1_ddlCounty'));

            //AjaxCallCity(county, city);
        }
        var __activeTooltipSid = null;
        var __lastTooltipTrigger = null;
        var __suppressSid = null;
        var __suppressTimer = 0;

        function dismissTooltip(restoreFocus) {
            var trigger = __lastTooltipTrigger;
            var hadSid = __activeTooltipSid;
            __activeTooltipSid = null;
            if (typeof tt_HideInit === 'function') tt_HideInit();
            else if (typeof UnTip === 'function') UnTip();
            if (restoreFocus && hadSid) {
                __suppressSid = String(hadSid);
                if (__suppressTimer) clearTimeout(__suppressTimer);
                __suppressTimer = setTimeout(function () { __suppressSid = null; }, 250);
                if (trigger && typeof trigger.focus === 'function') {
                    try { trigger.focus(); } catch (e) {}
                }
            }
        }

        function findTriggerImgFromFocus(el) {
            if (!el || el.nodeType !== 1) return null;
            var hasShow = function (n) {
                return n && /ShowTipCommunity2\(/.test(n.getAttribute('onmouseover') || '');
            };
            if (el.tagName === 'IMG' && hasShow(el)) return el;
            if (el.tagName === 'A' && el.children) {
                for (var i = 0; i < el.children.length; i++) {
                    if (el.children[i].tagName === 'IMG' && hasShow(el.children[i])) {
                        return el.children[i];
                    }
                }
            }
            return null;
        }

        function extractSid(img) {
            var m = (img.getAttribute('onmouseover') || '').match(/ShowTipCommunity2\(\s*(\d+)\s*\)/);
            return m ? m[1] : null;
        }

        function positionTooltipAtTrigger(tip, trigger) {
            if (!tip || !trigger || !trigger.getBoundingClientRect) return;
            var rect = trigger.getBoundingClientRect();
            var sx = window.pageXOffset || document.documentElement.scrollLeft || 0;
            var sy = window.pageYOffset || document.documentElement.scrollTop || 0;
            var vw = window.innerWidth || document.documentElement.clientWidth;
            var tipW = tip.offsetWidth || 420;
            var tipH = tip.offsetHeight || 0;
            var left = rect.left + sx + (rect.width / 2) - (tipW / 2);
            var top = rect.top > tipH + 16
                ? (rect.top + sy - tipH - 8)
                : (rect.bottom + sy + 8);
            var maxLeft = vw + sx - tipW - 8;
            var minLeft = sx + 8;
            if (left > maxLeft) left = maxLeft;
            if (left < minLeft) left = minLeft;
            tip.style.left = left + 'px';
            tip.style.top = top + 'px';
        }

        function bindCommunityTooltipInteractions() {
            document.addEventListener('focusin', function (event) {
                var img = findTriggerImgFromFocus(event.target);
                if (!img) return;
                var sid = extractSid(img);
                if (!sid) return;
                ShowTipCommunity2(sid, true, img);
            });

            document.addEventListener('focusout', function () {
                setTimeout(function () {
                    var tip = document.getElementById('WzTtDiV');
                    if (!tip) return;
                    var active = document.activeElement;
                    if (active === tip || tip.contains(active)) return;
                    if (active && findTriggerImgFromFocus(active)) return;
                    dismissTooltip();
                }, 120);
            });
        }

        function ShowTipCommunity2(sid, keyboardTriggered, triggerImg) {
            var tipSource = document.getElementById('dvToolTip_' + sid);
            if (!tipSource) return false;
            if (String(__suppressSid) === String(sid)) return false;
            if (String(__activeTooltipSid) === String(sid) && document.getElementById('WzTtDiV')) {
                return true;
            }
            if (__activeTooltipSid !== null && typeof tt_HideInit === 'function') tt_HideInit();

            __activeTooltipSid = sid;
            if (document.activeElement && document.activeElement !== document.body) {
                __lastTooltipTrigger = document.activeElement;
            }

            var tipContent = '<div style="overflow:visible;padding-right:6px;">' +
                tipSource.innerHTML + '</div>';

            var shown = Tip(
                tipContent,
                WIDTH, 420, BGCOLOR, '#FFFFFF', BORDERCOLOR, '#dcdddf',
                ABOVE, true, JUMPHORZ, true, PADDING, 25,
                FOLLOWMOUSE, false, STICKY, true, CLICKCLOSE, true
            );

            if (keyboardTriggered) {
                var img = triggerImg || findTriggerImgFromFocus(document.activeElement);
                var doPosition = function () {
                    var tip = document.getElementById('WzTtDiV');
                    if (tip && img) positionTooltipAtTrigger(tip, img);
                };
                doPosition();
                setTimeout(doPosition, 0);
                if (window.requestAnimationFrame) requestAnimationFrame(doPosition);
            }

            setTimeout(function () {
                var tip = document.getElementById('WzTtDiV');
                if (!tip) return;
                tip.setAttribute('tabindex', '0');
                tip.onmouseleave = function () { dismissTooltip(); };
                tip.onkeydown = function (event) {
                    event = event || window.event;
                    var key = event.key || event.keyCode;
                    if (key === 'Escape' || key === 'Esc' || key === 27) {
                        dismissTooltip(true);
                        if (event.preventDefault) event.preventDefault();
                        return false;
                    }
                };
            }, 0);

            return shown;
        }

        document.addEventListener('DOMContentLoaded', function () {
            bindCommunityTooltipInteractions();
            var onEsc = function (event) {
                event = event || window.event;
                var key = event.key || event.keyCode;
                if (key === 'Escape' || key === 'Esc' || key === 27) dismissTooltip(true);
            };
            document.addEventListener('keydown', onEsc, true);
            window.addEventListener('keydown', onEsc, true);
        });
        function openPopup(url) {
            window.open(url);
        }
        function proceedToMyHome() {
            if (document.getElementById('dvLogin').style.display == "" || document.getElementById('dvLogin').style.display == "block") {
                btnSignIn_Click();
            }
            else {
                btnMyAccount_Click();
            }
        }

        function showInlinePopup(srcUrl) {
            document.getElementById("divGrayBGCommunity").className = "hfVisible";
            $("#divGrayBGCommunity").height(getCommunityPageSize()[1]);
            window.frames['frmGMap'].location.href = srcUrl; ;
            showCommunityElement();
        }
        function getCommunityPageSize() {
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
        function showCommunityElement() {
            var myWidth = 0, myHeight = 0;
            if (typeof (window.innerWidth) == 'number') {
                //Non-IE    
                myWidth = window.innerWidth;
                myHeight = window.innerHeight;
                myWidth = (myWidth / 2) - 400;
                myHeight = (myHeight / 2) - 360;
            } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                //IE 6+ in 'standards compliant mode'    
                myWidth = document.documentElement.clientWidth;
                myHeight = document.documentElement.clientHeight;
                myWidth = (myWidth / 2) - 400;
                myHeight = (myHeight / 2) - 360;
            } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                //IE 4 compatible    
                myWidth = document.body.clientWidth;
                myHeight = document.body.clientHeight;
                myWidth = (myWidth / 2) - 400;
                myHeight = (myHeight / 2) - 350;
            }

            document.getElementById('divGMap').style.left = myWidth + 'px';
            document.getElementById('divGMap').style.top = myHeight + 'px';
            document.getElementById('divGMap').style.display = "block";
        }
        function hideCommunityElement() {
            window.frames['frmGMap'].location.href = "blank.htm"; ;
            document.getElementById('divGMap').style.display = "none";
        }
        function CloseGMapPopup() {
            document.getElementById('divGrayBGCommunity').className = 'hfNone';
            hideCommunityElement();
        }
        function HideAllLayout() {
            document.getElementById('divBottonPanel').style.display = "none";
            document.getElementById('divMainLayout').style.display = "none";
            document.getElementById('dvPage2').style.display = "none";
            document.getElementById('dvPage3').style.display = "none";
            document.getElementById('dvPage3SocialNetworking').style.display = "none";
            document.getElementById('dvPage3Grid').style.display = "none";
            document.getElementById('dvFAQ').style.display = "none";
            document.getElementById('dvUnique').style.display = "none";
            document.getElementById('dvLinks').style.display = "none";
            document.getElementById('ctl00_ContentPlaceHolder1_divBannerText').style.display = "none";
            document.getElementById('imgMap').style.zIndex = "-1";

        }
    </script>

    <%--<link rel="stylesheet" type="text/css" href="css/AboutUs.css" />
    <link rel="stylesheet" type="text/css" href="css/homefinder.css" />--%>
    
    <input id="Navigator" type="hidden" value="<%=_Navigator%>" enableviewstate="false" />
    <input id="SCID" type="hidden" value="<%=this.Master.SID%>" enableviewstate="false" />
    <input id="247URL" type="hidden" value="<%=this.Master._247URL%>" enableviewstate="false" />

    <script language="javascript" type="text/javascript" src="js/jquery-1.3.2.min.js"></script>
 <script language="javascript" type="text/javascript" src="js/jquery.cookie.js"></script>
    <div class="divWidthFull">
        <h1 style="position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0;">
            BestRentNYC Rental Communities
        </h1>
        <div class="hfdivSearch">
            <div id="divTopPanel">
                <div id="divTopLeftPanel">
                    <a href="http://www.bestrentnj.com" style="text-decoration: none;">
                        <img id="imgBanner" runat="server" src="~/images/homebanner.jpg" alt="" enableviewstate="false"
                            border="0" /></a>
                    <div id="divBannerText" runat="server" class="divBannerText">
                        <div style="display: table; position: absolute; top: 0px; left: 0px; width: 100%;
                            height: 100%; background-color: Transparent;">
                            <div style="position: absolute; top: 20%; width: 100%; display: table-cell; text-align: center;
                                vertical-align: middle;">
                                <h2 style="position: relative; text-align: center; font-family: Verdana; font-size: 10px;
                                    font-weight: bold; color: White;">
                                    <%=_txtBannerPath %></h2>
                            </div>
                        </div>
                    </div>
                    <div id="dvPage3" style="display: none;">
                        <div style="height: 5px; @height: 0px; width: 683px;">
                        </div>
                        <div id="dvCommunitySalesCenterHeaderHF" class="CommunitySalesCenterHeaderHF" style="width: 683px;
                            position: relative;">
                        </div>
                        <div style="height: 7px; @height: 2px; width: 683px;">
                        </div>
                        <%--<div align="left" style="float: left; width: 683px; background-color: #FFFFFF; margin-top: 7px;">
                            <a href="javascript:DoSetup('D'); AjaxCall(GeneratedFilterString());" class="CommunitySearchCriteriaText"
                                style="padding-left: 0px;" id="lnkSeach">« Apartment Search & Browse By Community</a>
                        </div>--%>
                        <div style="height: 7px; @height: 2px; width: 683px;">
                        </div>
                        <div aareasTag="WebTemplate__180;185" id="lblContent" class="CommunitySalesCenterDetails"
                            style="min-height: 53px; margin-top: 5px; @margin-top: 0px;">
                        </div>                        
                        <div style="height: 14px; @height: 10px; width: 100%; float: left;">
                        </div>
                    </div>
                    <div id="divBottonPanel" class="divBottonPanel" style="display: none;">
                        <div id="dvSearchResult" class="divMiddleAlign">
                            <div id="dvSpecial" class="CommunitySalesCenterDetails" runat="server">
                            </div>
                            <div id="dvSenior" class="CommunitySalesCenterDetails" runat="server">
                            </div>
                            <div id="dvAffordable" class="CommunitySalesCenterDetails" runat="server">
                            </div>
                            <div style="height: 10px;">
                            </div>
                            <div class="hfdivGrid" id="AjaxPanel">
                            </div>
                        </div>
                    </div>
                    <div id="divMainLayout" style="width: 100%; border: solid 1px #dcdddf; height: 414px;
                        display: none; margin-top: 5px; @margin-top: 2px;">
                        <div style="width: 100%; position: absolute; left: 0px;">
                            <div style="width: 689px;" class="GridHeaderTitleText">
                                FEATURED RENTAL COMMUNITIES
                                <div style="position: absolute; text-align: center; color: #00a9df; height: 14px;
                                    line-height: 14px; top: 1.5px; left: 200px; width: 70px; border-style: solid;
                                    border-width: 1px; border-color: Gray; background-color: #FFFFFF;">
                                    <div>
                                        <asp:LinkButton ID="LinkButton3" runat="server" OnClientClick="DoSetup('B'); return false;"
                                            EnableViewState="false" Text="Compare" CssClass="bottonNavigatebar"></asp:LinkButton>
                                    </div>
                                </div>
                            </div>
                            <uc1:wucPhotoGallery ID="wucPhotoGallery" runat="server" EnableViewState="false" />
                            <%--<uc1:wucMediaList ID="wucMediaListBestRent" runat="server" EnableViewState="true"
                                AutoPlay="0" NumberOfMedia="1" />--%>
                        </div>
                        <div id="lblFeaturedSCText" runat="server" style="height: 385px; width: 180px; float: left;
                            margin-left: 5px; margin-top: 22px; @margin-top: 25px;">
                        </div>
                        <div id="dvFeaturedImage" runat="server" style="height: 385px; width: 495px; margin-right: 5px;
                            float: right; margin-top: 25px; @margin-top: 25px;">
                            <a id="aFeatured" runat="server" style="border: 0px; text-decoration: none; cursor: pointer;
                                color: #008bda;">
                                <img id="imgFeatured" style="border: 0px;" height="385" width="495" alt="" runat="server"
                                    src="images/loading1.gif" />
                            </a>
                        </div>
                    </div>
                    <div id="dvPage2" class="divBottonPanel" style="display: none;">
                        <div id="Div2" class="divMiddleAlign" style="position: relative; top: 6px; @top: 2px;
                            width: 694px; min-height: 425px;@min-height: 421px;">
                            <div style="position: absolute; left: 0px; z-index: 10;">
                                <div class="GridHeaderTitleText">
                                    FEATURED RENTAL COMMUNITIES
                                    <div style="position: absolute; text-align: center; color: #00a9df; height: 14px;
                                        line-height: 14px; top: 2px; left: 200px; width: 70px; border-style: solid; border-width: 1px;
                                        border-color: Gray; background-color: #FFFFFF;">
                                        <div>
                                            <asp:LinkButton ID="LinkButton4" runat="server" OnClientClick="DoSetup('A'); return false;"
                                                Text="Overview" CssClass="bottonNavigatebar"></asp:LinkButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="hfdivGrid" id="AjaxPanelB">
                            </div>
                        </div>
                    </div>
                    <div id="dvPage3Grid" class="divBottonPanel">
                        <div class="hfdivGrid" style="min-height: 330px;">
                            <div style="position: absolute; top: 0px; @top: 1px; left: 0px; z-index: 100;">
                                <div id="dvHeaderPage3" class="GridHeaderTitleText" role="heading" aria-level="2">
                                    RENTAL COMMUNITIES
                                </div>
                            </div>
                            <div id="AjaxPanelC">
                            </div>
                        </div>
                    </div>
                    <div id="dvPage3SocialNetworking" style="display: none;">                        
                        <div style="height: 7px; @height: 2px; width: 683px;">
                        </div> 
                        <div class="CommunitySalesFacebookTwitterIntegration">
                            <div class="CommunitySalesFacebookTwitterIntegrationInner">
                                <a href="#" class="FacebookTwitterLink" id="sharebyTwitter" target="_blank">
                                    <img alt="Share on Twitter" class="CommunitySharebyEmailAlign" src="images/twitter_17.png" />
                                    Share on Twitter</a>&nbsp &nbsp<a href="#" class="FacebookTwitterLink" id="sharebyFacebook"
                                        target="_blank">
                                        <img alt="Share on Facebook" class="CommunitySharebyEmailAlign" src="images/facebook_17.png" />
                                        Share on Facebook</a>&nbsp &nbsp <a href="#" class="FacebookTwitterLink" id="sharebyEmail"
                                            target="_blank">
                                            <img alt="Share on Email" class="CommunitySharebyEmailAlign" src="images/email_17.png" />
                                            Share by Email </a><a runat="server" id="aSCLoad" style="display: none;" href="AjaxPageHomeSearch.aspx?value=Clear">
                                            </a>
                            </div>
                        </div>                       
                        <div style="height: 14px; @height: 10px; width: 100%; float: left;">
                        </div>
                    </div>
                    <div id="dvFAQ" class="divBottonPanel">
                        <div id="dvFAQText" runat="server" style="text-align: left;" enableviewstate="false">
                        </div>
                    </div>
                    <div id="dvUnique" class="divBottonPanel">
                        <div id="dvUNIQUEText" runat="server" style="text-align: left;" enableviewstate="false">
                        </div>
                    </div>
                    <div id="dvLinks" class="divBottonPanel">
                        <div id="dvLinkText" runat="server" style="text-align: left;" enableviewstate="false">
                        </div>
                    </div>
                </div>
                <div id="divSeparator">
                    &nbsp;
                </div>
                <div id="divTopRightPanel">
                    <div id="divTopRightPanelInner">
                        <div class="NewSearchDiv">
                            <div style="padding-top: 10px; padding-left: 10px;" class="SearchModeText">
                                APARTMENT SEARCH</div>
                            <div id="dvSearchMode" runat="server" style="padding-top: 2px; padding-left: 10px;"
                                class="SearchModeText" >
                            </div>
                            <div style="height: 3px; width: 252px;">
                            </div>
                            <a runat="server" id="aSearchAll" style="display: none;" href="AjaxPageHomeSearch.aspx?value=County_|City_|Flat_|Rent_0^">
                                Search</a>
                            <div style="padding-top: 5px; padding-left: 35px;">
                                <asp:DropDownList ID="ddlCounty" runat="server" Width="180" CssClass="DropDownStyle">
                                </asp:DropDownList>
                            </div>
                            <div style="padding-top: 5px; padding-left: 35px;">
                                <asp:DropDownList ID="ddlCity" runat="server" Width="180" CssClass="DropDownStyle"
                                    EnableViewState="false">
                                </asp:DropDownList>
                            </div>
                            <div style="padding-top: 5px; padding-left: 35px;">
                                <asp:DropDownList ID="ddlApartment" runat="server" Width="180" CssClass="DropDownStyle"
                                    EnableViewState="false">
                                </asp:DropDownList>
                            </div>
                            <div style="padding-top: 5px; padding-left: 35px;">
                                <asp:DropDownList ID="ddlRent" runat="server" Width="180" CssClass="DropDownStyle"
                                    EnableViewState="false">
                                </asp:DropDownList>
                            </div>
                            <div style="padding-top: 5px; padding-left: 35px;">
                                <asp:DropDownList ID="ddlBedroom" runat="server" Width="88" CssClass="DropDownStyle"
                                    EnableViewState="false">
                                </asp:DropDownList>
                                <asp:DropDownList ID="ddlBathroom" runat="server" Width="87" CssClass="DropDownStyle"
                                    EnableViewState="false">
                                </asp:DropDownList>
                            </div>
                            <div style="height: 10px; width: 252px;">
                            </div>
                            <div style="text-align: center; width: 252px; height: 20px;">
                                <%--<div class="divButtonPanelBackground divRightPanelButton" style="display:none">
                                    <asp:LinkButton ID="LinkButton1" runat="server" OnClientClick="SaveSearchCriteria(); return false;"
                                        EnableViewState="false" Text="Save Search" CssClass="bottonNavigatebar"></asp:LinkButton>
                                </div>
                                <div class="searchImageDiv2">
                                </div>--%>
                                <div class="divButtonPanelBackground1 divRightPanelButton">
                                    <asp:LinkButton ID="LinkButton2" runat="server" OnClientClick="clearSearchResault(); return false;"
                                        EnableViewState="false" Text="Clear Search" CssClass="bottonNavigatebar"></asp:LinkButton>
                                </div>
                            </div>
                        </div>
                        <div id="divCoreSearch" class="hfdivCoreSearch" onmouseout="UnTip();">
                            <div id="divFullSearch" class="divWidthFull">
                                <div id="divMapBack" class="hfdivMapBack">
                                    <div id="divLocation" class="hfdivLocation" style="display: none;">
                                    </div>
                                    <div id="divSelect" class="hfdivSelect">
                                    </div>
                                    <div class="MapUpperDiv">
                                        <div id="dvMapHeading" style="padding-left: 10px" class="SearchModeText">
                                            BROWSE COMMUNITIES BY COUNTY
                                        </div>
                                    </div>
                                    <div id="gMap" class="hfdivMap">
                                    </div>
                                    <img alt="" id="imgMap" src="images/njstates.jpg" style="outline-style: none; border: none 0px;
                                        position: absolute; top: 20px; left: 0px; z-index: -1; width: 252px; height: 396px;"
                                        usemap="#Map" onmouseout="UnTip();" />
                                    <map name="Map" id="Map">
                                        <area shape="poly" coords="183,62,193,46,199,49,233,66,223,97,208,99,201,99,203,85,200,70,185,66"
                                            href="Bergen-County" alt="Bergen"  onmousemove="ShowTipCounty('Bergen')"
                                            onmouseout="UnTip()" />
                                        <area shape="poly" coords="172,34,192,46,183,63,190,68,198,71,201,97,202,99,201,98,200,101,200,104,199,101,199,100,199,105,193,88,185,82,181,68,165,62,156,59,156,53,170,35"
                                            href="Passaic-County" alt="Passaic" onmousemove="ShowTipCounty('Passaic')"
                                            onmouseout="UnTip()" />
                                        <area shape="poly" coords="170,34,138,71,139,74,129,81,126,78,122,80,94,51,110,30,126,9,169,32"
                                            href="Sussex-County" alt="Sussex"  onmousemove="ShowTipCounty('Sussex')"
                                            onmouseout="UnTip()" />
                                        <area shape="poly" coords="94,53,120,80,118,83,117,89,96,109,69,126,66,122,69,115,66,114,69,108,68,104,79,96,79,91,83,87,75,69,92,54"
                                            href="Warren-County" alt="Warren"  onmousemove="ShowTipCounty('Warren')"
                                            onmouseout="UnTip();" />
                                        <area shape="poly" coords="202,114,205,111,196,101,192,88,185,82,177,81,176,92,172,97,171,104,185,108,192,113,200,114"
                                            href="Essex-County" alt="Essex"  onmousemove="ShowTipCounty('Essex')"
                                            onmouseout="UnTip();" />
                                        <area shape="poly" coords="169,107,160,114,160,119,165,119,162,128,177,127,180,130,189,129,196,122,200,116,170,107"
                                            href="Union-County" alt="Union"  onmousemove="ShowTipCounty('Union')"
                                            onmouseout="UnTip();" />
                                        <area shape="poly" coords="108,100,127,108,149,102,154,110,152,117,159,117,169,105,173,92,175,80,182,80,180,70,156,61,154,56,132,81,124,81,120,87,108,99"
                                            href="Morris-County" alt="Morris"  onmousemove="ShowTipCounty('Morris')"
                                            onmouseout="UnTip();" />
                                        <area shape="poly" coords="68,128,106,101,127,110,126,120,130,125,127,127,128,129,120,141,123,152,115,155,117,158,108,159,108,165,103,165,102,168,95,156,84,155,82,133,69,129"
                                            href="Hunferdon-County" alt="Hunferdon"  onmousemove="ShowTipCounty('Hunferdon')"
                                            onmouseout="UnTip();" />
                                        <area shape="poly" coords="128,109,127,119,131,124,122,141,124,151,127,160,137,158,140,161,145,163,145,155,160,141,153,132,161,126,164,121,152,118,151,111,149,104,131,108"
                                            href="Somerset-County" alt="Somerset"  onmousemove="ShowTipCounty('Somerset')"
                                            onmouseout="UnTip();" />
                                        <area shape="poly" coords="191,128,181,130,177,127,162,127,154,132,160,140,147,155,145,164,140,163,139,167,150,174,158,176,157,181,168,176,189,149,185,144,190,130"
                                            href="Middlesex-County" alt="Middlesex"  onmousemove="ShowTipCounty('Middlesex')"
                                            onmouseout="UnTip();" />
                                        <area shape="poly" coords="144,197,129,191,128,195,112,180,102,168,108,166,109,159,115,159,117,157,123,153,125,160,136,159,140,163,138,165,155,176,157,181,143,190,143,197"
                                            href="Mercer-County" alt="Mercer"  onmousemove="ShowTipCounty('Mercer')"
                                            onmouseout="UnTip();" />
                                        <area shape="poly" coords="189,151,170,176,144,190,144,199,150,207,164,191,184,191,189,200,198,200,201,201,205,197,209,201,208,205,216,205,217,193,224,161,220,148,220,157,206,151,191,150"
                                            href="Monmouth-County" alt="Monmouth"  onmousemove="ShowTipCounty('Monmouth')"
                                            onmouseout="UnTip();" />
                                        <area shape="poly" coords="150,207,170,254,166,285,176,289,176,295,181,292,202,265,196,257,197,249,207,254,217,206,208,206,208,201,205,199,200,202,188,202,184,193,164,192,151,206"
                                            href="Ocean-County" alt="Ocean"  onmousemove="ShowTipCounty('Ocean')"
                                            onmouseout="UnTip();" />
                                        <area shape="poly" coords="85,218,90,219,90,226,94,227,94,230,105,249,114,251,125,260,136,273,163,288,169,256,148,205,131,193,127,196,84,215"
                                            href="Burlington-County" alt="Burlington"  onmousemove="ShowTipCounty('Burlington')"
                                            onmouseout="UnTip();" />
                                        <area shape="poly" coords="84,218,81,222,74,225,74,235,80,241,87,259,93,264,102,267,105,277,123,261,104,249,89,221,83,218"
                                            href="Camden-County" alt="Camden" onmousemove="ShowTipCounty('Camden')"
                                            onmouseout="UnTip();" />
                                        <area shape="poly" coords="122,262,95,290,111,308,109,321,149,325,181,302,161,289,122,264"
                                            href="Atlantic-County" alt="Atlantic"  onmousemove="ShowTipCounty('Atlantic')"
                                            onmouseout="UnTip();" />
                                        <area shape="poly" coords="72,236,62,240,46,242,39,250,52,266,58,265,65,269,83,285,93,290,104,280,101,268,89,264,79,242,72,237"
                                            href="Gloucester-County" alt="Gloucester"  onmousemove="ShowTipCounty('Gloucester')"
                                            onmouseout="UnTip();" />
                                        <area shape="poly" coords="36,252,21,273,22,280,25,284,24,294,19,298,22,302,27,301,37,312,38,301,45,301,47,295,52,295,61,286,81,300,82,287,60,267,52,267,37,252"
                                            href="Salem-County" alt="Salem"  onmousemove="ShowTipCounty('Salem')"
                                            onmouseout="UnTip();" />
                                        <area shape="poly" coords="38,302,39,313,45,319,50,319,52,329,58,327,60,331,64,333,67,335,70,334,69,340,76,345,78,342,88,340,90,342,104,345,102,339,106,335,106,330,110,324,109,314,110,309,84,288,82,301,61,288,53,296,48,296,47,301,38,303"
                                            href="Cumberland-County" alt="Cumberland"  onmousemove="ShowTipCounty('Cumberland')"
                                            onmouseout="UnTip();" />
                                        <area shape="poly" coords="111,323,108,330,108,335,104,339,105,346,106,352,94,381,98,383,129,357,149,328,112,324"
                                            href="Cape May-County" alt="Cape May"  onmousemove="ShowTipCounty('Cape May')"
                                            onmouseout="UnTip();" />
                                        <area shape="poly" coords="201,101,203,105,206,111,204,119,217,111,220,100,219,96,212,99,204,102"
                                            href="Hudson-County" alt="Hudson"  onmousemove="ShowTipCounty('Hudson')"
                                            onmouseout="UnTip();" />
                                    </map>
                                </div>
                            </div>
                        </div>
                        <div id="divOption" style="display: none;">
                            <asp:Panel ID="panSearchOption" runat="server" CssClass="hfChkRad" EnableViewState="false" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="divNavigatorBar" class="hfdivNavigatorBar" style="display: none;">
    </div>
    <!-- new design ends here -->
    <div id="divOptionB" class="hfdivOptionB">
    </div>
    <div id="divProgress" class="hfHidden">
    </div>
    <div id="divLoadProgress" style="height: 22px; border-color: Gray; border-style: solid;
        border-width: 1px; z-index: 40000; display: none; position: fixed;">
        <img id="imgLoad" alt="" src="images/loading1.gif" />
    </div>
    <asp:HiddenField ID="hdnCurrentModelList" runat="server" Value="" EnableViewState="false" />
    <input type="hidden" id="hdnImagefilter" value="" enableviewstate="false" />
    <input type="hidden" id="hdnAnonymousSearch" value="" enableviewstate="false" />
    <div id="divGMap" class="divGMapPanelNew" role="dialog" aria-modal="true" aria-label="Community location map">
        <div class="divGMapPanelInner">
            <img id="Img1" src="images/closelabel.png" alt="Close map" onclick="CloseGMapPopup();" class="GMapCancelButtonNew" />
            <img id="Img5" src="images/labelclose_shade.png" alt="" class="GMapCancelButtonNewShadeHidden" />
            <div class="divGMapFrame" align="center">
                <iframe id="frmGMap" class="GmapFrameNew" name="frmGMap" src="blank.htm" title="Community location map" frameborder="0"
                    scrolling="no"></iframe>
            </div>
        </div>
    </div>
    <div id="divGrayBGCommunity" class="hfGmapNone">
    </div>
    <asp:HiddenField ID="hfCounty" runat="server" Value="" />
    <asp:HiddenField ID="hfCity" runat="server" Value="" />
    <asp:HiddenField ID="hfFlat" runat="server" Value="" />
    <asp:HiddenField ID="hfBed" runat="server" Value="" />
    <asp:HiddenField ID="hfBath" runat="server" Value="" />
    <asp:HiddenField ID="hfPrice" runat="server" Value="" />
    <asp:HiddenField ID="hfJason" runat="server" Value="" EnableViewState="false" />
    <asp:HiddenField ID="hfAllId" runat="server" Value="" EnableViewState="false" />
    <asp:HiddenField ID="hfTownFilter" runat="server" Value="" EnableViewState="false" />
    <asp:HiddenField ID="hfType" runat="server" Value="" />
    <iframe id="ifrmSave" class="hfifrmSave displayNone" frameborder="no"></iframe>

    <script language="javascript" type="text/javascript">
        //document.body.style.overflowX = 'hidden';
        var typeShow1 = "<%= _grid%>"
        var typeAll = "<%= _type%>"
        var typeExceptAll = "<%= _typeexceptall%>"
        var typeSpecial = "<%= _typespecial%>"
        var pageType = "";
        var houseType = "<%=houseType %>";
        var tempExceptAll = typeExceptAll;
        
        if ($.cookie('pType') != null) {
            typeShow1 = $.cookie('pType');
        }        
       
        DoSetup(typeShow1);
       
        function DoSetup(typeShow) {          
            if (typeShow == "A") {
                HideAllLayout();
                document.getElementById('ctl00_ContentPlaceHolder1_imgBanner').src = "<%=_imgBannerPath%>";
                document.getElementById('divMainLayout').style.display = "block";
                document.getElementById('ctl00_ContentPlaceHolder1_divBannerText').style.display = "block";
                document.getElementById('imgMap').style.zIndex = "0";
            }
            else if (typeShow == "B") {
                HideAllLayout();
                document.getElementById('ctl00_ContentPlaceHolder1_imgBanner').src = "<%=_imgBannerPath%>";
                document.getElementById('dvPage2').style.display = "block";
                document.getElementById('ctl00_ContentPlaceHolder1_divBannerText').style.display = "block";
                document.getElementById('divMapBack').style.top = "5px";
                AjaxCallFeature();
                document.getElementById('imgMap').style.zIndex = "0";
            }
            else if (typeShow == "C") {
                HideAllLayout();
                document.getElementById('ctl00_ContentPlaceHolder1_imgBanner').src = "<%=_imgBannerPathCommon%>";
                document.getElementById('dvPage3').style.display = "block";
                document.getElementById('dvPage3SocialNetworking').style.display = "block";
                document.getElementById('dvPage3Grid').style.display = "block";
                document.getElementById('divMapBack').style.top = "5px";              

            }
            else if (typeShow == "D") {                
                HideAllLayout();
                document.getElementById('ctl00_ContentPlaceHolder1_imgBanner').src = "<%=_imgBannerPathCommon%>";
                document.getElementById('divBottonPanel').style.display = "block";
                document.getElementById('divMapBack').style.top = "7px";
                if (typeAll.length > 0) {
                    document.getElementById('imgMap').style.zIndex = "-1";
                    clearSerach = true;
                    AjaxCall('Clear');
                }

                else if (typeSpecial.length > 0) {
                    ClearSearchCookie();
                    clearSerach = true;
                    AjaxCallSpecial('Clear');
                }
                else if (typeExceptAll.length > 0) {
                    ClearSearchCookie();
                    clearSerach = true;
                    AjaxCall('Clear');
                }               
            }
            else if (typeShow == "E") {
                ClearSearchCookie();
                HideAllLayout();
                document.getElementById('ctl00_ContentPlaceHolder1_imgBanner').src = "<%=_imgBannerPathCommon%>";
                document.getElementById('dvFAQ').style.display = "block";
                document.getElementById('divMapBack').style.top = "7px";
                document.getElementById('imgMap').style.zIndex = "0";
            }
            else if (typeShow == "F") {
                ClearSearchCookie();
                HideAllLayout();
                document.getElementById('ctl00_ContentPlaceHolder1_imgBanner').src = "<%=_imgBannerPathCommon%>";
                document.getElementById('dvUnique').style.display = "block";
                document.getElementById('divMapBack').style.top = "7px";
                document.getElementById('imgMap').style.zIndex = "0";
            }
            else if (typeShow == "H") {
                ClearSearchCookie();
                HideAllLayout();
                document.getElementById('ctl00_ContentPlaceHolder1_imgBanner').src = "<%=_imgBannerPathCommon%>";
                document.getElementById('dvLinks').style.display = "block";
                document.getElementById('divMapBack').style.top = "7px";
                document.getElementById('imgMap').style.zIndex = "0";
            }
        }

        if (document.getElementById('ctl00_ContentPlaceHolder1_hfCounty').value.length > 0) {
            var countyVal = document.getElementById('ctl00_ContentPlaceHolder1_hfCounty').value;
            var cityVal = document.getElementById('ctl00_ContentPlaceHolder1_hfCity').value;
            setTimeout(function() {
                document.getElementById('ctl00_ContentPlaceHolder1_hfCounty').value = countyVal;
                document.getElementById('ctl00_ContentPlaceHolder1_hfCity').value = cityVal;
                GenerateTown(document.getElementById('ctl00_ContentPlaceHolder1_ddlCounty'));
            }, 1000);

        }        
        SetOthersDDL();
        if (navigator.appName == 'Netscape' && navigator.platform.indexOf('Win') > -1) {
            document.getElementById('ctl00_ContentPlaceHolder1_ddlCounty').style.height = "20px";
            document.getElementById('ctl00_ContentPlaceHolder1_ddlCity').style.height = "20px";
            document.getElementById("ctl00_ContentPlaceHolder1_ddlApartment").style.height = "20px";
            document.getElementById("ctl00_ContentPlaceHolder1_ddlRent").style.height = "20px";
            document.getElementById("ctl00_ContentPlaceHolder1_ddlBedroom").style.height = "20px";
            document.getElementById("ctl00_ContentPlaceHolder1_ddlBathroom").style.height = "20px";

        }
        if (navigator.appName == 'Netscape' && navigator.platform.indexOf('iPad') > -1) {
            document.getElementById('ctl00_ContentPlaceHolder1_ddlCounty').style.height = "22px";
            document.getElementById('ctl00_ContentPlaceHolder1_ddlCity').style.height = "22px";
            document.getElementById("ctl00_ContentPlaceHolder1_ddlApartment").style.height = "22px";
            document.getElementById("ctl00_ContentPlaceHolder1_ddlRent").style.height = "22px";
            document.getElementById("ctl00_ContentPlaceHolder1_ddlBedroom").style.height = "22px";
            document.getElementById("ctl00_ContentPlaceHolder1_ddlBathroom").style.height = "22px";

        }
        function AfterClear() {
            HideAllLayout();
            document.getElementById('ctl00_ContentPlaceHolder1_imgBanner').src = "<%=_imgBannerPathCommon%>";
            document.getElementById('divBottonPanel').style.display = "block";
            document.getElementById('divMapBack').style.top = "7px";
        }
               
    </script>

</asp:Content>
