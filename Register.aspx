<%@ Page Language="C#" MasterPageFile="~/CollectiveMain.Master" AutoEventWireup="true"
    CodeBehind="Register.aspx.cs" Inherits="Aareas247Marketing.Register" Title="The Collective World - Contact Us" %>

<%@ MasterType TypeName="Aareas247Marketing.CollectiveMain" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <script type="text/javascript">var centerLatitude = <%=_GoogleMapCenterLatitude%>, centerLongitude = <%=_GoogleMapCenterLongitude%>, startZoom = <%=_GoogleMapStartZoom%>;</script>

    <script src="http://maps.google.com/maps?file=api&amp;v=2&amp;key=<%=_GoogleMapsApiKey%>"
        type="text/javascript"></script>

    <script language="javascript" src="js/labeledmarker.js" type="text/javascript"></script>

    <script language="javascript" src="js/markermanager.js" type="text/javascript"></script>

    <script language="javascript" src="js/mapiconmaker.js" type="text/javascript"></script>

    <script language="javascript" src="js/Utility.js" type="text/javascript"></script>

    <script language="javascript" src="js/Communities.js" type="text/javascript"></script>
<script language="javascript" src="js/EWindow.js" type="text/javascript"></script>
    <link rel="Stylesheet" type="text/css" href="css/EWindow.css" />
    <input id="Navigator" type="hidden" value="<%=_Navigator%>" />
    <%--<link rel="stylesheet" type="text/css" href="css/homefinder.css" />
    <link rel="Stylesheet" type="text/css" href="css/AboutUs.css" />--%>
    <link rel="stylesheet" type="text/css" href="CSSHandler.ashx?file=css/homefinder.css" />    
    <link rel="stylesheet" type="text/css" href="CSSHandler.ashx?file=css/AboutUs.css" />  
    <div style="width: 950px;">
        <div class="hfdivCommunitySearch">
            <div id="divTopPanel">
                <div>
                    <div>
                        <div class="CommunityTopBanner">
                            <a href="http://www.bestrentnyc.com" style="text-decoration: none;">
                                <img id="imgTopBanner" runat="server" border="0" src="images/community_banner.jpg"
                                    alt="BestRentNYC.com" /></a>
                        </div>
                        <div class="CommunityTopSearchCriteria">                            
                            <div align="right" style="float: right; width: 240px; padding-right: 5px; color: Gray;
                                text-align: right; font-family: Verdana; font-size: 10px;">
                               
                            </div>
                            <div style="height: 5px;">
                            </div>
                        </div>
                    </div>
                    <div style="height: 9px; width: 100%; float: left;">
                    </div>
                    <div>
                        <div style="float: left; width: 49%; height: 1000px; border-color: Gray; border-style: solid;
                            border-width: 1px;">
                            <div style="padding-left: 10px; padding-top: 10px;">
                                <h1 class="AboutUsPhoneTextBold" style="margin: 0; padding: 0; display: inline-block;">Contact Us</h1>
                            </div>
                            <div style="height: 8px; width: 100%; float: left;">
                            </div>
                            <div style="padding-left: 10px;">
                                <h2 class="AboutUsDetailsText" style="margin: 0; padding: 0; display: inline-block;">Register</h2>
                            </div>
                            <div style="padding-left: 10px; padding-right: 10px; margin-top: 6px;">
                                <p id="registerFormHelp" class="AboutUsDetailsText" style="margin: 0 0 8px 0;">
                                    Complete all required fields marked with * and use Submit at the end of the form.
                                  </p>
                            </div>
                            <div style="height: 8px; width: 100%; float: left;">
                            </div>
                            <div align="center" style="padding-left: 10px; height: 900px; width: 450px;">
                                <iframe id="frContent" name="frContent"
                                    title="Registration form"
                                    aria-label="Registration form"
                                    aria-describedby="registerFormHelp"
                                    lang="en"
                                    align="middle" scrolling="no"
                                    style="position: relative; width: 100%; height: 95%;"
                                    frameborder="0"
                                    src="https://bestrentnyc.247salescenter.com/register.aspx?EditMode=0&amp;SC=76&amp;RF=1&amp;PW=1"></iframe>
                            </div>
                        </div>
                        <div style="float: right; width: 49%; height: 1000px; border-color: Gray; border-style: solid;
                            border-width: 1px;">
                            <div align="left" style="padding-left: 10px; padding-top: 10px; " class="AboutUsDetailsText" aareasTag="WebTemplate__196">
                                <%= _LeftContentText %>
                            </div>
                            <div style="vertical-align: bottom; width: 445px; height: 420px; padding-left: 10px;
                                padding-top: 10px;">
                                <div class="divRegisterGMapPanelInner">
                                    <div id="divLocation" class="hfdivLocation" style="display: none;">
                                    </div>
                                    <div id="divSelect" class="hfdivSelect">
                                    </div>
                                    <div id="gMap" style="vertical-align: bottom; height: 99%; width: 100%;">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="divNavigatorBar" class="hfdivNavigatorBar" style="display: none;">
    </div>
</asp:Content>
