/*========================================
=            GLOBAL VARIABLES            =
========================================*/

var color_green="#27cebc";
var color_blue="#00acec";
var color_yellow="#FDD01C";
var color_red="#f35958";
var color_grey="#dce0e8";
var color_black="#1b1e24";
var color_purple="#6d5eac";
var color_primary="#6d5eac";
var color_success="#4eb2f5";
var color_danger="#f35958";
var color_warning="#f7cf5e";
var color_info="#3b4751";

/*-----  End of GLOBAL VARIABLES  ------*/



/*========================================
=            GLOBAL FUNCTIONS            =
========================================*/
function calculateHeight() {
	var contentHeight = parseInt($('.page-content').height(), 10);
}
		
function toggleMainMenu(){
	var timer;
	if($('body').hasClass('open-menu-left')){
		$('body').removeClass('open-menu-left');
		timer= setTimeout(function(){
				$('.page-sidebar').removeClass('visible');
		}, 300);
	}
	else{
		clearTimeout(timer);
		$('.page-sidebar').addClass('visible');
		setTimeout(function(){
				 $('body').addClass('open-menu-left');
		}, 50);
	}
}

function blockUI(el) {
	$(el).block({
		message: '<div class="loading-animator"></div>',
		css: {
			border: 'none',
			padding: '2px',
			backgroundColor: 'none'
		},
		overlayCSS: {
			backgroundColor: '#fff',
			opacity: 0.3,
			cursor: 'wait'
		}
	});
}

// wrapper function to  un-block element(finish loading)
function unblockUI(el) {
	$(el).unblock();
}

function equalHeight(group) {
	tallest = 0;
	group.each(function () {
			thisHeight = $(this).height();
			if (thisHeight > tallest) {
					tallest = thisHeight;
			}
	});
	group.height(tallest);
}


// for checking if the element exists or not
$.fn.exists = function(callback) {
	var args = [].slice.call(arguments, 1);
	if (this.length) {
		callback.call(this, args);
	}
	return this;
};


// /*=================================================================
// =            Bind Functions Jquery- LAYOUT OPTIONS API            =
// =================================================================*/

// (function ($) {
// 		//Show/Hide Main Menu
// 		$.fn.toggleMenu = function () {
// 				var windowWidth = window.innerWidth;
// 				if(windowWidth >768){
// 						$(this).toggleClass('hide-sidebar');
// 				}
// 		};
// 		//Condense Main Menu
// 		$.fn.condensMenu = function () {
// 				var windowWidth = window.innerWidth;
// 				if(windowWidth >768){
// 						if ($(this).hasClass('hide-sidebar')) $(this).toggleClass('hide-sidebar');

// 						$(this).toggleClass('condense-menu');
// 						$(this).find('#main-menu').toggleClass('mini');
// 				}
// 		};
// 		//Toggle Fixed Menu Options
// 		$.fn.toggleFixedMenu = function () {
// 				var windowWidth = window.innerWidth;
// 				if(windowWidth >768){
// 				$(this).toggleClass('menu-non-fixed');
// 				}
// 		};

// 		$.fn.toggleHeader = function () {
// 				$(this).toggleClass('hide-top-content-header');
// 		};

// 		$.fn.layoutReset = function () {
// 				$(this).removeClass('hide-sidebar');
// 				$(this).removeClass('condense-menu');
// 				$(this).removeClass('hide-top-content-header');
// 				if(!$('body').hasClass('extended-layout'))
// 				$(this).find('#main-menu').removeClass('mini');
// 		};


// })(jQuery);

// /*-----  End of Bind Functions Jquery- LAYOUT OPTIONS API  ------*/


/*-----  End of GLOBAL FUNCTIONS  ------*/