<%@ Page Language="C#" MasterPageFile="~/CollectiveMain.Master" AutoEventWireup="true"
    CodeBehind="Main.aspx.cs" Inherits="Aareas247Marketing.Main" %>

<%@ MasterType TypeName="Aareas247Marketing.CollectiveMain" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="divWidthFull testclass">
        <div style="position: relative">
            <h1 role="none">
            <a href="http://www.bestrentnyc.com" style="text-decoration: none;">
                <img id="imgBanner" runat="server" src="~/images/bestrentnyc_banner.jpg" alt="" enableviewstate="false"
                border="0" />
                </a>
            </h1>
            <div style="position: absolute; top: 90px; left: 300px; text-align: center;" aareastag="WebTemplate__173">
                <h1 style="text-align: center; font-family: Verdana; font-size: 10px;
                    font-weight: bold; color: black;">

                    <%= _BText %></h1>
            </div>
        </div>
        <div style="height: 10px;">
        </div>
        <ul class="item-list">
            <asp:Repeater runat="server" ID="rpSC">
                <ItemTemplate>
                    <li style="float: left; width: 225px; height: 457px; border-left: solid 2px #005faf;
                        border-right: solid 2px #005faf; border-bottom: solid 2px #005faf; vertical-align: top;">
                        <h2 style="background-color: #005faf; height: 17px; line-height: 17px; font-family: Verdana;
                            font-size: 14px; text-transform: uppercase; font-weight: bold; color: White;
                            text-align: center;">
                            <%#DataBinder.Eval(Container,"DataItem.Sales_CenterName")%>
                </h2>
                        <div sid='<%#DataBinder.Eval(Container,"DataItem.Sales_CenterId")%>' style="background-color: #005faf; height: 17px; line-height: 17px; font-family: Verdana;
                            font-size: 11px; text-transform: none; font-weight: bold; color: White;
                            text-align: center;" aareastag='<%#DataBinder.Eval(Container,"DataItem.aareasTagSCNameText")%>'>
                            
                                <%#DataBinder.Eval(Container, "DataItem.Sales_centerNameText")%>
                            
                        </div>
                        <div sid='<%#DataBinder.Eval(Container,"DataItem.Sales_CenterId")%>' style="width: 212px;
                            height: 298px; margin: 5px auto;" aareastag='<%#DataBinder.Eval(Container,"DataItem.aareasTagImage")%>'>
                            <a href='<%#DataBinder.Eval(Container,"DataItem.Sales_centerNevUrl")%>' style="text-decoration: none;">
                                <img alt='<%#DataBinder.Eval(Container,"DataItem.Sales_CenterName")%>' width="212" height="298" src='<%#DataBinder.Eval(Container,"DataItem.Sales_CenterImage")%>'
                                    border="0" />
                            </a>
                        </div>
                        <div sid='<%#DataBinder.Eval(Container,"DataItem.Sales_CenterId")%>' style="width: 212px;
                            margin: 5px auto; text-align: center; color: #8d8b8c; font-family: Verdana; font-size: 10px;
                            font-weight: bold;" aareastag='<%#DataBinder.Eval(Container,"DataItem.aareasTagText")%>'>
                            <%#DataBinder.Eval(Container,"DataItem.Sales_CenterText")%>
                        </div>
                    </li>
                </ItemTemplate>
            </asp:Repeater>
        </ul>
        <div style="clear:both">&nbsp;</div>
    </div>
</asp:Content>
