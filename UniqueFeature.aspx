<%@ Page Language="C#" MasterPageFile="~/CollectiveMain.Master" AutoEventWireup="true" CodeBehind="UniqueFeature.aspx.cs" Inherits="Aareas247Marketing.UniqueFeature" %>

<%@ MasterType TypeName="Aareas247Marketing.CollectiveMain" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div style="width: 950px;">
        <div class="hfdivCommunitySearch">
            <div id="divTopPanel">
                <div>
                    <div>
                        <div class="CommunityTopBanner">
                            <a href="http://www.bestrentnyc.com" style="text-decoration: none;">
                                <img id="imgTopBanner" runat="server" border="0" alt="BestRentNYC.com" /></a>
                        </div>
                        <div class="NewsTopSearchCriteria">
                            <div align="right" style="float: right; padding-right: 10px; color: rgb(73, 73, 73); text-align: right;
                                font-family: Verdana; font-size: 10px;">
                            </div>
                            <div style="float: left; padding-left: 10px; padding-top: 25px; display: none;">
                                <asp:DropDownList ID="ddlMoreAppartments" Width="240" CssClass="DropDownStyle" runat="server"
                                    AutoPostBack="True">
                                </asp:DropDownList>
                            </div>
                        </div>
                    </div>
                    <div style="height: 9px; width: 100%; float: left;">
                    </div>
                    <div>
                        <h1 class="sr-only">Unique features</h1>
                        <div id="dvFAQText" class="a11y_rem" runat="server" style="float: left; width: 948px; height: 100%;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

