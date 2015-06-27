$(document).ready(function(){
	"use strict";


	(function($) {

		// name settings
		var nameSpace = "[gerobak-package]";
		var optionSpace = "gerobak-package-options";

		var nameAttr = nameSpace.replace(/[\])}[{(]/g, '');

		$(function(){

			$(nameSpace).each(function(){
				var self = $(this);
				var options = '[' + self.attr(optionSpace) + ']';

				if ($.isPlainObject(options[0])) {
					options[0] = $.extend({}, options[0]);
				}

				grbk.load(s[self.attr(nameAttr)]).then( function(){
					if(self[0] === undefined) {
						self[self.attr(nameAttr)].apply(self, options);
					}
					$(self).remove();
				});
			});

		});
	}(jQuery));


	var grbk = grbk || {};

	(function($, $document, grbk) {

			var loaded = [],
			promise = false,
			deferred = $.Deferred();

			/**
			 * Chain loads the given sources
			 * @param srcs array, script or css
			 * @returns {*} Promise that will be resolved once the sources has been loaded.
			 */
			grbk.load = function (srcs) {
				srcs = $.isArray(srcs) ? srcs : srcs.split(/\s+/);
				if(!promise){
					promise = deferred.promise();
				}

				$.each(srcs, function(index, src) {
					promise = promise.then( function(){
						return src.indexOf('.css') >=0 ? loadCSS(src) : loadScript(src);
					});
				});

				deferred.resolve();
				return promise;
			};

			/**
			 * Dynamically loads the given script
			 * @param src The url of the script to load dynamically
			 * @returns {*} Promise that will be resolved once the script has been loaded.
			 */
			var loadScript = function (src) {
				if(loaded[src]) {
					return loaded[src].promise();
				}

				var deferred = $.Deferred();
				var script = $document.createElement('script');
				script.src = src;
				script.onload = function (e) {
					deferred.resolve(e);
				};
				script.onerror = function (e) {
					deferred.reject(e);
				};
				$document.body.appendChild(script);
				loaded[src] = deferred;

				return deferred.promise();
			};

			/**
			 * Dynamically loads the given CSS file
			 * @param href The url of the CSS to load dynamically
			 * @returns {*} Promise that will be resolved once the CSS file has been loaded.
			 */
			var loadCSS = function (href) {
				if(loaded[href]) {
					return loaded[href].promise();
				}

				var deferred = $.Deferred();
				var style = $document.createElement('link');
				style.rel = 'stylesheet';
				style.type = 'text/css';
				style.href = href;
				style.onload = function (e) {
					deferred.resolve(e);
				};
				style.onerror = function (e) {
					deferred.reject(e);
				};
				$document.head.appendChild(style);
				loaded[href] = deferred;

				return deferred.promise();
			};


	})(jQuery, document, grbk);

});
