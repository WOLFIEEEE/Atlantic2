//Master Page Button Color ----------------------------------------------------------
	function ChangeFC(tbl,o,selected) {

	    var tbl = document.getElementById(tbl);

	    if (tbl.rows.length > 0 && tbl.rows[0].cells.length > 0) {
	        for (var i = 0; i < tbl.rows[0].cells.length; i++) {
	            tbl.rows[0].cells[i].childNodes[0].className = "MenuA";
	        }
	    }
	    o.className = selected;
	}

	function ChangeFCNew(div, o, selected) {
//	    var div = document.getElementById(div);
//	    if (div) {
//	        if (div.childNodes.length > 0) {
//	            for (var i = 0; i < div.childNodes.length; i++) {
//	                div.childNodes[i].className = "MenuA";
//	             }
//	        }
//	    }
//        if(o)o.className = selected;
	}
// Photo Gallery Blend image i to the new image newsrc ------------------------------------------
    function cpBlend(i, newsrc)
    {	 
        i_old=document.getElementById("ctl00_ContentPlaceHolder1_oMainImage_old"); 
        if (navigator.appName == "Netscape")
        {
            i_old.src = i.src;
            if (i_old.src.substring(i_old.src.length,i_old.src.length-13) == "broker_bg.gif") 
                i_old.style.visibility = 'hidden';
            else
                i_old.style.visibility = 'visible';
                
            i.src = newsrc;
            myBlendTrans(1.0,newsrc);   
        }
        else if (navigator.appName == "Microsoft Internet Explorer")
        {
            i_old.style.visibility = 'hidden';
            
	        i.filters.blendTrans.Apply();
	        i.src = newsrc;
	        i.filters.blendTrans.Play()
	    }
    }

    function myBlendTrans(opacity,newsrc)
    {
        i=document.getElementById("ctl00_ContentPlaceHolder1_oMainImage");
        i_old=document.getElementById("ctl00_ContentPlaceHolder1_oMainImage_old");
        
        i.style.opacity=1-opacity;
        i_old.style.opacity=opacity;
        
        if (opacity>=0 && opacity<=1.0)
        {
            opacity-=0.07
            var aa=window.setTimeout("myBlendTrans(" + opacity + ",'" + newsrc+ "')" ,1);  
        }
        else
        {
            i.style.opacity=1;
            i_old.style.opacity=0;    
        }
    }

//	Rent Own Tab -----------------------------------------------------------------------
    function showOwn()
    {
        var SC_Rent = document.getElementById("ctl00_ContentPlaceHolder1_SC_Rent");
        SC_Rent.style.display = "none";
        SC_Rent.style.position = "absolute";
        SC_Rent.style.left = "0";

    
        var SC_Own = document.getElementById("ctl00_ContentPlaceHolder1_SC_Own");
        SC_Own.style.display = "block";
        SC_Own.style.position = "absolute";
        SC_Own.style.left = "0";
        
        document.getElementById("aOwn").style.color = '#efb218';
        document.getElementById("aRent").style.color = '#ffffff';
    }
    
    function showRent()
    {
        var SC_Own = document.getElementById("ctl00_ContentPlaceHolder1_SC_Own");
        SC_Own.style.display = "none";
        SC_Own.style.position = "absolute";
        SC_Own.style.left = "0";
        
        var SC_Rent = document.getElementById("ctl00_ContentPlaceHolder1_SC_Rent");
        SC_Rent.style.display = "block";
        SC_Rent.style.position = "absolute";
        SC_Rent.style.left = "0";
        
        document.getElementById("aRent").style.color = '#efb218';
        document.getElementById("aOwn").style.color = '#ffffff';
    }
    function ctl00_ContentPlaceHolder1_wucPhotoGallery_onImageClick(ID)
    {
        var tag = document.getElementById("ctl00_ContentPlaceHolder1_wucPhotoGallery_txt" + ID).value;
        window.location = tag;
    }	




console.log("A11y code");
 

setTimeout(function() {
    // Code to execute after the delay
    console.log("Delayed code executed after 2 seconds");
    const image = document.getElementById("ctl00_ContentPlaceHolder1_imgBanner");

    if (image) {
        image.alt = "Best Rent NYC banner";
    } else {
        console.log("Element not found");
    }
    var gridItemHeaders = document.querySelectorAll('.gridItemHeader:first-child');
gridItemHeaders.forEach(function(header) {
    header.innerHTML += ' CONTACT DETAILS';
    
});
// Find all elements with the class .SearchGridSCInfo
const searchGridSCInfos = document.querySelectorAll('.SearchGridSCInfo');

// Iterate through each element
searchGridSCInfos.forEach(searchGridSCInfo => {
  // Create a new div element
  const newDiv = document.createElement('div');

  // Copy the class attribute from the original element to the new div
  newDiv.className = searchGridSCInfo.className;

  // Copy the inner HTML content from the original element to the new div
  newDiv.innerHTML = searchGridSCInfo.innerHTML;

  // Replace the original element with the new div
  searchGridSCInfo.parentNode.replaceChild(newDiv, searchGridSCInfo);
});
// BES-SR-26-* (rental list pages) — these patches must re-run whenever
// AjaxPanelB / AjaxPanelC re-populate, so wrap them as one idempotent
// function and trigger from both an initial delay and a MutationObserver.
window.__applyA11yToRentalTable = function () {
    var SR_ONLY = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';

    // BES-SR-26-5142933 / BES-SR-26-9256154 — every rental-list view
    // (HomeSearch.aspx with /nyc-rental-apartments, /nyc-rental-specials,
    // and the NJ variants) needs exactly one document H1. Inject a
    // visually-hidden one derived from the URL slug so AT users have a
    // primary heading regardless of which mode the layout is in. Idempotent.
    if (!document.getElementById('a11y-page-h1')) {
        var ACRONYMS = { nyc: 'NYC', nj: 'NJ', faq: 'FAQ', llc: 'LLC' };
        var slug = (window.location.pathname.match(/[^/]+$/) || [''])[0]
            .toLowerCase()
            .replace(/\.aspx$/i, '');
        // Only treat URL-style hyphenated slugs as page titles; the bare
        // ASPX filename (e.g. "HomeSearch") falls back to the default.
        var pageTitle = 'Rental Communities';
        if (slug.indexOf('-') !== -1) {
            pageTitle = slug
                .split('-')
                .filter(Boolean)
                .map(function (w) {
                    return ACRONYMS[w] || (w.charAt(0).toUpperCase() + w.slice(1));
                })
                .join(' ');
        }
        var mount = document.getElementById('divTopPanel') ||
            document.querySelector('.divWidthFull') ||
            document.body;
        if (mount) {
            var h1 = document.createElement('h1');
            h1.id = 'a11y-page-h1';
            h1.textContent = pageTitle;
            h1.style.cssText = SR_ONLY;
            mount.insertBefore(h1, mount.firstChild);
        }
    }

    // BES-SR-26-6945332 / BES-SR-26-1559629 — replace obsolete `summary`
    // with a visually-hidden, well-formed <caption>. Scope strictly to the
    // rental grid: a table that has rental header cells AND isn't a
    // presentation/list table. (Earlier this was matching news tables and
    // their inner layout tables because they share the #divTopPanel id.)
    var RENTAL_CAPTION = 'Apartment communities with contact information, available unit sizes, starting rents, and current specials.';
    document.querySelectorAll('table').forEach(function (t) {
        var role = (t.getAttribute('role') || '').toLowerCase();
        var isRentalGrid = !!t.querySelector('td.gridItemHeader, th.gridItemHeader, td.CommunitygridItemHeader, th.CommunitygridItemHeader');

        // Clean up captions previously inserted onto the wrong tables.
        if (!isRentalGrid) {
            var existing = t.querySelector(':scope > caption');
            if (existing && existing.textContent.trim() === RENTAL_CAPTION) {
                existing.parentNode.removeChild(existing);
            }
            return;
        }

        // Don't caption tables explicitly marked as not-a-data-table.
        if (role === 'presentation' || role === 'none' || role === 'list') return;

        t.removeAttribute('summary');
        if (!t.querySelector(':scope > caption')) {
            var cap = document.createElement('caption');
            cap.textContent = RENTAL_CAPTION;
            cap.style.cssText = SR_ONLY;
            t.insertBefore(cap, t.firstChild);
        }
    });

    // BES-SR-26-7877345 / BES-SR-26-5429296 — promote header cells (both
    // `td.CommunitygridItemHeader` and `td.gridItemHeader`) to <th scope="col">.
    document.querySelectorAll('td.CommunitygridItemHeader, td.gridItemHeader').forEach(function (td) {
        var th = document.createElement('th');
        th.scope = 'col';
        if (td.className) th.className = td.className;
        var styleAttr = td.getAttribute('style');
        if (styleAttr) th.setAttribute('style', styleAttr);
        var widthAttr = td.getAttribute('width');
        if (widthAttr) th.setAttribute('width', widthAttr);
        th.innerHTML = td.innerHTML;
        td.parentNode.replaceChild(th, td);
    });

    // BES-SR-26-5142933 / BES-SR-26-8349763 / BES-SR-26-9256154 /
    // BES-SR-26-1028420 — server emits each property card title as
    // <h1 class="SearchGridSCName"> with role="heading" aria-level="2".
    // Replace with a true <h2> so heading semantics are correct.
    document.querySelectorAll('.SearchGridSCName').forEach(function (el) {
        if (el.tagName.toLowerCase() === 'h2') return;
        var h2 = document.createElement('h2');
        h2.innerHTML = el.innerHTML;
        if (el.className) h2.className = el.className;
        var styleAttr = el.getAttribute('style');
        if (styleAttr) h2.setAttribute('style', styleAttr);
        // Strip the redundant role/aria-level overrides since the tag is now correct.
        el.parentNode.replaceChild(h2, el);
    });

    // BES-SR-26-6945332 / BES-SR-26-1559629 — phone numbers were rendered
    // as <h2 class="SearchGridPhoneInfo" role="none">, which is a heading
    // that doesn't introduce content. Replace with <div> so they're plain
    // text in the cell and don't pollute heading navigation.
    document.querySelectorAll('h2.SearchGridPhoneInfo, .SearchGridPhoneInfo').forEach(function (el) {
        if (el.tagName.toLowerCase() === 'div') return;
        var d = document.createElement('div');
        d.innerHTML = el.innerHTML;
        if (el.className) d.className = el.className;
        var styleAttr = el.getAttribute('style');
        if (styleAttr) d.setAttribute('style', styleAttr);
        el.parentNode.replaceChild(d, el);
    });

    // BES-SR-26-5110461 / BES-SR-26-1335214 — give linked images in the
    // rental grid a meaningful alt derived from the row's heading / link
    // label / filename. Targets the image's own class (`.ImageS`) so it
    // works regardless of which container variant (#AjaxPanel,
    // #AjaxPanelB/C, divTopPanel, .hfdivGrid) the row is mounted in.
    var imgSel = [
        'img.ImageS',
        '#divTopPanel a img',
        '#AjaxPanel a img',
        '#AjaxPanelB a img',
        '#AjaxPanelC a img',
        '.hfdivGrid a img'
    ].join(', ');
    document.querySelectorAll(imgSel).forEach(function (img) {
        if (img.alt && img.alt.trim()) return;
        var link = img.closest('a');
        var label = '';
        // Look for the row's title regardless of whether it's still <h1>,
        // already-demoted <h2>, or one of the known classed elements.
        var row = (link && link.closest('tr, .SearchGridSCRow, li')) || img.closest('tr');
        if (row) {
            var titleEl = row.querySelector('.SearchGridSCName, .CommunityLinkText, h1, h2, h3');
            if (titleEl) label = titleEl.textContent.trim();
        }
        if (!label && link) {
            // Sibling-link fallback: the image link (#aSCImage) and the
            // title link (#aSC) live side-by-side in the same cell.
            var cell = link.closest('td, div');
            if (cell) {
                var sibTitle = cell.querySelector('.SearchGridSCName, .CommunityLinkText');
                if (sibTitle) label = sibTitle.textContent.trim();
            }
        }
        if (!label && link) {
            if (link.getAttribute('aria-label')) label = link.getAttribute('aria-label');
            else if (link.title) label = link.title;
            else if (link.href) {
                try {
                    var file = new URL(link.href, document.baseURI).pathname
                        .split('/').pop().replace(/[-_]/g, ' ').replace(/\.[a-z]+$/i, '').trim();
                    if (file) label = file;
                } catch (e) { /* noop */ }
            }
        }
        img.setAttribute('alt', label || 'Property photo');
    });

    // Defensive: server-side patch sometimes appends an empty <ul></ul>
    // sibling to the table when no .CommunityLinkText exist. Strip empty
    // lists so they don't show up in AT structure navigation.
    document.querySelectorAll('#divTopPanel ul, #AjaxPanelB ul, #AjaxPanelC ul').forEach(function (ul) {
        if (!ul.children.length && !ul.textContent.trim()) ul.parentNode.removeChild(ul);
    });
};

// Initial run after AJAX has had a moment to populate.
window.__applyA11yToRentalTable();

// Build a UL of .CommunityLinkText anchors only when such links exist on
// the page; otherwise the previous code injected an empty <ul></ul>
// after the last table row of any page (including News, polluting the
// news grid with an orphaned empty list).
const communityLinks = document.querySelectorAll('.CommunityLinkText');
if (communityLinks.length) {
    const ulEElement = document.createElement('ul');
    communityLinks.forEach(link => {
        const liElement = document.createElement('li');
        liElement.appendChild(link.cloneNode(true));
        ulEElement.appendChild(liElement);
        link.parentNode.removeChild(link);
    });
    const tableRows = document.querySelectorAll('table tr');
    const lastRow = tableRows[tableRows.length - 1];
    if (lastRow) lastRow.insertAdjacentElement('afterend', ulEElement);
}

// Get the elements with the classes .jcarousel-prev and .jcarousel-next
const jcarouselPrev = document.querySelector('.jcarousel-prev');
const jcarouselNext = document.querySelector('.jcarousel-next');

// Add the tabindex attribute with a value of 0 to both elements
jcarouselPrev.setAttribute('tabindex', '0');
jcarouselPrev.setAttribute('aria-label', 'Previous');

jcarouselNext.setAttribute('tabindex', '0');
jcarouselNext.setAttribute('aria-label', 'Next');

// Add the role attribute with a value of 'button' to both elements
jcarouselPrev.setAttribute('role', 'button');
jcarouselNext.setAttribute('role', 'button');

jcarouselPrev.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        jcarouselPrev.click();
    }
});
jcarouselNext.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        jcarouselNext.click();
    }
});
// Get the element with the class .CommunitygridLink
const communityGridLink = document.querySelector('.CommunitygridLink');

// Add the aria-haspopup="true" attribute to the element
communityGridLink.setAttribute('aria-haspopup', 'true');

}, 2000);
document.addEventListener('DOMContentLoaded', function() {
    // Get all elements with the class "CommunityLinkText"
    
    const parentImgElement = document.querySelector('.CommunitySalesFacebookTwitterIntegrationInner');

// Get the image element inside the parent element
const imageElement = parentImgElement.querySelector('img');

// Add the aria-hidden attribute with a value of true
// imageElement.setAttribute('aria-hidden', 'true');
    // Get the parent element of all anchor tags
    var parentElement = document.querySelector(".CommunitySalesFacebookTwitterIntegrationInner");

    // Create a new ul element
    var ulElement = document.createElement("ul");

    // Get all anchor tags inside the parent element
    var anchorTags = parentElement.querySelectorAll("a");

    // Iterate over each anchor tag
    anchorTags.forEach(function (anchorTag) {
        // Create a new li element
        var liElement = document.createElement("li");

        // Append the anchor tag to the li element
        liElement.appendChild(anchorTag);

        // Append the li element to the ul element
        ulElement.appendChild(liElement);
    });

    // Replace the existing content with the new ul element
    parentElement.innerHTML = "";
    parentElement.appendChild(ulElement);
    // (TH/scope promotion is now inside __applyA11yToRentalTable so it
    //  re-runs after every AJAX repaint of the rental panels.)
// BES-SR-26-2250801 — previously this block converted body copy in
// .hfOptionCell / .CommunitySpecialText into <h2>, which is exactly what
// the audit flags ("headings used as body text"). Leave the original
// <p>/<span> markup intact; semantic section titles are added elsewhere.

    // Get all elements with the class CommunitySalesCenterDetailsH2
const elements = document.querySelectorAll('.CommunitySalesCenterDetailsH2');

// Iterate over each element
elements.forEach(element => {
    // Create a new div element
    const newDiv = document.createElement('div');

    // Copy the inner HTML content of the original element to the new div
    newDiv.innerHTML = element.innerHTML;

    // Replace the original element with the new div
    element.parentNode.replaceChild(newDiv, element);
});
// BES-SR-26-5261897 — replace the obsolete `summary` attribute with a
// visually-hidden <caption> so the description is grammatically correct
// and exposed to all AT.
const tables = document.querySelectorAll('.CommunitySalesCenterDetailsTable table');
tables.forEach(table => {
    table.removeAttribute('summary');
    if (!table.querySelector('caption')) {
        const cap = document.createElement('caption');
        cap.textContent = 'Available floor plans with bedroom, bathroom, square footage, starting rent, and specials.';
        cap.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
        table.insertBefore(cap, table.firstChild);
    }
});

    setTimeout(function() {
        // Select all list items within .item-list
const listItems = document.querySelectorAll('.item-list li');

if (listItems.length > 0) {
  listItems[0].querySelector('img').alt = "Modern glass skyscraper towering over surrounding older brick buildings under a clear blue sky.";
  listItems[1].querySelector('img').alt = "Aerial view of a tall, narrow modern building surrounded by older, shorter buildings in an urban area.";
  listItems[2].querySelector('img').alt = "Modern multi-story buildings along a waterfront with a wooden pier in the foreground. clear blue sky and reflections visible in the calm water.";
  listItems[3].querySelector('img').alt = "Tall skyscraper towering over a bustling city street with clouds dotting a blue sky, a yellow taxi, pedestrians, and storefronts visible.";
}

        // Get the current wrapper #ctl00_dvFooter
        const footerWrapper = document.getElementById('ctl00_dvFooter');

        // Get all elements with the .footerLink and .firstFooterLink classes within the wrapper
        const footerLinks = footerWrapper.querySelectorAll('.footerLink, .firstFooterLink');

        // Create a new <ul> element
        const listContainer = document.createElement('ul');

        // Loop through each element
        footerLinks.forEach(link => {
            // Get the text content of the element
            let text = link.textContent;

            // Remove special characters using a regular expression
            text = text.replace(/[^a-zA-Z ]/g, '');

            // Update the element's text content with only alphabetic characters
            link.textContent = text;

            // Create a new <li> element
            const listItem = document.createElement('li');

            // Append the cleaned <a> element to the <li> element
            listItem.appendChild(link.cloneNode(true));

            // Append the <li> element to the <ul> container
            listContainer.appendChild(listItem);

            // Remove the original element from the DOM
            link.parentNode.removeChild(link);
        });

        // Append the <ul> container to the footer wrapper
        footerWrapper.appendChild(listContainer);
        var currentUrl = window.location.href;
        setTimeout(function() {
  var menuItems = document.querySelectorAll(".menuItem a");

  menuItems.forEach(function(item) {
    if (item.href === currentUrl) {
      item.setAttribute("aria-current", "page");
    }
  });
}, 500);
    var anchorElement = document.querySelector("#ctl00_dvCopyright a");
        anchorElement.setAttribute("aria-label", "BestRentNJ");
        var footerimg = document.querySelector(".footerText img");
        footerimg.setAttribute("alt", "Equal Housing Opportunity");

        var footerlogo = document.querySelector(".footerText a:nth-child(4)");
        footerlogo.setAttribute("aria-label", "Home - Aareas interactive");
        
    // (rental-table patches now handled by __applyA11yToRentalTable above
    //  with a MutationObserver, so they re-apply on every AJAX repaint.)
    if (typeof window.__applyA11yToRentalTable === 'function') {
        window.__applyA11yToRentalTable();
    }

    }, 500);

    // BES-SR-26-* — observe the AJAX rental panels and re-apply patches
    // every time the server replaces their innerHTML. This is the key
    // change: previously these patches only ran once on DOMContentLoaded
    // (before AJAX had populated the panels), so the bad markup survived.
    var rentalContainers = ['AjaxPanelB', 'AjaxPanelC', 'divTopPanel']
        .map(function (id) { return document.getElementById(id); })
        .filter(Boolean);
    if (rentalContainers.length && typeof MutationObserver !== 'undefined') {
        var rentalObserver = new MutationObserver(function () {
            if (typeof window.__applyA11yToRentalTable === 'function') {
                window.__applyA11yToRentalTable();
            }
        });
        rentalContainers.forEach(function (c) {
            rentalObserver.observe(c, { childList: true, subtree: true });
        });
    }
});


// -==================================

function removeH2() {
  // Get the element with the ID "ctl00_ContentPlaceHolder1_lblContent"
  const element = document.getElementById("ctl00_ContentPlaceHolder1_lblContent");

  // Check if the element exists
  if (element) {
    // Select the first child element (assuming the <h2> is the first child)
    const h2Element = element.querySelector("h2");

    // If the <h2> element exists, remove it and move its content to a new <p> tag
    if (h2Element) {
      const content = h2Element.querySelector("p").textContent; // Extract content
      const newPElement = document.createElement("p");
      newPElement.textContent = content; // Set content in new <p>

      // Set a delay of 4 seconds using setTimeout
      setTimeout(() => {
        element.removeChild(h2Element); // Remove the <h2> after delay
        element.insertBefore(newPElement, element.firstChild); // Insert <p> before first child
      }, 4000); // Delay in milliseconds
    }
  } else {
    console.error("Element with ID 'ctl00_ContentPlaceHolder1_lblContent' not found.");
  }
}

// Call the function after the page loads (optional)
window.addEventListener("load", removeH2);

