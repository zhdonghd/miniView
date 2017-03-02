# miniView.js - An interesting web plugin !

I offer you a web plugin based on jquery that make a mini view of a container on your page.

# support

* ie9+
* chrome
* edge

# Quickstart

Load up `miniView.js` (after jQuery):

```html
<script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
<script src="miniView.js"></script>
```

Then add a container with attribute id that much larger than the parent container

```html
<div class="borderDiv" style="width: 800px; height: 600px">
  <div class="mainContainer" id="view" style="width: 2000px; height: 1500px; backgroud-color: #bad6cb"></div>
</div>
```

After the page is loaded, use init method to initialize the mini view. The method accept config that you can define the scale value, selector and parent scale value.

```html
var miniMapObject = MiniMap.init({selector:"#view"});
```

# Method

## init

  param: config. json format
  
  key                  | Behavior
-----------------------|-----------------------------------------------------------------
`selector`             | Jquery selector with id attribute.
`zoom`                 | Scale value of the mini map. default value 0.1
`viewZoom`             | Scale value of the container. default value 1
`isEnableMouseWheel`   | Where enable mousewheel to zoom the container

## refresh

  param: config. just link init method.
