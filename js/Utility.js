//Home Finder Global Functions
// Check Browsers
var userAgent = navigator.userAgent.toLowerCase();
var is_opera = userAgent.indexOf('opera') != -1;
var is_saf =
	userAgent.indexOf('safari') != -1 ||
	navigator.vendor == 'Apple Computer, Inc.';
var is_webtv = userAgent.indexOf('webtv') != -1;
var is_ie =
	userAgent.indexOf('msie') != -1 && !is_opera && !is_saf && !is_webtv;
var is_ie4 = is_ie && userAgent.indexOf('msie 4.') != -1;
var is_moz = navigator.product == 'Gecko' && !is_saf;
var is_kon = userAgent.indexOf('konqueror') != -1;
var is_ns =
	userAgent.indexOf('compatible') == -1 &&
	userAgent.indexOf('mozilla') != -1 &&
	!is_opera &&
	!is_webtv &&
	!is_saf;
var is_ns4 = is_ns && parseInt(navigator.appVersion) == 4;
var is_regexp = window.RegExp ? true : false;
// DOM functions
var DOMtype = '';
if (document.getElementById) {
	DOMtype = 'std';
} else if (document.all) {
	DOMtype = 'ie4';
} else if (document.layers) {
	DOMtype = 'ns4';
}

// make an array to store cached locations of objects called by fetch_object
var Myobjects = new Array();

const focusableSelector = [
  "a[href]:not([tabindex='-1'])",
  "area[href]:not([tabindex='-1'])",
  "input:not([disabled]):not([tabindex='-1'])",
  "select:not([disabled]):not([tabindex='-1'])",
  "textarea:not([disabled]):not([tabindex='-1'])",
  "button:not([disabled]):not([tabindex='-1'])",
  "iframe:not([tabindex='-1'])",
  "[tabindex]:not([tabindex='-1'])",
  "[contentEditable=true]:not([tabindex='-1'])",
].join(",");

function isVisible(element) {
  const style = window.getComputedStyle(element);
  const rect = element.getBoundingClientRect();

  return (
    style.visibility !== "hidden" &&
    style.display !== "none" &&
    rect.width > 0 &&
    rect.height > 0
  );
}

function getFocusableElements(container) {
  return Array.from(container.querySelectorAll(focusableSelector)).filter(
    isVisible
  );
}

function trapFocus(container, elementToFocus = container) {
	var trapFocusHandlers = {};
	
  trapFocusHandlers.focusin = (event) => {
		var elements = getFocusableElements(container);
		var first = elements[0];
		var last = elements[elements.length - 1];
		if (
      event.target !== container &&
      event.target !== last &&
      event.target !== first
    )
      return;

    document.addEventListener("keydown", trapFocusHandlers.keydown);
  };

  trapFocusHandlers.focusout = function () {
    document.removeEventListener("keydown", trapFocusHandlers.keydown);
  };

  trapFocusHandlers.keydown = function (event) {
    var Elements = getFocusableElements(container);
    var First = Elements[0];
    var Last = Elements[Elements.length - 1];

    console.log(First, Last);

    if (event.code.toUpperCase() !== "TAB") return; // If not TAB key
    // On the last focusable element and tab forward, focus the first element.
    if (event.target === Last && !event.shiftKey) {
      event.preventDefault();
      First.focus();
    }

    //  On the first focusable element and tab backward, focus the last element.
    if (
      (event.target === container || event.target === First) &&
      event.shiftKey
    ) {
      event.preventDefault();
      Last.focus();
    }
  };

  document.addEventListener("focusout", trapFocusHandlers.focusout);
  document.addEventListener("focusin", trapFocusHandlers.focusin);

	container.setAttribute("tabindex", "-1");
	setTimeout(() => {
		container.focus();
	}, 1000);

  if (
    elementToFocus.tagName === "INPUT" &&
    ["search", "text", "email", "url"].includes(elementToFocus.type) &&
    elementToFocus.value
  ) {
    elementToFocus.setSelectionRange(0, elementToFocus.value.length);
  }
}

window.trapFocus = trapFocus;

// function to emulate document.getElementById
function fetch_object(idname, forcefetch) {
	if (forcefetch || typeof Myobjects[idname] == 'undefined') {
		switch (DOMtype) {
			case 'std':
				{
					Myobjects[idname] = document.getElementById(idname);
				}
				break;

			case 'ie4':
				{
					Myobjects[idname] = document.all[idname];
				}
				break;

			case 'ns4':
				{
					Myobjects[idname] = document.layers[idname];
				}
				break;
		}
	}
	return Myobjects[idname];
}

// function to set a cookie
function set_cookie(name, value, expires) {
	var argv = set_cookie.arguments;
	var argc = set_cookie.arguments.length;
	var path = argc > 3 ? argv[3] : null;
	var domain = argc > 4 ? argv[4] : null;
	var secure = argc > 5 ? argv[5] : false;
	var today = new Date();
	today.setTime(today.getTime());
	if (expires) {
		expires = expires * 1000 * 60 * 60 * 24;
	} else {
		expires = 1 * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date(today.getTime() + expires);
	document.cookie =
		name +
		'=' +
		escape(value) +
		'; expires=' +
		expires_date.toGMTString() +
		'; path=' +
		(path == null ? '/' : path) +
		(domain == null ? '' : '; domain=' + domain) +
		(secure == true ? '; secure' : '');
}

function fetch_cookie(check_name) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split(';');
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for (i = 0; i < a_all_cookies.length; i++) {
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split('=');

		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if (cookie_name == check_name) {
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if (a_temp_cookie.length > 1) {
				cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if (!b_cookie_found) {
		return null;
	}
}

// function to delete a cookie
function delete_cookie(name) {
	var expireNow = new Date();
	document.cookie =
		name + '=' + '; expires=Thu, 01-Jan-70 00:00:01 GMT' + '; path=/';
}

function setSelectOptions(the_form, the_select, do_check) {
	var selectObject = document.forms[the_form].elements[the_select];
	var selectCount = selectObject.length;

	for (var i = 0; i < selectCount; i++) {
		selectObject.options[i].selected = do_check;
	} // end for

	return true;
}

document.addEventListener('DOMContentLoaded', function () {
	console.log('DOM fully loaded and parsed!');

	$('.MoreLessLink').each(function () {
		$(this).attr('role', 'button');
		$(this).attr('tabindex', '0');
		$(this).keydown(function (e) {
			if (e.keyCode == 13) {
				e.preventDefault();
				$(this).click();
			}
		});
	});

	$('a.CommunityLinkText').each(function () {
		$(this).attr('role', 'link');
		$(this).attr('tabindex', '0');
		$(this).keydown(function (e) {
			if (e.keyCode == 13) {
				$(this).click();
			}
		});
	});

	$('form[action="./Tower-31"] table td a.CommunitygridHiddenLink').removeAttr(
		'aria-haspopus',
	);

	const $newDiv = $('<div class="dvInnerHerder" role="navigation"></div>');
	$('.dvHeader').append($newDiv);
	$('ul.dvMenu').appendTo($newDiv);

	$('ul.dvMenu').removeAttr('role');
	$('div.dvHeader').attr('role', 'banner');

	// $('ul.dvMenu li a[href="#"]').attr('aria-haspopup', 'true');

	$('div#dvSubMenu4 div').attr('role', 'list');
	$('#dvSubMenu4 div *').not('a').attr('role', 'listitem');
	$('div#dvSubMenu2 div').attr('role', 'list');
	$('div#dvSubMenu2 div *').not('a').attr('role', 'listitem');

	$('#dvBack6 a').attr('role', 'button');
	$('a[href="javascript:showInlineDisclaimerPopup()"]').attr('role', 'button');

	$('#divDisclaimer').attr({
		role: 'dialog',
		'aria-label': 'Legal disclaimer',
	});

	$('form[action="./Main.aspx"] .testclass h1').removeAttr('role');

	// $('#ctl00_dvFooter a').each(function () {
	// 	$(this).wrap('<span role="listitem"></span>');
	// });

	$('img[src*="BannerImageLarge/2__000001.jpg"]').attr('alt', '');

	$('img[src*="equal_housing_opportunity.jpg"]').attr(
		'alt',
		'Equal housing opportunities',
	);

	$('div.footer#ctl00_dvFooter')
		.find('a')
		.each(function () {
			const text = $(this)
				.text()
				.replace(/[\u00A0|]/g, '')
				.trim();
			$(this).attr('aria-label', text);
		});

	$('form[action="./nyc-rental-apartments"] table img').attr('alt', '');
	$('form[action="./nyc-rental-specials"] table img').attr('alt', '');

	$(
		'form[action="./nyc-rental-specials"] table, form[action="./nyc-rental-apartments"] table',
	).each(function () {
		if ($(this).find('caption').length === 0) {
			$(this).prepend(
				'<caption class="sr-only">Table shows Comparison of Apartment Listings by Location, Unit Type, and Pricing with Special Offers</caption>',
			);
		}
	});

	$('a#ctl00_ContentPlaceHolder1_GoogleMap').attr('role', 'button');

	$('span.AboutUsPhoneTextBold').attr({
		role: 'heading',
		'aria-level': '1',
	});

	$('form[action="./FAQ.aspx"] #copy h2').attr({
		role: 'heading',
		'aria-level': '1',
	});

	$('form[action="./FAQ.aspx"] #copy h1').attr({
		role: 'heading',
		'aria-level': '2',
	});

	$('.dvusefulllinks div[style="width:50%;float:left"]').attr('role', 'list');
	$('.dvusefulllinks div[style="width:50%;float:left"] .dropdownLink').attr(
		'role',
		'listitem',
	);

	$('img[src*="twitter_17.png"]').attr('alt', '');
	$('img[src*="facebook_17.png"]').attr('alt', '');
	$('img[src*="email_17.png"]').attr('alt', '');

	$('form[action="./Tower-31"] table a.CommunitygridLink').attr(
		'role',
		'button',
	);

	$('table').attr('bordercolor', '#92959B');

	$('.CommunitySalesCenterDetailsTable table').each(function () {
		if ($(this).find('caption').length === 0) {
			$(this).prepend(
				'<caption class="sr-only">Table shows different floor plans </caption>',
			);
		}
	});

	$('table a.CommunitygridLink').removeAttr('aria-haspopup');

	$('img[src*="printer_17.png"]').attr('alt', '');

	$('h1, h2, h3, h4, h5, h6').each(function () {
		const TEXT = $(this).text().trim();
		if (TEXT == '') {
			$(this).attr('role', 'none');
		}
	});

	$('.dvusefulllinks').find('div[style="width:50%;float:left"]').each(function () {
    	$('<h1>Heading Title</h1>').insertBefore($(this));
  	});

	// BES-SR-26-6011527 — Useful Links: external links must announce they
	// open in a new tab. Content comes from CMS WebTemplate, so hydrate here.
	$('.dvusefulllinks a[href]').each(function () {
		var $a = $(this);
		var href = $a.attr('href') || '';
		var isExternal = /^https?:\/\//i.test(href) &&
			href.indexOf(window.location.hostname) === -1;
		if (!isExternal) return;
		$a.attr('target', '_blank').attr('rel', 'noopener noreferrer');
		if (!$a.find('.sr-only').length) {
			$a.append('<span class="sr-only"> (opens in new window)</span>');
		}
	});

	$(".CommunityTopBanner a img").attr("alt", "Best Rent NYC.com banner");

	$('form[action="./Main.aspx"] div[aareastag="SalesCenter__187"] h3').each(function () {
    var newDiv = $('<div></div>').html($(this).html());
    $.each(this.attributes, function () {
      if (this.name !== "tagName") {
        newDiv.attr(this.name, this.value);
      }
    });
    $(this).replaceWith(newDiv);
	});

	$('form[action="./News.aspx"] table#ctl00_ContentPlaceHolder1_grdNews').attr("role", "list");
	$('form[action="./News.aspx"] table#ctl00_ContentPlaceHolder1_grdNews tbody').attr("role", "none");
	$('form[action="./News.aspx"] table#ctl00_ContentPlaceHolder1_grdNews tbody tr[style="background-color:White;"]').attr("role", "listitem");

	$('form[action="./Tower-31"] table th.CommunitygridItemHeader').attr("scope", "col");

	$("table a#aSC h1").attr({
		role: "heading",
		"aria-level": "2"
	});
	$("table h2.SearchGridPhoneInfo").attr("role", "none");

	$("a#ctl00_lnkDisclaimerClose").attr("role", "button");

	$(".a11y_rem .dropdowns a").removeAttr("href");
	$(".a11y_rem .dropdowns a").attr("role","none");

	$('.hfdivCommunitySearch').each(function () {
    var $container = $(this);
	$container.find('table tr td[align="left"]').each(function () {
      var headingText = $(this).find('div:nth-child(1) a h1').text().trim();
      $(this).find('a#aSCImage img').attr('alt', headingText);
    });
  	});

	$('h1, h2, h3, h4, h5, h6').each(function () {
		const content = $(this).html().trim();
  		const isEmpty = $(this).text().trim() === '';
  		const isOnlyBr = content === '<br>' || content === '<br/>' || content === '<br />';
	  	if (isEmpty || isOnlyBr) {
    		$(this).remove();
  		}
	});

	var $disclaimer = $('div.divDisclaimer');
    var $targetLink = $('a[href="javascript:showInlineDisclaimerPopup()"]');
    if ($disclaimer.length && $targetLink.length) {
        $disclaimer.insertAfter($targetLink);
    }

	var $footer = $('form[action="./main.aspx"] #ctl00_dvFooter');
  	var $ul = $('<ul></ul>');
	$footer.children().each(function () {
    	$ul.append($('<li></li>').append($(this)));
  	});
  	$footer.empty().append($ul);

	
	$("a#ctl00_ContentPlaceHolder1_lnkDownload").attr("href", "javascript:void(0)");
	$('[href="javascript:showInlineDisclaimerPopup()"], #dvBack6 a').click(function () {
		setTimeout(function () {
			$("#divDisclaimer").focus();
		},100);
		
	});	
	trapFocus(document.getElementById("divDisclaimer"));
});

