<%@ Page Language="C#" MasterPageFile="~/CollectiveMain.Master" AutoEventWireup="true"
    CodeBehind="Search.aspx.cs" Inherits="Aareas247Marketing.Search" %>

<%@ MasterType TypeName="Aareas247Marketing.CollectiveMain" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<script type="text/javascript">
    var __activeTooltipSid = null;
    var __lastTooltipTrigger = null;
    var __suppressSid = null;
    var __suppressTimer = 0;

    function dismissTooltip(restoreFocus) {
        var trigger = __lastTooltipTrigger;
        var hadSid = __activeTooltipSid;
        __activeTooltipSid = null;
        if (typeof tt_HideInit === 'function') tt_HideInit();
        else if (typeof UnTip === 'function') UnTip();
        if (restoreFocus && hadSid) {
            __suppressSid = String(hadSid);
            if (__suppressTimer) clearTimeout(__suppressTimer);
            __suppressTimer = setTimeout(function () { __suppressSid = null; }, 250);
            if (trigger && typeof trigger.focus === 'function') {
                try { trigger.focus(); } catch (e) {}
            }
        }
    }

    function findTriggerImgFromFocus(el) {
        if (!el || el.nodeType !== 1) return null;
        var hasShow = function (n) {
            return n && /ShowTipCommunity2\(/.test(n.getAttribute('onmouseover') || '');
        };
        if (el.tagName === 'IMG' && hasShow(el)) return el;
        if (el.tagName === 'A' && el.children) {
            for (var i = 0; i < el.children.length; i++) {
                if (el.children[i].tagName === 'IMG' && hasShow(el.children[i])) {
                    return el.children[i];
                }
            }
        }
        return null;
    }

    function extractSid(img) {
        var m = (img.getAttribute('onmouseover') || '').match(/ShowTipCommunity2\(\s*(\d+)\s*\)/);
        return m ? m[1] : null;
    }

    function positionTooltipAtTrigger(tip, trigger) {
        if (!tip || !trigger || !trigger.getBoundingClientRect) return;
        var rect = trigger.getBoundingClientRect();
        var sx = window.pageXOffset || document.documentElement.scrollLeft || 0;
        var sy = window.pageYOffset || document.documentElement.scrollTop || 0;
        var vw = window.innerWidth || document.documentElement.clientWidth;
        var tipW = tip.offsetWidth || 420;
        var tipH = tip.offsetHeight || 0;
        var left = rect.left + sx + (rect.width / 2) - (tipW / 2);
        var top = rect.top > tipH + 16
            ? (rect.top + sy - tipH - 8)
            : (rect.bottom + sy + 8);
        var maxLeft = vw + sx - tipW - 8;
        var minLeft = sx + 8;
        if (left > maxLeft) left = maxLeft;
        if (left < minLeft) left = minLeft;
        tip.style.left = left + 'px';
        tip.style.top = top + 'px';
    }

    function bindCommunityTooltipInteractions() {
        document.addEventListener('focusin', function (event) {
            var img = findTriggerImgFromFocus(event.target);
            if (!img) return;
            var sid = extractSid(img);
            if (!sid) return;
            ShowTipCommunity2(sid, true, img);
        });

        document.addEventListener('focusout', function () {
            setTimeout(function () {
                var tip = document.getElementById('WzTtDiV');
                if (!tip) return;
                var active = document.activeElement;
                if (active === tip || tip.contains(active)) return;
                if (active && findTriggerImgFromFocus(active)) return;
                dismissTooltip();
            }, 120);
        });
    }

    function ShowTipCommunity2(sid, keyboardTriggered, triggerImg) {
        var tipSource = document.getElementById('dvToolTip_' + sid);
        if (!tipSource) return false;
        if (String(__suppressSid) === String(sid)) return false;
        if (String(__activeTooltipSid) === String(sid) && document.getElementById('WzTtDiV')) {
            return true;
        }
        if (__activeTooltipSid !== null && typeof tt_HideInit === 'function') tt_HideInit();

        __activeTooltipSid = sid;
        if (document.activeElement && document.activeElement !== document.body) {
            __lastTooltipTrigger = document.activeElement;
        }

        var tipContent = '<div style="overflow:visible;padding-right:6px;">' +
            tipSource.innerHTML + '</div>';

        var shown = Tip(
            tipContent,
            WIDTH, 420, BGCOLOR, '#FFFFFF', BORDERCOLOR, '#dcdddf',
            ABOVE, true, JUMPHORZ, true, PADDING, 25,
            FOLLOWMOUSE, false, STICKY, true, CLICKCLOSE, true
        );

        if (keyboardTriggered) {
            var img = triggerImg || findTriggerImgFromFocus(document.activeElement);
            var doPosition = function () {
                var tip = document.getElementById('WzTtDiV');
                if (tip && img) positionTooltipAtTrigger(tip, img);
            };
            doPosition();
            setTimeout(doPosition, 0);
            if (window.requestAnimationFrame) requestAnimationFrame(doPosition);
        }

        setTimeout(function () {
            var tip = document.getElementById('WzTtDiV');
            if (!tip) return;
            tip.setAttribute('tabindex', '0');
            tip.onmouseleave = function () { dismissTooltip(); };
            tip.onkeydown = function (event) {
                event = event || window.event;
                var key = event.key || event.keyCode;
                if (key === 'Escape' || key === 'Esc' || key === 27) {
                    dismissTooltip(true);
                    if (event.preventDefault) event.preventDefault();
                    return false;
                }
            };
        }, 0);

        return shown;
    }

    document.addEventListener('DOMContentLoaded', function () {
        bindCommunityTooltipInteractions();
        var onEsc = function (event) {
            event = event || window.event;
            var key = event.key || event.keyCode;
            if (key === 'Escape' || key === 'Esc' || key === 27) dismissTooltip(true);
        };
        document.addEventListener('keydown', onEsc, true);
        window.addEventListener('keydown', onEsc, true);
    });
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
