/*
 * ext-gmap.js
 *
 * Licensed under the MIT License
 *
 * Copyright(c) 2010 Corey Auger
 *
 */
 
function SVGOverlay(map) {
    this.map_ = map;
    this.div_ = null;

    // Explicitly call setMap() on this overlay
    this.setMap(map);
}

SVGOverlay.prototype = new google.maps.OverlayView();
SVGOverlay.prototype.onAdd = function() {
    // Create the DIV and set some basic attributes.
    var div = document.createElement('div');
    div.id = 'gmapSvgOverlay';
    //div.style.border = "1px solid red";
    div.style.borderWidth = "0px";
    div.style.position = "absolute";

    // Set the overlay's div_ property to this DIV
    this.div_ = div;

    // We add an overlay to a map via one of the map's panes.
    // We'll add this overlay to the overlayImage pane.
    var panes = this.getPanes();
    panes.overlayLayer.appendChild(div);
};
SVGOverlay.prototype.draw = function() {

    // Size and position the overlay. We use a southwest and northeast
    // position of the overlay to peg it to the correct position and size.
    // We need to retrieve the projection from this overlay to do this.
    var overlayProjection = this.getProjection();
};
SVGOverlay.prototype.onRemove = function() {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
};


$(window).resize(function(){
    $('#map-canvas').width($('#svgcanvas').innerWidth())
                    .height($('#svgcanvas').innerHeight());
});

$(function(){
    $('#workarea').prepend('<div id="map-canvas" style="position:absolute;"></div>');
    $(window).trigger('resize');
});

svgEditor.addExtension("Google Maps", function() {

    var _id = "gmap";

    // remove the white background SVG in the middle of the screen...
    $("rect").first().remove();
    var curZoom = 14;
    var mapOptions = {
        center: new google.maps.LatLng(49.286026, -123.112917),
        zoom: curZoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true // a way to quickly hide all controls
    };
    svgEditor.map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

    google.maps.event.addListener(svgEditor.map, 'zoom_changed', function() {
        var zoomLevel = svgEditor.map.getZoom();
        if( zoomLevel - curZoom > 0){
            svgCanvas.setZoom(2);
        }else{
            svgCanvas.setZoom(0.5);
        }
        curZoom =  zoomLevel;

    });
    
    overlay = new SVGOverlay(svgEditor.map);
    // hide svg.. so map will get events

    // this was not needed and now it seems to be to kick things off
    $('#gmapSvgOverlay').html($('#svgroot').clone());
    $('#svgcanvas').hide();

    // NOTE: SVG Edit should have an event that tells you "when" your tool has been selected..
    // thus allowing you to init state... for now we hack around this..
    $('#tools_left').on('click','div',function(){
        if($(this).attr('id') == _id){
            // hide svg.. so map will get events
            $('#gmapSvgOverlay').html($('#svgroot').clone());
            $('#svgcanvas').hide();
        }else{
            // show svg .. no more map events.. only svg!
            $('#gmapSvgOverlay').html('');
            $('#svgcanvas').show();

            /// HACK: how to get this transform ???
            var matrix = $('#gmapSvgOverlay').parent().parent().parent().css('-webkit-transform');
            if( matrix && matrix.indexOf('matrix') >=0 ){
                var parts = matrix.replace(/matrix/g,'').split(',');

                var x = parseInt(parts[parts.length-2]);
                var y = parseInt(parts[parts.length-1]);

                $('#svgcanvas').css('left',x+'px');
                $('#svgcanvas').css('top',y+'px');
            }

        }
    });

		return {
			name: "Google Maps",
			// For more notes on how to make an icon file, see the source of
			// the hellorworld-icon.xml
			svgicons: "/gmap-icon.xml",
			
			// Multiple buttons can be added in this array
			buttons: [{
				// Must match the icon ID in helloworld-icon.xml
				id: _id,
				
				// This indicates that the button will be added to the "mode"
				// button panel on the left side
				type: "mode", 
				
				// Tooltip text
				title: "Google Maps SVG extension",
				
				// Events
				events: {
					'click': function() {
						// The action taken when the button is clicked on.
						// For "mode" buttons, any other button will 
						// automatically be de-pressed.
						svgCanvas.setMode(_id);
					}
				}
			}],
			// This is triggered when the main mouse button is pressed down 
			// on the editor canvas (not the tool panels)
			mouseDown: function() {
				// Check the mode on mousedown
				if(svgCanvas.getMode() == _id) {
				    // The returned object must include "started" with
					// a value of true in order for mouseUp to be triggered
					return {started: true};
				}
			},

            mouseMove: function(){
                if( svgCanvas.getMode() == _id){
                    console.log('mouse move');
                }
            },
			
			// This is triggered from anywhere, but "started" must have been set
			// to true (see above). Note that "opts" is an object with event info
			mouseUp: function(opts) {
				// Check the mode on mouseup
				if(svgCanvas.getMode() == _id) {
					var zoom = svgCanvas.getZoom();
					
					// Get the actual coordinate by dividing by the zoom value
					var x = opts.mouse_x / zoom;
					var y = opts.mouse_y / zoom;
					
					//var text = "Hello World!\n\nYou clicked here: " + x + ", " + y;
						
					// Show the text using the custom alert function
					//$.alert(text);
				}
			}
		};
});

