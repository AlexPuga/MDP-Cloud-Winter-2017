/*! grafana - v4.2.0 - 2017-03-22
 * Copyright (c) 2017 Torkel Ödegaard; Licensed Apache-2.0 */

define(["jquery","app/core/core"],function(a,b){"use strict";function c(b,c,e,f){var g=this,h=e.ctrl,i=h.panel,j=a('<div class="graph-tooltip">');this.destroy=function(){j.remove()},this.findHoverIndexFromDataPoints=function(a,b,c){for(var d=b.datapoints.pointsize,e=c*d,f=b.datapoints.points.length,g=e;g<f;g+=d)if(!b.lines.steps&&null!=b.datapoints.points[e]&&null==b.datapoints.points[g]||b.datapoints.points[g]>a)return Math.max(g-d,0)/d;return g/d-1},this.findHoverIndexFromData=function(a,b){for(var c,d=0,e=b.data.length-1;;){if(d>e)return Math.max(e,0);if(c=Math.floor((d+e)/2),b.data[c][0]===a)return c;b.data[c][0]<a?d=c+1:e=c-1}},this.renderAndShow=function(a,b,c,d){"time"===d&&(b='<div class="graph-tooltip-time">'+a+"</div>"+b),j.html(b).place_tt(c.pageX+20,c.pageY)},this.getMultiSeriesPlotHoverInfo=function(a,b){var c,d,e,f,g,h,j,k,l,m=[[],[],[]],n=0;for(d=0;d<a.length;d++)e=a[d],!e.data.length||i.legend.hideEmpty&&e.allIsNull?m[0].push({hidden:!0,value:0}):!e.data.length||i.legend.hideZero&&e.allIsZero?m[0].push({hidden:!0,value:0}):(f=this.findHoverIndexFromData(b.x,e),g=b.x-e.data[f][0],h=e.data[f][0],(!k||g>=0&&(g<k||k<0)||g<0&&g>k)&&(k=g,l=h),e.stack?"individual"===i.tooltip.value_type?c=e.data[f][1]:e.stack?(n+=e.data[f][1],c=n):c=e.data[f][1]:c=e.data[f][1],(e.lines.steps||e.stack)&&(f=this.findHoverIndexFromDataPoints(b.x,e,f)),j=0,e.yaxis&&(j=e.yaxis.n),m[j].push({value:c,hoverIndex:f,color:e.color,label:e.label,time:h,distance:g,index:d}));return m=m[0].concat(m[1],m[2]),m.time=l,m},b.mouseleave(function(){if(i.tooltip.shared){var a=b.data().plot;a&&(j.detach(),a.unhighlight())}d.emit("graph-hover-clear")}),b.bind("plothover",function(a,c,e){g.show(c,e),c.panelRelY=(c.pageY-b.offset().top)/b.height(),d.emit("graph-hover",{pos:c,panel:i})}),b.bind("plotclick",function(a,b,c){d.emit("graph-click",{pos:b,panel:i,item:c})}),this.clear=function(a){j.detach(),a.clearCrosshair(),a.unhighlight()},this.show=function(d,e){var h,k,l,m,n,o,p,q,r=b.data().plot,s=r.getData(),t=r.getXAxes(),u=t[0].options.mode,v=f(),w=i.tooltip.shared;if(d.panelRelY){var x=r.pointOffset({x:d.x});if(Number.isNaN(x.left)||x.left<0||x.left>b.width())return void g.clear(r);d.pageX=b.offset().left+x.left,d.pageY=b.offset().top+b.height()*d.panelRelY;var y=d.pageY>=a(window).scrollTop()&&d.pageY<=a(window).innerHeight()+a(window).scrollTop();if(!y)return void g.clear(r);if(r.setCrosshair(d),w=!0,c.sharedCrosshairModeOnly())return}if(0!==v.length)if(q=v[0].hasMsResolution?"YYYY-MM-DD HH:mm:ss.SSS":"YYYY-MM-DD HH:mm:ss",w){r.unhighlight();var z=g.getMultiSeriesPlotHoverInfo(s,d);for(p="",l=c.formatDate(z.time,q),2===i.tooltip.sort?z.sort(function(a,b){return b.value-a.value}):1===i.tooltip.sort&&z.sort(function(a,b){return a.value-b.value}),n=0;n<z.length;n++)if(m=z[n],!m.hidden){var A="";e&&m.index===e.seriesIndex&&(A="graph-tooltip-list-item--highlight"),o=v[m.index],k=o.formatValue(m.value),p+='<div class="graph-tooltip-list-item '+A+'"><div class="graph-tooltip-series-name">',p+='<i class="fa fa-minus" style="color:'+m.color+';"></i> '+m.label+":</div>",p+='<div class="graph-tooltip-value">'+k+"</div></div>",r.highlight(m.index,m.hoverIndex)}g.renderAndShow(l,p,d,u)}else e?(o=v[e.seriesIndex],h='<div class="graph-tooltip-list-item"><div class="graph-tooltip-series-name">',h+='<i class="fa fa-minus" style="color:'+e.series.color+';"></i> '+o.label+":</div>",k=i.stack&&"individual"===i.tooltip.value_type?e.datapoint[1]-e.datapoint[2]:e.datapoint[1],k=o.formatValue(k),l=c.formatDate(e.datapoint[0],q),h+='<div class="graph-tooltip-value">'+k+"</div>",g.renderAndShow(l,h,d,u)):j.detach()}}var d=b.appEvents;return c});