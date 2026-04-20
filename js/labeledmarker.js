function LabeledMarker(latlng, opt_opts){
  this.latlng_ = latlng;
  this.opts_ = opt_opts;

  this.labelText_ = opt_opts.labelText || "";
  this.labelHTML_ = opt_opts.labelHTML || "";
  this.labelClass_ = opt_opts.labelClass || "hfLabel";
  this.labelOffset_ = opt_opts.labelOffset || new GSize(0, 0);
  
  this.clickable_ = opt_opts.clickable || true;
  this.title_ = opt_opts.title || "";
  this.labelVisibility_  = true;
   
  if (opt_opts.draggable) {
  	// This version of LabeledMarker doesn't support dragging.
  	opt_opts.draggable = false;
  }
  
  GMarker.apply(this, arguments);
};


// It's a limitation of JavaScript inheritance that we can't conveniently
// inherit from GMarker without having to run its constructor. In order for 
// the constructor to run, it requires some dummy GLatLng.
LabeledMarker.prototype = new GMarker(new GLatLng(0, 0));

/**
 * Is called by GMap2's addOverlay method. Creates the text div and adds it
 * to the relevant parent div.
 *
 * @param {GMap2} map the map that has had this labeledmarker added to it.
 */
LabeledMarker.prototype.initialize = function(map) {
    // Do the GMarker constructor first.
    GMarker.prototype.initialize.apply(this, arguments);

    this.map_ = map;
    this.div_ = document.createElement("div");
    this.div_.className = this.labelClass_;
    this.div_.innerHTML = this.labelText_;
    this.div_.style.position = "absolute";
    this.div_.style.cursor = "pointer";
    this.div_.title = this.title_;

    map.getPane(G_MAP_MARKER_PANE).appendChild(this.div_);

    if (this.clickable_) {
        function newEventPassthru(obj, event) {
            return function() {
                GEvent.trigger(obj, event);
            };
        }

        // Pass through events fired on the text div to the marker.
        var eventPassthrus = ['click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout'];
        for (var i = 0; i < eventPassthrus.length; i++) {
            var name = eventPassthrus[i];
            GEvent.addDomListener(this.div_, name, newEventPassthru(this, name));
        }
    }
};

LabeledMarker.prototype.redraw = function(force) {
  GMarker.prototype.redraw.apply(this, arguments);
  this.redrawLabel_();  
};

LabeledMarker.prototype.redrawLabel_ = function() {   
    // Calculate the DIV coordinates of two opposite corners of our bounds to
    // get the size and position of our rectangle
    var p = this.map_.fromLatLngToDivPixel(this.latlng_);
    var z = GOverlay.getZIndex(this.latlng_.lat());

    // Now position our div based on the div coordinates of our bounds
    this.div_.style.left = (p.x + this.labelOffset_.width) + "px";
    this.div_.style.top = (p.y + this.labelOffset_.height) + "px";
    this.div_.style.zIndex = z; // in front of the marker
};

 LabeledMarker.prototype.remove = function() {
  GEvent.clearInstanceListeners(this.div_);
  if (this.div_.outerHTML) {
    this.div_.outerHTML = ""; //prevent pseudo-leak in IE
  }
  if (this.div_.parentNode) {
    this.div_.parentNode.removeChild(this.div_);
  }
  this.div_ = null;
  GMarker.prototype.remove.apply(this, arguments);
};

LabeledMarker.prototype.copy = function() {
  return new LabeledMarker(this.latlng_, this.opts_);
};

LabeledMarker.prototype.show = function() {
  GMarker.prototype.show.apply(this, arguments);
  if (this.labelVisibility_) {
    this.showLabel();
  } else {
    this.hideLabel();
  }
};

LabeledMarker.prototype.hide = function() {
  GMarker.prototype.hide.apply(this, arguments);
  this.hideLabel();
};

LabeledMarker.prototype.setLatLng = function(latlng) {
  this.latlng_ = latlng;
  GMarker.prototype.setLatLng.apply(this, arguments);
  this.redrawLabel_();
};

LabeledMarker.prototype.setLabelVisibility = function(visibility) {
  this.labelVisibility_ = visibility;
  if (!this.isHidden()) { // Marker showing, make visible change
    if (this.labelVisibility_) {
      this.showLabel();
    } else {
      this.hideLabel();
    }
  }
};

LabeledMarker.prototype.getLabelVisibility = function() {
  return this.labelVisibility_;
};

LabeledMarker.prototype.hideLabel = function() {
    //debugger;
    if (this.div_)
        this.div_.style.visibility = 'hidden';
};

LabeledMarker.prototype.showLabel = function() {
 if (this.div_)
  this.div_.style.visibility = 'visible';
};
