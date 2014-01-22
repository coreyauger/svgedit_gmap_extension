svgedit_gmap_extension
======================

## Live Demo

Here is a live demo of the extension.

[Live Demo!](http://coreyauger.com/svg-edit-2.6/demo.html)

## Overview

SVG Edit GMap Extension.  This is an extension to [SVG Edit](https://code.google.com/p/svg-edit/). This allows you to draw svg on top of google maps.  Using the map button on the left will allow you to pan + zoom the map ... AND your SVG !  Cool right? 

## SVG Edit
SVG-edit is a fast, web-based, JavaScript-driven SVG drawing editor that works in any modern browser.

You can learn more about [SVG Edit](https://code.google.com/p/svg-edit/)

SVG Edit has sparse documentation.  They do however document how to create extensions.  
The extension documentation can be found [here](https://code.google.com/p/svg-edit/wiki/ExtensionDocs)

Data sharing between extensions is a bit odd.  I personaly would have made each extension a jquery extension.  Right now the only way to pass data into the extension is to define a "known" variable before you create the extension.

## Usage
simply include the javascript file like so...
```html
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=[YOU_API_KEY]&sensor=true"></script>
<script type="text/javascript" src="extensions/ext-gmaps.js"></script>
```

Note: that the extension takes care of creating your google map.  Also it adds the map to the global 'svgEditor' object like so 'svgEditor.map'.

This means that you could have init code to center your map like this.
```javascript
$(function(){
   // other initi here...
   
   // center the map.
   svgEditor.map.setCenter( new google.maps.LatLng(49.286026, -123.112917));
   // zoom in...
   svgEditor.map.setZoom(15);  
});
```

## Roadmap
* Right now zoom does not work correct on SVG
* Looking to make expereince seamless and more accurate.


## Screenshot
![Screenshot](http://coreyauger.com/svg-edit-2.6/demo_s.png)





[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/coreyauger/svgedit_gmap_extension/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

