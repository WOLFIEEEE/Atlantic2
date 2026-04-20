<%@ Page Language="C#" MasterPageFile="~/CollectiveMain.Master" AutoEventWireup="true"
    CodeBehind="Search.aspx.cs" Inherits="Aareas247Marketing.Search" %>

<%@ MasterType TypeName="Aareas247Marketing.CollectiveMain" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<script type="text/javascript">
    function ShowTipCommunity2(sid) {
        return Tip(document.getElementById('dvToolTip_' + sid).innerHTML, WIDTH, 420, BGCOLOR, '#FFFFFF', BORDERCOLOR, '#dcdddf', ABOVE, true, JUMPHORZ, true, PADDING, 25);
    }
</script>
  <div style="width: 950px;">
        <div class="hfdivCommunitySearch">
            <div id="divTopPanel">
                <div>
                    <div>
                        <div class="CommunityTopBanner">
                            <h1 role="none" style="margin: 0;">     <a href="http://www.bestrentnyc.com" style="text-decoration:none;"> <img id="imgTopBanner" runat="server" border="0" alt="best rent nyc" /></a></h1>
                        </div>
                        <div class="NewsTopSearchCriteria">
                            <div align="right" style="float: right; padding-right: 10px; color: Gray; text-align: right;
                                font-family: Verdana; font-size: 10px;">                                
                            </div>
                            <div style="float: left; padding-left: 10px; padding-top: 25px; display:none;">
                                <asp:DropDownList ID="ddlMoreAppartments" Width="240" CssClass="DropDownStyle" runat="server"
                                    AutoPostBack="True">
                                </asp:DropDownList>
                            </div>
                        </div>
                    </div>
                    <div style="height: 9px; width: 100%; float: left;">
                    </div>
                    <div style="clear:both;">
                        <%= _sbContent.ToString() %>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
