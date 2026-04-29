<%@ Page Language="C#" MasterPageFile="~/CollectiveMain.Master" AutoEventWireup="true"
    CodeBehind="Main.aspx.cs" Inherits="Aareas247Marketing.Main" %>

<%@ MasterType TypeName="Aareas247Marketing.CollectiveMain" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="divWidthFull testclass">
        <div style="position: relative">
            <h1 style="position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0;">
                BestRentNYC Rental Apartments
            </h1>
            <div>
            <a href="http://www.bestrentnyc.com" style="text-decoration: none;">
                <img id="imgBanner" runat="server" src="~/images/bestrentnyc_banner.jpg" alt="BestRentNYC" enableviewstate="false"
                border="0" />
                </a>
            </div>
            <div style="position: absolute; top: 90px; left: 300px; text-align: center;" aareastag="WebTemplate__173">
                <div style="text-align: center; font-family: Verdana; font-size: 10px;
                    font-weight: bold; color: black;">

                    <%= _BText %></div>
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
    <script type="text/javascript">
        (function () {
            function normalizeCommunityHeadings() {
                // Keep one heading per community card (the card title). Any
                // headings coming from CMS body text are demoted to regular
                // blocks so screen readers announce each line naturally,
                // without exposing them in heading navigation.
                var nestedHeadings = document.querySelectorAll('.item-list li div[sid] h2, .item-list li div[sid] h3');
                for (var i = 0; i < nestedHeadings.length; i++) {
                    var heading = nestedHeadings[i];
                    var demoted = document.createElement('div');
                    var computed = window.getComputedStyle(heading);

                    demoted.innerHTML = heading.innerHTML;
                    demoted.className = heading.className || '';
                    demoted.style.cssText = heading.style.cssText || '';

                    // Preserve computed heading typography/spacing so visual
                    // layout does not shift when switching from h2/h3 to div.
                    demoted.style.display = 'block';
                    demoted.style.fontFamily = computed.fontFamily;
                    demoted.style.fontSize = computed.fontSize;
                    demoted.style.fontWeight = computed.fontWeight;
                    demoted.style.lineHeight = computed.lineHeight;
                    demoted.style.letterSpacing = computed.letterSpacing;
                    demoted.style.textTransform = computed.textTransform;
                    demoted.style.textAlign = computed.textAlign;
                    demoted.style.color = computed.color;
                    demoted.style.marginTop = computed.marginTop;
                    demoted.style.marginBottom = computed.marginBottom;
                    demoted.style.marginLeft = computed.marginLeft;
                    demoted.style.marginRight = computed.marginRight;

                    heading.parentNode.replaceChild(demoted, heading);
                }
            }

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', normalizeCommunityHeadings);
            } else {
                normalizeCommunityHeadings();
            }
        })();
    </script>
</asp:Content>
