!function(i,t){function h(i){this.opts=i,this.$el=i.$el,this.$sImg=i.$el.find("img"),this.$zoomDiv=null,this.$bigImg=null,this.boxWidth=i.boxWidth,this.boxHeight=i.boxHeight,this.imgWidth=0,this.imgHeight=0,this.$mask=null,this.maskWidth=0,this.maskHeight=0,this.elWidth=0,this.elHeight=0,this._init()}h.prototype={constructor:h,_init:function(){this.$el.css("position","relative"),this.bindEvent()},_createZoomDiv:function(){var i=this.boxWidth,h=this.boxHeight;this.$zoomDiv||(this.$zoomDiv=t("<div/>"));var e=this.$el.offset(),s=e.left/1+this.$el.outerWidth(!0)/1+this.opts.marginLeft/1,o=e.top/1;this.$bigImg.css("position","absolute"),this.$zoomDiv.append(this.$bigImg),this.$zoomDiv.css({position:"absolute",left:s,top:o,zIndex:999,width:i,height:h,overflow:"hidden",border:"1px solid #222",background:"#FFF"}),t("body").append(this.$zoomDiv)},_createMask:function(){var i=this.boxWidth,h=this.boxHeight;this.elWidth=this.$el.outerWidth(!0),this.elHeight=this.$el.outerHeight(!0),this.maskWidth=Math.ceil(i/this.imgWidth*this.elWidth),this.maskHeight=Math.ceil(h/this.imgHeight*this.elHeight),this.maskWidth>this.elWidth&&(this.maskWidth=this.elWidth),this.maskHeight>this.elHeight&&(this.maskHeight=this.elHeight),this.$mask||(this.$mask=t("<div/>")),this.$mask.css({position:"absolute",background:"rgba(255,255,255,.4)",width:this.maskWidth,height:this.maskHeight,cursor:"move"}),this.$el.append(this.$mask)},createHTML:function(){this._createZoomDiv(),this._createMask()},bindEvent:function(){var i=this;this.$el.on({mouseenter:function(){i.flag=!0;var h=i.$sImg.attr(i.opts.origin),e=new Image;e.onload=function(){i.flag&&(i.imgWidth=e.width,i.imgHeight=e.height,i.$bigImg=t(e),i.createHTML(),i.flag=!1)},e.src=h},mouseleave:function(){i.flag?i.flag=!1:(i.$zoomDiv&&i.$zoomDiv.remove(),i.$mask&&i.$mask.remove())},mousemove:function(t){if(!i.$bigImg)return!1;var h=i.$el.offset(),e=i.maskWidth,s=i.maskHeight,o=t.pageX-h.left-Math.ceil(e/2),a=t.pageY-h.top-Math.ceil(s/2),g=i.elWidth-e,n=i.elHeight-s;o=o<0?0:o,a=a<0?0:a,o=o>g?g:o,a=a>n?n:a;var m=-o*i.imgWidth/i.elWidth,l=-a*i.imgHeight/i.elHeight;i.$mask.css({left:o,top:a}),i.$bigImg.css({left:m,top:l})}})}},t.fn.imgZoom=function(i){var e={boxWidth:360,boxHeight:360,marginLeft:5,origin:"data-origin"};t.each(this,function(s,o){var a=t.extend(e,i);a.$el=t(o),new h(a)})}}(window,jQuery);