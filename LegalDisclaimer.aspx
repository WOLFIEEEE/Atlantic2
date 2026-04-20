<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="LegalDisclaimer.aspx.cs"
    Inherits="Aareas247Marketing.LegalDisclaimer" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Legal Disclaimer</title>
    <link rel="stylesheet" type="text/css" href="css/Main.css" />
</head>
<body >
    <form id="form1" runat="server">
    <input id="247URL" type="hidden" value="<%=_247URL%>" />    
    <input id="SCID" type="hidden" value="<%=SID%>" />
    <div>
        
        <div id="dvDisclamer" style="font-family: Verdana; font-size: 8pt; color: Gray;">
            <img id="imgEdit" alt="Legal Disclaimer" onclick="popupWindow();" src="images/Information_icon.gif"
                style="display: none; cursor: pointer;" />
            <div id="lblContent" runat="server" aareasTag="WebTemplate__179" style="text-align: left;">
            </div>
        </div>
        <asp:HiddenField ID="hfCallId" runat="server" Value="0" />
        <asp:HiddenField ID="hfSID" runat="server" Value="0" />
        <asp:HiddenField ID="hdnFlagEdit" runat="server" Value="0" />
    </div>

    <script language="javascript" type="text/javascript">

        if (document.getElementById('hdnFlagEdit').value != 0) {
            document.getElementById('imgEdit').style.display = 'block';
        }

        function popupWindow() {
            var scid = document.getElementById('hfSID').value;
            var rid = document.getElementById('hfCallId').value;
            var BackUrl = document.getElementById('247URL').value;
            var popWidth = 1000;
            var popHeight = 800;
            var popX = (screen.width - popWidth) / 2;
            var popY = (screen.height - popHeight) / 2;
            var settings = "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=1,width=" + popWidth + ",height=" + popHeight + ", top=" + popY + ", left=" + popX + "";
            url = BackUrl + "/MediaCatalog/MediaDetails.aspx?Module=WebTemplate&rid=" + rid + "&scid=" + scid + "&MediaTypeId=179";
            window.open(url, "Media", settings);
        }
    
    </script>

    </form>
</body>
</html>
