<%@ Page Language="C#" MasterPageFile="~/CollectiveMain.Master" AutoEventWireup="true"
    CodeBehind="Login.aspx.cs" Inherits="Aareas247Marketing.Login" Title="The Collective World" %>

<%@ MasterType TypeName="Aareas247Marketing.CollectiveMain" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link rel="Stylesheet" type="text/css" href="<%=ResolveUrl("~/css/AboutUs.css")%>" />
    <div style="width: 975px;">
        <div class="hfdivMyAccount">
            <div id="divTopPanel">
                <div>
                    <div>
                        <div class="CommunityTopBanner">                           
                            <a href="http://www.bestrentnj.com" style="text-decoration:none;"><img id="imgTopBanner" runat="server" border="0" alt="" width="694" height="72" /></a>
                        </div>
                        <div style="float: right; width: 28%; height: 66px; padding-top:5px;background-color:#dcddde;">
                            <div align="right" style="float: right; width: 100%; padding-right: 5px;">
                                <a href="/all-nj-apartments" class="CommunitySearchCriteriaText" id="lnkSeach">« Start new search &nbsp;</a>
                            </div>
                            <div style="height: 5px;">
                            </div>
                        </div>
                    </div>
                    <div style="height: 9px; width: 100%; float: left;">
                    </div>
                    <div>
                        <iframe id="frContent" name="frContent" height="614px" frameborder="0" width="975px"
                            src="<%=URL247%>"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
