<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CommunityGMap.aspx.cs"
    Inherits="Aareas247Marketing.CommunityGMap" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
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
    
    <%--<link rel="stylesheet" type="text/css" href="css/homefinder.css" />
    <link rel="Stylesheet" type="text/css" href="css/AboutUs.css" />--%>
    <link rel="stylesheet" type="text/css" href="CSSHandler.ashx?file=css/homefinder.css" />    
    <link rel="stylesheet" type="text/css" href="CSSHandler.ashx?file=css/AboutUs.css" />      
    <input id="Navigator" type="hidden" value="<%=_Navigator%>" />  

</head>
<body id="pageBody" runat="server">
    <form id="form1" runat="server">
    <div id="divNavigatorBar" class="hfdivNavigatorBar" style="display: none;">
    </div>
    <div id="divMapBack" class="divCommunityGMapMainPanel">
        <%--<div class="divCommunityGMapPanelInner">--%>
            <div id="divLocation" class="hfdivLocation" style="display: none;">
            </div>
            <div id="divSelect" class="hfdivSelect">
            </div>
            <%--<img id="Img2" src="images/closelabel.png" onclick="CloseGMapPopup();" class="GMapCancelButton" />--%>
            <%--<div class="divCommunityGMapPanel">--%>
                <div id="gMap" class="divCommunityGMapInnerPanel">
                </div>
            <%--</div>--%>
        <%--</div>--%>
    </div>
    </form>
</body>
</html>
