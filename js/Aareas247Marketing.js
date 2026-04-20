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
// Get the table element by its id
const table = document.querySelector('#divTopPanel table');

// Check if the table exists
if (table) {
  // Add the summary attribute to the table
  table.setAttribute('summary', "It's Describe Apartment Details");
} else {
  console.error('Table not found');
}

const communityLinks = document.querySelectorAll('.CommunityLinkText');

    // Create a new <ul> element
    const ulEElement = document.createElement('ul');

    // Loop through each community link and move it into a <li> within the <ul>
    communityLinks.forEach(link => {
        const liElement = document.createElement('li');
        liElement.appendChild(link.cloneNode(true)); // Clone the link to preserve its attributes and content
        ulEElement.appendChild(liElement);
        link.parentNode.removeChild(link); // Remove the original link from its parent
    });

    // Find the last <tr> element in the table and append the <ul> to it
    const tableRows = document.querySelectorAll('table tr');
    const lastRow = tableRows[tableRows.length - 1];
    lastRow.insertAdjacentElement('afterend', ulEElement);

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
    // Select all <td> elements with the class .CommunitygridItemHeader
const tdElements = document.querySelectorAll('td.CommunitygridItemHeader');

// Loop through each <td> element
tdElements.forEach(td => {
    // Create a new <th> element
    const th = document.createElement('th');
    // Copy the class of the <td> to the <th>
    th.className = td.className;
    // Copy the content of the <td> to the <th>
    th.textContent = td.textContent;
    // Replace the <td> with the new <th> in the DOM
    td.parentNode.replaceChild(th, td);
});
// Select all <p> elements with the class .hfOptionCell
const pElements = document.querySelectorAll('.hfOptionCell p,.CommunitySpecialText span');

// Loop through each <p> element
pElements.forEach(p => {
    // Create a new <h2> element
    const h2 = document.createElement('h2');
    // Copy the content of the <p> to the <h2>
    h2.textContent = p.textContent;
    // Replace the <p> with the new <h2> in the DOM
    p.parentNode.replaceChild(h2, p);
});

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
// Find all tables inside elements with the class CommunitySalesCenterDetailsTable
const tables = document.querySelectorAll('.CommunitySalesCenterDetailsTable table');

// Loop through each table and set the summary attribute
tables.forEach(table => {
    table.setAttribute('summary', 'It describes Community Details');
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
        
        // Find all elements with the class .gridItemHeader
const gridItemHeaders = document.querySelectorAll('.gridItemHeader');

// Loop through each element and replace it with a th element
gridItemHeaders.forEach(element => {
    const thElement = document.createElement('th'); // Create a th element
    thElement.textContent = element.textContent; // Copy the text content

    // Preserve inline styles
    const inlineStyle = element.getAttribute('style');
    if (inlineStyle) {
        thElement.setAttribute('style', inlineStyle); // Set the preserved inline style
    }

    // Preserve classes
    const classes = element.getAttribute('class');
    if (classes) {
        thElement.setAttribute('class', classes); // Set the preserved classes
    }

    element.parentNode.replaceChild(thElement, element); // Replace the td with th
});
// Select the element with the class .SearchGridSCName
const element = document.querySelector('.SearchGridSCName');

// Check if the element exists
if (element) {
    // Create a new <h2> element
    const newElement = document.createElement('h2');

    // Copy the content of the existing <h1> to the new <h2>
    newElement.innerHTML = element.innerHTML;

    // Copy the current class of the existing <h1> to the new <h2>
    newElement.className = element.className;

    // Replace the existing <h1> with the new <h2> in the DOM
    element.parentNode.replaceChild(newElement, element);
} else {
    console.error('Element with class .SearchGridSCName not found.');
}
// Get all elements with the class .SearchGridPhoneInfo
const elements = document.querySelectorAll('.SearchGridPhoneInfo');

elements.forEach(element => {
  // Create a new div element
  const newDiv = document.createElement('div');
  
  // Copy the current class from the element to the new div
  newDiv.className = element.className;
  
  // Copy the inner HTML content from the element to the new div
  newDiv.innerHTML = element.innerHTML;
  
  // Replace the old element with the new div
  element.parentNode.replaceChild(newDiv, element);
});

    }, 500); // 3000 milliseconds = 3 seconds
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

