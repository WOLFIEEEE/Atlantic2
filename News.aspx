<%@ Page Title="" Language="C#" MasterPageFile="~/CollectiveMain.Master" AutoEventWireup="true"
    CodeBehind="News.aspx.cs" Inherits="Aareas247Marketing.News" %>

<%@ MasterType TypeName="Aareas247Marketing.CollectiveMain" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">        
    <script type="text/javascript" language="javascript">

        function ShowNewsDetails(CallId) {

            if (document.getElementById('ctl00_ContentPlaceHolder1_hdnCallId').value == CallId) {
                hideAll();
            }
            else if (document.getElementById('grdNews_NewsText_div_' + CallId).style.display == "block") {
                document.getElementById('grdNews_NewsText_div_' + CallId).style.display = "none";
                //$(document).ready(function() {
                //    $("#grdNews_NewsText_div_" + CallId).slideToggle("slow");
                //    $(this).toggleClass("active"); return false;
                //});
                document.getElementById('newsHeadLine_' + CallId).className = "newsGridLinkItemText";
                document.getElementById('newsDate_' + CallId).className = "newsGridLinkItemText";
                document.getElementById('ctl00_ContentPlaceHolder1_hdnCallId').value = "0";
            }
            else {
                hideAll();
                //$(document).ready(function() {
                //    $("#grdNews_NewsText_div_" + CallId).slideToggle("slow");
                //    $(this).toggleClass("active"); return false;
                //});
                document.getElementById('grdNews_NewsText_div_' + CallId).style.display = "block";
                document.getElementById('newsHeadLine_' + CallId).className = "newsGridLinkItemTextBold";
                document.getElementById('newsDate_' + CallId).className = "newsGridLinkItemTextBold";
                document.getElementById('ctl00_ContentPlaceHolder1_hdnCallId').value = CallId;


                //document.getElementById('grdNews_NewsText_div_' + CallId).style.display = "block";
                //newsGridLinkItemTextBold

            }
            //document.getElementById('grdNews_NewsText_div_' + CallId).style.visibility =

        }

        function hideAll() {

            var CallId = document.getElementById('ctl00_ContentPlaceHolder1_hdnCallId').value;
            if (CallId != "0") {
                document.getElementById('grdNews_NewsText_div_' + CallId).style.display = "none"
                //$(document).ready(function() {
                //    $("#grdNews_NewsText_div_" + CallId).slideToggle("slow");
                //    $(this).toggleClass("active"); return false;                
                //});
                document.getElementById('newsHeadLine_' + CallId).className = "newsGridLinkItemText";
                document.getElementById('newsDate_' + CallId).className = "newsGridLinkItemText";
                document.getElementById('ctl00_ContentPlaceHolder1_hdnCallId').value = "0";
            }

        }


        function showInlineNewsImage(srcUrl) {

            document.getElementById("divGrayBGCommunity").className = "hfVisible";

            $("#divGrayBGCommunity").height(getCommunityPageSize()[1]);

            document.getElementById("imgPopup").src = srcUrl;
            showCommunityElement();
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


        function showCommunityElement() {
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
            myWidth = (myWidth / 2) - 310;
            myHeight = (myHeight / 2) - 220;

            document.getElementById('divNewsImage').style.left = myWidth + 'px';
            document.getElementById('divNewsImage').style.top = myHeight + 'px';
            //document.getElementById('divGMap').style.visibility = "visible";
            document.getElementById('divNewsImage').style.display = "block";
            //hideScrollBar();
        }




        function hideCommunityElement() {
            //window.frames['frmNewsImage'].location.href = "blank.htm";
            document.getElementById("imgPopup").src = "blank.htm";
            document.getElementById('divNewsImage').style.display = "none";

        }

        function CloseGMapPopup() {
            document.getElementById('divGrayBGCommunity').className = 'hfNone';
            hideCommunityElement();
        }

              
    
    </script>

    <input id="247URL" type="hidden" value="<%=_247URL%>" />
    <div style="width: 950px;">
        <div class="hfdivCommunitySearch">
            <div id="divTopPanel">
                <div>
                    <div>
                        <div class="CommunityTopBanner">
                           <a href="http://www.bestrentnyc.com" style="text-decoration:none;"> <img id="imgTopBanner" runat="server" border="0" alt="" /></a>
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
                    <div>
                        <div style="float: left; width: 948px; height: 100%; border-color: Gray; border-style: solid;
                            border-width: 1px;">
                            <div id="dvNews" style="padding-left: 10px; padding-top: 10px;">
                                <span class="AboutUsPhoneTextBold">News</span>
                            </div>
                            <div style="height: 8px; width: 100%; float: left;">
                            </div>
                            <img id="imgNewsEdit" alt="News" onclick="popupWindow();" src="images/Information_icon1.gif"
                                style="display: none; cursor: pointer;" />
                            <div style="padding-left: 10px; clear: both;">
                                <asp:DataGrid runat="server" ID="grdNews" AutoGenerateColumns="false" ShowHeader="false"
                                    ItemStyle-BackColor="#FFFFFF" CellSpacing="2" CellPadding="2" Width="935" OnItemDataBound="grdNews_ItemDataBound">
                                    <Columns>
                                        <asp:TemplateColumn HeaderText="News Date" HeaderStyle-CssClass="newsGridItemText"
                                            ItemStyle-VerticalAlign="Top">
                                            <ItemTemplate>
                                                <a id="newsDate_<%# DataBinder.Eval(Container, "DataItem.CallId") %>" class="newsGridLinkItemText"
                                                    onclick='<%# "ShowNewsDetails(" + DataBinder.Eval(Container, "DataItem.CallId") + ")" %>'>
                                                    <%#  DataBinder.Eval(Container, "DataItem.NewsDate", "{0:MM/dd/yyyy}")%></a>
                                            </ItemTemplate>
                                            <ItemStyle Width="100" HorizontalAlign="Left" />
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn ItemStyle-HorizontalAlign="Left">
                                            <ItemTemplate>
                                                <div id="grdNews_div_<%# DataBinder.Eval(Container, "DataItem.CallId") %>" style="position: relative;
                                                    text-align: left;">
                                                    <a id="newsHeadLine_<%# DataBinder.Eval(Container, "DataItem.CallId") %>" onclick='<%# "ShowNewsDetails(" + DataBinder.Eval(Container, "DataItem.CallId") + ")" %>'
                                                        class="newsGridLinkItemText">
                                                        <%#DataBinder.Eval(Container, "DataItem.HeadLine")%></a>
                                                </div>
                                                <div id="grdNews_NewsText_div_<%# DataBinder.Eval(Container, "DataItem.CallId") %>"
                                                    style="display: none; width: 820px;">
                                                    <table role="none">
                                                        <tr>
                                                            <td align="left" valign="top">
                                                                <div class="divNewsImageS" runat="server" id="dvNewsImage">
                                                                    <asp:Image runat="server" ID="imgNews" CssClass="NewsImageS" src='<%# DataBinder.Eval(Container, "DataItem.ThumbnailImageUrl") %>'
                                                                        Width="160px" Height="95px" />
                                                                    <asp:HiddenField ID="hdnImageUrl" runat="server" Value='<%# DataBinder.Eval(Container, "DataItem.ImageUrl") %>' />
                                                                </div>
                                                            </td>
                                                            <td width="5px">
                                                            </td>
                                                            <td valign="top">
                                                                <div class="NewsDetailsText" id="divNewsText" runat="server">
                                                                    <%# DataBinder.Eval(Container, "DataItem.NewsText")%>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </ItemTemplate>
                                            <ItemStyle />
                                        </asp:TemplateColumn>
                                    </Columns>
                                </asp:DataGrid>
                            </div>
                            <div style="height: 8px; width: 100%; float: left;">
                                <asp:HiddenField ID="hdnCallId" runat="server" Value="0" />
                                <asp:HiddenField ID="hdnFirstNewsId" runat="server" Value="0" />
                                <asp:HiddenField ID="hdnNewsFlagEdit" runat="server" Value="0" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="divGrayBGCommunity" class="hfGmapNone">
    </div>
    <div id="divNewsImage" class="divNewsImagePopup">
        <div class="divNewsImagePopupInner">
            <img id="Img4" src="images/closelabel.png" onclick="CloseGMapPopup();" class="divNewsImagePopupClose" />
            <div id="divImage" class="divGMapFrame" align="center">
                <%--<iframe id="frmNewsImage" class="GmapFrame" name="frmNewsImage" src="blank.htm" frameborder="0"
                    scrolling="no" runat="server"></iframe>--%>
                <img id="imgPopup" style="padding-top: 8px;" alt="" height="400" width="600" />
            </div>
        </div>
    </div>

    <script type='text/javascript'>        
        if (document.getElementById('ctl00_ContentPlaceHolder1_hdnNewsFlagEdit').value != 0) {
            document.getElementById('imgNewsEdit').style.display = 'block';
        }

        //document.body.style.overflowX = 'hidden';
//        if (document.getElementById('ctl00_ContentPlaceHolder1_hdnFirstNewsId').value != '0') {
//            var callid = document.getElementById('ctl00_ContentPlaceHolder1_hdnFirstNewsId').value;
//            document.getElementById('grdNews_NewsText_div_' + callid).style.display = 'block';
//            //$(document).ready(function() {
//            //    $("#grdNews_NewsText_div_" + callid).slideToggle("slow");
//            //    $(this).toggleClass("active"); return false;
//            //});
//            document.getElementById('newsHeadLine_' + callid).className = 'newsGridLinkItemTextBold';
//            document.getElementById('newsDate_' + callid).className = 'newsGridLinkItemTextBold';
//            document.getElementById('ctl00_ContentPlaceHolder1_hdnCallId').value = callid;
//        }

        function popupWindow() {
            //debugger;
            //var scid = document.getElementById('hfSID').value;
            //var rid = document.getElementById('hfModelId').value;
            var BackUrl = document.getElementById('247URL').value;
            var popWidth = 950;
            var popHeight = 700;
            var popX = (screen.width - popWidth) / 2;
            var popY = (screen.height - popHeight) / 2;
            var settings = "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=1,width=" + popWidth + ",height=" + popHeight + ", top=" + popY + ", left=" + popX + "";
            url = BackUrl + "/MediaCatalog/News.aspx";
            window.open(url, "News", settings);
        }
    
    </script>

</asp:Content>
