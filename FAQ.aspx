<%@ Page Language="C#" MasterPageFile="~/CollectiveMain.Master" AutoEventWireup="true"
    CodeBehind="FAQ.aspx.cs" Inherits="Aareas247Marketing.FAQ" %>

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
                            <div align="right" style="float: right; padding-right: 10px; color: Gray; text-align: right;
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
                        <div id="dvFAQText" runat="server" class="dvFAQ" style="float: left; width: 948px; height: 100%;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript">
        // BES-SR-26-5825488 / BES-SR-26-8300860 — FAQ semantic structure.
        (function () {
            var copy = document.getElementById('copy');
            if (!copy) return;

            function swap(el, tag, cls) {
                var n = document.createElement(tag);
                n.className = cls;
                n.innerHTML = el.innerHTML;
                el.parentNode.replaceChild(n, el);
            }

            var pageHead = copy.querySelector('h2');
            copy.querySelectorAll('h1').forEach(function (q) {
                swap(q, 'h2', 'faq-question-heading');
            });
            if (pageHead) swap(pageHead, 'h1', 'faq-page-heading');

            if (copy.querySelector('ul.faq-jump-links')) return;
            var links = copy.querySelectorAll(':scope > a[href^="#q"]');
            if (!links.length) return;

            var ul = document.createElement('ul');
            ul.className = 'faq-jump-links';
            links.forEach(function (a) {
                var li = document.createElement('li');
                li.appendChild(a.cloneNode(true));
                ul.appendChild(li);
            });
            copy.insertBefore(ul, links[0]);
            links.forEach(function (a) {
                var n = a.nextSibling;
                while (n && (
                    (n.nodeType === 1 && n.tagName === 'BR') ||
                    (n.nodeType === 3 && /^[\s\u00A0]*$/.test(n.nodeValue))
                )) {
                    var nx = n.nextSibling;
                    n.parentNode.removeChild(n);
                    n = nx;
                }
                a.parentNode.removeChild(a);
            });
        })();
    </script>
</asp:Content>
