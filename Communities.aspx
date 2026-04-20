<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Communities.aspx.cs" Inherits="Aareas247Marketing.Communities"
    MasterPageFile="~/CollectiveMain.Master" Title="The Collective World - Communities" %>

<%@ Register Src="~/wucs/MediaList.ascx" TagName="wucMediaList" TagPrefix="uc1" %>
<%@ Register Src="~/wucs/ContentRotator.ascx" TagName="wucContectRotator" TagPrefix="uc1" %>
<%@ MasterType TypeName="Aareas247Marketing.CollectiveMain" %>
<asp:Content ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <script language="javascript" src="<%=ResolveUrl("~/js/Utility.js")%>" type="text/javascript"></script>

    <script language="javascript" src="<%=ResolveUrl("~/js/homefinder.js")%>" type="text/javascript"></script>

    <script type="text/javascript" language="javascript">
        var divId = "";
        var dvLocalMapHeight = "";
        var dvLocalMapWidth = "";

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

        function popupWindow(url) {
            //debugger;
            window.open(url, 'Communities', 'width=978, height=753, menubar=no');
        }

        function showInlinePopup(srcUrl, dvID) {
            //debugger;
            document.getElementById("divGrayBGCommunity").className = "hfVisible";
            //document.getElementById("divGrayBGCommunity").style.height = document.body.clientHeight + "px";
            $("#divGrayBGCommunity").height(getCommunityPageSize()[1]);
            //$("#divGrayBGCommunity").width(getPageSize()[0]);
            if (dvID == 'divGMap') {
                window.frames['frmGMap'].location.href = srcUrl;
                divId = dvID;
            }
            else if (dvID == 'divFloorPlan') {
                window.frames['frmFloorPlan'].location.href = srcUrl;
                divId = dvID;
            }
            else if (dvID == 'divRegister') {
                window.frames['frmRegister'].location.href = srcUrl;
                divId = dvID;
            }
            else if (dvID == 'divLocalMap') {
                if (srcUrl != "") {
                    //debugger;
                    var newimg = new Image();
                    newimg.src = srcUrl;
                    setTimeout(function() {
                        var imgheight = newimg.height;
                        var imgwidth = newimg.width;
                        dvLocalMapHeight = (imgheight + 45);
                        dvLocalMapWidth = (imgwidth + 20);
                        document.getElementById("divLocalMap").style.height = dvLocalMapHeight + "px";
                        document.getElementById("divLocalMap").style.width = dvLocalMapWidth + "px";
                        document.getElementById("imgLocalMap").style.height = imgheight + "px";
                        document.getElementById("imgLocalMap").style.width = imgwidth + "px";
                        document.getElementById("dvLocalMapClose").style.top = (imgheight + 20) + "px";
                        document.getElementById("dvLocalMapClose").style.left = (imgwidth - 50) + "px";
                        window.document.getElementById('imgLocalMap').src = srcUrl;
                    }, 600);
                    divId = dvID;
                }
                else {
                    window.document.getElementById('imgLocalMap').src = "/images/selectedthumb.png";
                    divId = dvID;
                }
            }
            else {
                divId = dvID;
            }
            if (dvID == 'divLocalMap') {
                setTimeout(function() {
                    showCommunityElement(divId);
                }, 700);
            }
            else {
                showCommunityElement(divId);
            }
        }


        function showInlinePopupImage(srcUrl, dvID, caption) {
            //debugger;
            document.getElementById("divGrayBGCommunity").className = "hfVisible";
            //document.getElementById("divGrayBGCommunity").style.height = document.body.clientHeight + "px";
            $("#divGrayBGCommunity").height(getCommunityPageSize()[1]);
            //$("#divGrayBGCommunity").width(getPageSize()[0]);
            document.getElementById("divCaption").innerHTML = caption;
            showCommunityElement(dvID);
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


        function showCommunityElement(dvID) {
            //debugger;
            //hideScrollBar();
            var myWidth = 0, myHeight = 0;
            if (typeof (window.innerWidth) == 'number') {
                //Non-IE    
                myWidth = window.innerWidth;
                myHeight = window.innerHeight;
            } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                //IE 6+ in 'standards compliant mode'    
                myWidth = document.documentElement.clientWidth;
                myHeight = document.documentElement.clientHeight;

            } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                //IE 4 compatible    
                myWidth = document.body.clientWidth;
                myHeight = document.body.clientHeight;

            }

            if (dvID == 'divGMap' || dvID == 'divMapBack') {
                myWidth = (myWidth / 2) - 400;
                myHeight = (myHeight / 2) - 300;
            }
            else if (dvID == 'divImage') {
                myWidth = (myWidth / 2) - 300;
                myHeight = (myHeight / 2) - 190;
            }
            else if (dvID == 'divRegister') {
                myWidth = (myWidth / 2) - 225;
                myHeight = (myHeight / 2) - 190;
            }
            else if (dvID == 'divLocalMap') {
                myWidth = (myWidth / 2) - (dvLocalMapWidth / 2);
                myHeight = (myHeight / 2) - (dvLocalMapHeight / 2);
            }
            else {
                myWidth = (myWidth / 2) - 400;
                myHeight = (myHeight / 2) - 350;
            }
            //            if (divId != 'divMapBack')
            //                divId = 'divGMap';
            document.getElementById(dvID).style.left = myWidth + 'px';
            document.getElementById(dvID).style.top = myHeight + 'px';
            //document.getElementById('divGMap').style.visibility = "visible";
            document.getElementById(dvID).style.display = "block";
            //hideScrollBar();
        }




        function hideCommunityElement(frmId) {
            if (frmId == 'frmFloorPlan' || frmId == 'frmGMap' || frmId == 'frmRegister')
                window.frames[frmId].location.href = "/blank.htm";
            //document.getElementById('divGMap').style.visibility = "hidden";
            if (frmId == 'divImage') {
                document.getElementById('ctl00_ContentPlaceHolder1_wucContentRotator1_imgPreviewMain').src = "/images/selectedthumb.png";
            }
            if (frmId == 'divLocalMap') {
                window.document.getElementById('imgLocalMap').src = "/images/selectedthumb.png";
            }
            document.getElementById('divFloorPlan').style.display = "none";
            document.getElementById('divImage').style.display = "none";
            document.getElementById('divGMap').style.display = "none";
            document.getElementById('divRegister').style.display = "none";
            document.getElementById('divLocalMap').style.display = "none";

            //            if (frmId == 'frmFloorPlan') {
            //                window.location.href = window.location.href;
            //            }                      
            //ShowScrollBar();            
        }

        function CloseGMapPopup(frmId) {
            document.getElementById('divGrayBGCommunity').className = 'hfNone';
            hideCommunityElement(frmId);
        }

        function showCommunity(city, county) {

            var type = "<%= _type %>";
            type = type.toLowerCase();

            if (city == "") {
                if (type == "all")
                    window.location = "/" + county.replace(" ", "-") + "";
                else if (type == "affordable")
                    window.location = "/" + county.replace(" ", "-") + "-Affordable";
                else if (type == "senior")
                    window.location = "/" + county.replace(" ", "-") + "-Senior";
                else if (type == "special")
                    window.location = "/" + county.replace(" ", "-") + "-Specials";
                else
                    window.location = "/" + county.replace(" ", "-") + "";
            }
            else {
                if (type == "all")
                    window.location = "/" + city.replace(" ", "-") + "-Township";
                else if (type == "affordable")
                    window.location = "/" + city.replace(" ", "-") + "-Township-Affordable";
                else if (type == "senior")
                    window.location = "/" + city.replace(" ", "-") + "-Township-Senior";
                else if (type == "special")
                    window.location = "/" + city.replace(" ", "-") + "-Township-Specials";
                else
                    window.location = "/" + city.replace(" ", "-") + "-Township";
            }
        }

        
                              
    </script>

    <%--<link rel="stylesheet" type="text/css" href="<%=ResolveUrl("~/css/homefinder.css")%>" />
    <link rel="Stylesheet" type="text/css" href="<%=ResolveUrl("~/css/AboutUs.css")%>" />--%>
    <link rel="stylesheet" type="text/css" href="<%=ResolveUrl("CSSHandler.ashx?file=css/AboutUs.css")%>" />
    <link rel="stylesheet" type="text/css" href="<%=ResolveUrl("CSSHandler.ashx?file=css/homefinder.css")%>" />
    <input id="Navigator" type="hidden" value="<%=_Navigator%>" />
    <input id="SCID" type="hidden" value="<%=this.Master.SID%>" />
    <input id="247URL" type="hidden" value="<%=this.Master._247URL%>" />
    <div style="width: 950px;">
        <div class="hfdivCommunitySearch">
            <div id="divTopPanel">
                <div>
                    <div style="width: 100%">
                        <div class="CommunityTopBanner">
                            <a href="http://www.bestrentnyc.com" style="text-decoration: none;">
                                <img id="imgTopBanner" runat="server" alt="" border="0" width="694" height="72" /></a>
                        </div>
                        <div class="CommunityTopSearchCriteria">
                            <div style="display: none;">
                                <div align="right" style="float: right; width: 240px; padding-right: 5px; color: Gray;
                                    text-align: right; font-family: Verdana; font-size: 10px;">
                                    <a href="#" onclick="history.go(-1);return false;" class="CommunitySearchCriteriaText"
                                        id="lnkBackToSearch">« Return to search result</a>
                                </div>
                                <div style="height: 3px; width: 240px; float: left;">
                                </div>
                                <div align="right" style="float: right; width: 240px; padding-right: 5px; color: Gray;
                                    text-align: right; font-family: Verdana; font-size: 10px;">
                                    <a href="<%=_Type%>" class="CommunitySearchCriteriaText" id="lnkNewSeach">« Start new
                                        search</a>
                                </div>
                                <div style="float: right; padding-right: 5px; padding-top: 10px;">
                                    <asp:DropDownList ID="ddlMoreAppartments" Width="240" runat="server" AutoPostBack="True">
                                    </asp:DropDownList>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="height: 9px; width: 100%; float: left;">
                    </div>
                    <%--<a href='<%=_googleMapLink %>' rel="lightbox" ><img src='<%=_googleMapLink %>' alt="" /> </a>--%>
                    <div class="CommunitySalesCenterHeader">
                        <div id="dvSCHeaderText" class="CommunitySalesCenterHeader1" aareasTag="SalesCenter__195">                            
                            <h1 class="CommunitySalesCenterHeaderText1" id="lblSalesCenterName" runat="server"
                                style="display: inline;">
                                <%= _commText %>
                            </h1>
                            
                        </div>
                        <div class="CommunitySalesCenterHeader2">
                            <div align="right" style="margin-top:10px;">
                                <asp:Panel ID="panHeaderLink" runat="server" />
                            </div>
                        </div>
                    </div>
                </div>
                <div style="height: 7px; width: 100%; float: left;">
                </div>
                <div style="width: 100%;">
                    <div align="left" style="float: left; width: 680px; padding-right: 5px;">
                        <span class="CommunityPhotoEnlargeText">Click to enlarge photos</span>
                    </div>
                    <div style="height: 10px;">
                    </div>
                    <div id="divCommunityTopLeftPanel">
                        <div class="CommunitySalesCenterGallery">
                            <uc1:wucMediaList ID="wucMediaListBestRent" runat="server" EnableViewState="true"
                                AutoPlay="0" NumberOfMedia="3" />
                        </div>
                        <div style="height: 7px; width: 100%; float: left;">
                        </div>
                        <div>
                            <div runat="server" id="lblContent" class="CommunitySalesCenterDetails">
                            </div>
                        </div>
                        <div style="height: 15px; width: 100%; float: left;">
                        </div>
                        <div class="CommunitySalesCenterDetailsTable">
                            <asp:DataGrid runat="server" ID="grdModels" AutoGenerateColumns="false" Width="100%"
                                ShowHeader="true" ItemStyle-BackColor="#FFFFFF" AlternatingItemStyle-BackColor="#f3f3f5"
                                OnItemDataBound="grdModels_ItemDataBound" AllowSorting="true" OnSortCommand="ExecuteSort">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="FLOOR PLAN" HeaderStyle-CssClass="CommunitygridItemHeader"
                                        HeaderStyle-Width="30%" HeaderStyle-Height="20px" ItemStyle-Height="30px">
                                        <ItemTemplate>
                                            <asp:HyperLink runat="server" CssClass="CommunitygridLink" NavigateUrl='<%# "FloorPlan.aspx?modelid=" + DataBinder.Eval(Container, "DataItem.ModelID") +"_"+ DataBinder.Eval(Container, "DataItem.Sales_CenterID") + "&SCID=" + this.Master.SID %>'
                                                ID="lblModelDescription" Text='<%# DataBinder.Eval(Container, "DataItem.ModelDescription")%>'></asp:HyperLink>
                                            <asp:HyperLink runat="server" CssClass="CommunitygridHiddenLink" ID="lblModel" Text='<%# DataBinder.Eval(Container, "DataItem.ModelDescription")%>'></asp:HyperLink>
                                            <asp:Label runat="server" CssClass="hfLabelBold" ID="lblModelName" Text=''></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="TYPE" HeaderStyle-CssClass="CommunitygridItemHeader"
                                        ItemStyle-HorizontalAlign="Center" HeaderStyle-Width="7%" SortExpression="HomeSeriesType">
                                        <HeaderStyle CssClass="CommunitygridItemHeader" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" CssClass="CommunitygridItemText" ID="lblModelType" Text='<%# DataBinder.Eval(Container, "DataItem.HomeSeriesType") %>'></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="BED" HeaderStyle-CssClass="CommunitygridItemHeader"
                                        ItemStyle-HorizontalAlign="Center" HeaderStyle-Width="4%" SortExpression="Bedrooms_No">
                                        <HeaderStyle CssClass="CommunitygridItemHeader" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" CssClass="CommunitygridItemText" ID="lblBedrooms_No" Text='<%# DataBinder.Eval(Container, "DataItem.Bedrooms_No") %>'></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="BATH" HeaderStyle-CssClass="CommunitygridItemHeader"
                                        ItemStyle-HorizontalAlign="Center" HeaderStyle-Width="4%" SortExpression="Baths_No">
                                        <HeaderStyle CssClass="CommunitygridItemHeader" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" CssClass="CommunitygridItemText" ID="lblBaths_No" Text='<%# DataBinder.Eval(Container, "DataItem.Baths_No") %>'></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="SQFT" HeaderStyle-CssClass="CommunitygridItemHeader"
                                        ItemStyle-HorizontalAlign="Center" HeaderStyle-Width="4%" SortExpression="Sqft">
                                        <HeaderStyle CssClass="CommunitygridItemHeader" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" CssClass="CommunitygridItemText" ID="lblSqft" Text='<%# DataBinder.Eval(Container, "DataItem.Sqft") %>'></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="RENT FROM" HeaderStyle-CssClass="CommunitygridItemHeader"
                                        ItemStyle-HorizontalAlign="Center" HeaderStyle-Width="12%" SortExpression="ModelPrice">
                                        <HeaderStyle CssClass="CommunitygridItemHeader" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" CssClass="hfHidden" ID="lblStartingPrice" Text='<%#DataBinder.Eval(Container, "DataItem.ModelPrice")%>'></asp:Label>
                                            <asp:Label runat="server" CssClass="CommunitygridItemText" ID="Label3" Text='<%# GetPrice(DataBinder.Eval(Container, "DataItem.ModelPrice")) %>'></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="SPECIALS" HeaderStyle-CssClass="CommunitygridItemHeader"
                                        ItemStyle-HorizontalAlign="Center" HeaderStyle-Width="17%">
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblSpecial" CssClass="CommunitygridItemText" Text='<%#DataBinder.Eval(Container, "DataItem.Specials")%>'></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                   
                                </Columns>
                            </asp:DataGrid>
                        </div>
                        <div style="height: 12px; width: 100%; float: left;">
                        </div>
                        <div class="CommunitySalesFacebookTwitterIntegration">
                            <div class="CommunitySalesFacebookTwitterIntegrationInner">
                                <a href="#" class="FacebookTwitterLink" id="sharebyTwitter" target="_blank" runat="server">
                                    <img alt="Share on Twitter" class="CommunitySharebyEmailAlign" src="<%=ResolveUrl("~/images/twitter_17.png")%>" />
                                    Share on Twitter</a>&nbsp &nbsp <a href="#" class="FacebookTwitterLink" id="sharebyFacebook"
                                        runat="server" target="_blank">
                                        <img alt="Share on Facebook" class="CommunitySharebyEmailAlign" src="<%=ResolveUrl("~/images/facebook_17.png")%>" />
                                        Share on Facebook</a>&nbsp &nbsp <a href="#" class="FacebookTwitterLink" id="sharebyEmail"
                                            target="_blank" runat="server">
                                            <img alt="Share on Email" class="CommunitySharebyEmailAlign" src="<%=ResolveUrl("~/images/email_17.png")%>" />
                                            Share by Email </a>
                            </div>
                        </div>
                    </div>
                    <div id="divSeparator">
                        &nbsp;
                    </div>
                    <div id="divCommunityTopRightPanel">
                        <div id="divCommunityTopRightPanelInner">
                            <div style="height: 7px; width: 100%; float: left;">
                            </div>
                            <div class="CommunityRightContactDetails">
                                <div align="left" style="padding-left: 10px;">
                                    <asp:Panel ID="panSpecials" runat="server" CssClass="CommunityhfChkRad" />
                                </div>
                                <div align="left" style="padding-left: 10px;">
                                    <asp:Panel ID="panPhoneoffHours" runat="server" />
                                </div>
                            </div>
                            <div style="height: 10px; width: 100%; float: left;">
                            </div>
                            <div class="CommunityRightCommunityAmenities">
                                <%--<div align="left" style="vertical-align: middle; padding-left: 5px;">
                                    <asp:Panel ID="panHomeSearch" runat="server" CssClass="CommunityhfChkRad" />
                                </div>--%>
                                <%--<div class="hfLabelBold" id="spAmenities" visible="true" runat="server">Community Amenities</div>--%>
                                <div id="dvCommAmenities" runat="server" class="hfOptionCell">
                                </div>
                                <%--<div class="hfLabelBold" id="spFeatures" visible="true" runat="server">Apartment Features</div>--%>
                                <div id="dvAptFeatues" class="hfOptionCell" runat="server">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <asp:HiddenField ID="hdnCurrentModelList" runat="server" Value="" />
            </div>
        </div>
    </div>
    <iframe id="ifrmSave" class="hfifrmSave displayNone" frameborder="no"></iframe>
    <div id="divGMap" class="divGMapPanel">
        <div class="divGMapPanelInner">
            <%--<img id="btnGMapCancel" src="<%=ResolveUrl("~/images/closelabel.png")%>" onclick="CloseGMapPopup('frmGMap');"
                class="GMapCancelButton" />--%>
            <div class="divGMapFrame" align="center">
                <iframe id="frmGMap" class="GmapFrame" name="frmGMap" src="/blank.htm" frameborder="0"
                    scrolling="no"></iframe>
            </div>
            <div class="GMapCancelButton">
                <asp:LinkButton ID="lnkGMapClose" runat="server" OnClientClick="CloseGMapPopup('frmGMap'); return false;"
                    EnableViewState="false" Text="CLOSE X" CssClass="PopupCancelButtonText"></asp:LinkButton>
            </div>
        </div>
    </div>
    <div id="divLocalMap" class="divLocalMapPanelNew">
        <div class="divLocalGMapPanelInner">
            <%--<img id="Img4" src="<%=ResolveUrl("~/images/closelabel.png")%>" onclick="CloseGMapPopup('divLocalMap');"
                class="divLocalMapCancelButtonNew" />--%>
            <div class="divGMapFrameNew" align="center">
                <%--<iframe id="frmLocalMap" class="GmapFrame" name="frmLocalMap" src="/blank.htm" frameborder="0"
                    scrolling="no" runat="server"></iframe>--%>
                <%--width="530px" height="415px"--%>
                <img id="imgLocalMap" class="LocalGmapImage" src="/blank.htm" alt="" />
            </div>
            <div id="dvLocalMapClose" class="divLocalMapCancelButtonNew">
                <asp:LinkButton ID="lnkLocalMapClose" runat="server" OnClientClick="CloseGMapPopup('divLocalMap'); return false;"
                    EnableViewState="false" Text="CLOSE X" CssClass="PopupCancelButtonText"></asp:LinkButton>
            </div>
        </div>
    </div>
    <div id="divGrayBGCommunity" class="hfGmapNone">
    </div>
    <div id="divNavigatorBar" class="hfdivNavigatorBar" style="display: none;">
    </div>
    <div id="divFloorPlan" class="divGMapPanelNew">
        <div class="divGMapPanelInner">
            <%--<img id="Img1" src="<%=ResolveUrl("~/images/closelabel.png")%>" onclick="CloseGMapPopup('frmFloorPlan');"
                class="GMapCancelButtonNew" />--%>
            <%--<img id="Img5" src="<%=ResolveUrl("~/images/labelclose_shade.png")%>" class="GMapCancelButtonNewShadeHidden" />--%>
            <div class="divGMapFrame" align="center">
                <iframe id="frmFloorPlan" class="GmapFrameNew" name="frmFloorPlan" src="/blank.htm"
                    frameborder="0" scrolling="no"></iframe>
            </div>
            <div id="dvFloorPlanClose" class="GMapCancelButtonNew">
                <asp:LinkButton ID="lnlFloorPlanClose" runat="server" OnClientClick="CloseGMapPopup('frmFloorPlan'); return false;"
                    EnableViewState="false" Text="CLOSE X" CssClass="PopupCancelButtonText"></asp:LinkButton>
            </div>
            <div id="dvFloorPlanCloseHide" class="GMapCancelButtonNewShadeHidden">
                <asp:LinkButton ID="LinkButton3" runat="server" OnClientClick="return false;" EnableViewState="false"
                    Text="CLOSE X" CssClass="PopupCancelButtonText"></asp:LinkButton>
            </div>
        </div>
    </div>
    <div id="divRegister" class="divRegister">
        <div class="divGMapPanelInner">
            <%--<img id="Img3" src="<%=ResolveUrl("~/images/closelabel.png")%>" onclick="CloseGMapPopup('frmRegister');"
                class="divRegisterCancelButtonNew" />--%>
            <div class="divGMapFrame" align="center">
                <iframe id="frmRegister" class="GmapFrameNew" name="frmRegister" src="/blank.htm"
                    frameborder="0" scrolling="no"></iframe>
            </div>
            <div class="divRegisterCancelButtonNew">
                <asp:LinkButton ID="LinkButton1" runat="server" OnClientClick="CloseGMapPopup('frmRegister'); return false;"
                    EnableViewState="false" Text="CLOSE X" CssClass="PopupCancelButtonText"></asp:LinkButton>
            </div>
        </div>
    </div>
    <div id="divImage" class="divImageNew">
        <div class="divImagePanelInner">
            <%--<img id="Img2" src="<%=ResolveUrl("~/images/closelabel.png")%>" onclick="CloseGMapPopup('divImage');"
                class="divImageCancelButtonNew" />--%>
            <div class="divGMapFrame" align="center">
                <div id="dvImageContent" style="width: 600px; top: 10px; position: relative; height: 400px;
                    vertical-align: middle;">
                    <uc1:wucContectRotator runat="server" ID="wucContentRotator1" MaskWidth="600" />
                </div>
            </div>
            <div class="divImageCancelButtonNew">
                 <%-- <asp:LinkButton ID="LinkButton2" runat="server" OnClientClick="CloseGMapPopup('divImage'); return false;"
                    EnableViewState="false" Text="CLOSE X" CssClass="PopupCancelButtonText"></asp:LinkButton>--%>
                <img id="Img2" alt="CLOSE X" src="<%=ResolveUrl("~/images/closelabel.gif")%>" onclick="CloseGMapPopup('divImage');" class="divImageCancelButtonNew" />
            </div>
        </div>
    </div>

    <script language="javascript" type="text/javascript">
        //document.body.style.overflowX = 'hidden';
        try {
            if ("<%=_Applynowpdffilepath%>" == "") {
                document.getElementById("lnkApplyNow").disabled = true;
            }
        }
        catch (err) { }
        try {
            if ("<%=_ModelIncludedFeatureFile%>" == "") {
                document.getElementById("lnkDownload").disabled = true;
            }
            if ("<%=_webUrl%>" == "http://") {
                document.getElementById("lblWebUrl").disabled = true;
            }
        }
        catch (err) { }
        function check(file) {
            if (file == "") {
                return false;
            }
        }
    </script>

</asp:Content>
