var miniViewObject = {
	selector: null,
	zoom: 0.1,
	viewZoom: 1,
	refresh: function(config) {
		this.getParams(config);
		var selector = this.selector,
			p = ["webkit", "moz", "ms", "o"],
			oString = "left top";
			
		if (config && config.viewZoom)
			this.viewZoom = config.viewZoom;
		
		var el = $(selector).clone().removeAttr("style"),
			s = "scale(" + this.zoom + ")",
			parentDiv = $(selector).parent();
			
		for (var i = 0; i < p.length; i++) {
			el[0].style[p[i] + "Transform"] = s;
			el[0].style[p[i] + "TransformOrigin"] = oString
		}
		
		el[0].style["transform"] = s;
		el[0].style["transformOrigin"] = oString;
		
		$("#miniview " + selector + "Mini").remove();
		$("#miniview").append(el.attr("id", $(selector).attr("id") + "Mini").removeAttr("data-bind"));
		
		//设置小地图大小
		$("#minimap, #selectWin, #miniview").css({
			width: $(selector).width() * this.zoom,
			height: $(selector).height() * this.zoom
		});
		
		//设置选择框大小
		$(".selectionWin").css({
			width: parentDiv.width() * this.zoom / this.viewZoom,
			height: parentDiv.height() * this.zoom / this.viewZoom
		});
		
		//设置选择框位置
		var selLeft = parseInt($(selector).css("left")),
			selTop = parseInt($(selector).css("top"));
		$(".selectionWin").css({
			left: -selLeft * this.zoom / this.viewZoom,
			top: -selTop * this.zoom / this.viewZoom
		})
	},
	getParams: function(config) {
		if (!config) return false;
		if (config.selector) this.selector = config.selector;
		if (config.zoom) this.zoom = config.zoom;
		if (config.viewZoom) this.viewZoom = config.viewZoom
	}
};
var setViewZoom = function(event, delta, deltaX, deltaY) {
		var el = event.delegateTarget,
			mousePosX = event.clientX - el.offsetLeft,
			mousePosY = event.clientY - el.offsetTop,
			origZoom = miniViewObject.viewZoom,
			zoom, elCurrLeft = parseInt($(el).css("left")),
			elCurrTop = parseInt($(el).css("top"));
			
		if (delta > 0 && origZoom < 1.5)
			zoom = origZoom + 0.05;
		else if (delta < 0 && origZoom > 0.5)
			zoom = origZoom - 0.05;
		else
			return false;
		
		var p = ["webkit", "moz", "ms", "o"],
			s = "scale(" + zoom + ")",
			oString = "left top";
			
		for (var i = 0; i < p.length; i++) {
			el.style[p[i] + "Transform"] = s;
			el.style[p[i] + "TransformOrigin"] = oString
		}
		
		el.style["transform"] = s;
		el.style["transformOrigin"] = oString;
		
		var leftDiff = mousePosX * (1 - zoom / origZoom),
			TopDiff = mousePosY * (1 - zoom / origZoom);
		$(el).css("left", elCurrLeft + leftDiff);
		$(el).css("top", elCurrTop + TopDiff);
		
		miniViewObject.refresh({
			viewZoom: zoom
		});
		
		return false
	};
window.MiniView = {
	init: function(config) {
		miniViewObject.getParams(config);
		var selector = config.selector;
		var parentDiv = $(selector).parent();
		parentDiv.after('<div id="minimap">'
							+ '<div id="selectWin">' 
								+ '<div class="selectionWin"></div>'
							+ '</div>'
							+ '<div id="miniview"></div>'
						+ '</div>');
		//拖拽效果				
		$(".selectionWin").draggable({
			containment: 'parent',
			drag: function() {
				var selectionLeft = parseInt($(".selectionWin").css("left")),
					selectionTop = parseInt($(".selectionWin").css("top"));
				$(miniViewObject.selector).css({
					left: -selectionLeft / (miniViewObject.zoom / miniViewObject.viewZoom),
					top: -selectionTop / (miniViewObject.zoom / miniViewObject.viewZoom)
				})
			}
		});
		
		//滑轮滚动缩放
		$(selector).mousewheel(function(event, delta, deltaX, deltaY) {
			setViewZoom(event, delta, deltaX, deltaY);
			return false
		});
		miniViewObject.refresh();
		return miniViewObject
	}
}