<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ContentRotator.ascx.cs"
    Inherits="Aareas247Marketing.wucs.ContentRotator" %>
<div id="PriviewContainer" style="height: 20px">
    <div id="lnkPrev" class="dvLightBoxPrevVisible"></div>
    <div id="lnkNext" class="dvLightBoxNextVisible"></div>
    <%--<div id="mouseP" style="position:absolute;height:30px;width:300px;background-color:White;"></div>--%>
    <img id="imgPreviewMain" alt="" src="" runat="server" />
    <div style="height: 5px;">
    </div>
    <div id="divCaption" style="font-family: Verdana; float:left; width:85%; font-size: 10pt; font-weight: bold;
        color: Gray; text-align: left;">
    </div>
</div>
