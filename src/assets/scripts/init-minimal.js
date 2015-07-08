/*================================================
=            DOCUMENT READY FUNCTIONS            =
================================================*/

$(document).ready(function () {

	/*================================================
	=            REMOVE GEROBAK-LOAD ATTR            =
	================================================*/
	
	var gerobakLoad = document.querySelectorAll('[gerobak-load]');
	$(gerobakLoad).remove();
	
	/*-----  End of REMOVE GEROBAK-LOAD ATTR  ------*/



	/*==========  CALCULATE HEIGHT  ==========*/
	calculateHeight();



	/*==========  REMOVING WIDGET  ==========*/
	$(".remove-widget").click(function () {
		$(this).parent().parent().parent().addClass('animated fadeOut');
		$(this).parent().parent().parent().attr('id', 'id_a');

		//$(this).parent().parent().parent().hide();
		setTimeout(function () {
				$('#id_a').remove();
		}, 400);
		return false;
	});




	/*==========  COLLAPSING MENU  ==========*/
	$("#menu-collapse").click(function () {
		if ($('.page-sidebar').hasClass('mini')) {
				$('.page-sidebar').removeClass('mini');
				$('.page-content').removeClass('condensed-layout');
				$('.footer-widget').show();
		} else {
				$('.page-sidebar').addClass('mini');
				$('.page-content').addClass('condensed-layout');
				$('.footer-widget').hide();
				calculateHeight();
		}
	});

	/*==========  INPUT PLUGINS  ==========*/
	$(".inside").children('input').blur(function () {
		$(this).parent().children('.add-on').removeClass('input-focus');
	});

	$(".inside").children('input').focus(function () {
		$(this).parent().children('.add-on').addClass('input-focus');
	});

	$(".input-group.transparent").children('input').blur(function () {
		$(this).parent().children('.input-group-addon').removeClass('input-focus');
	});

	$(".input-group.transparent").children('input').focus(function () {
		$(this).parent().children('.input-group-addon').addClass('input-focus');
	});

	$(".bootstrap-tagsinput input").blur(function () {
		$(this).parent().removeClass('input-focus');
	});

	$(".bootstrap-tagsinput input").focus(function () {
		$(this).parent().addClass('input-focus');
	});



	/*==========  MAIN MENU  ==========*/
	$('.page-sidebar li > a').unbind('click');
	$('.page-sidebar li > a').on('click', function (e) {
		if ($(this).next().hasClass('sub-menu') === false) {
				return;
		}
		var parent = $(this).parent().parent();


		console.log('li > a on click event');
		parent.children('li.open').children('a').children('.arrow').removeClass('open');
		parent.children('li.open').children('a').children('.arrow').removeClass('active');
		parent.children('li.open').children('.sub-menu').slideUp(200);
		parent.children('li').removeClass('open');
		//  parent.children('li').removeClass('active');

		var sub = $(this).next();
		if (sub.is(":visible")) {
				console.log('remove open');
				$('.arrow', $(this)).removeClass("open");
				$(this).parent().removeClass("active");
				sub.slideUp(200, function () {
						handleSidenarAndContentHeight();
				});
		} else {
				console.log('add open');
				$('.arrow', $(this)).addClass("open");
				$(this).parent().addClass("open");
				sub.slideDown(200, function () {
						handleSidenarAndContentHeight();
				});
		}

		e.preventDefault();
	});
	//Auto close open menus in Condensed menu
	if ($('.page-sidebar').hasClass('mini')) {
		var elem = $('.page-sidebar ul');
		elem.children('li.open').children('a').children('.arrow').removeClass('open');
		elem.children('li.open').children('a').children('.arrow').removeClass('active');
		elem.children('li.open').children('.sub-menu').slideUp(200);
		elem.children('li').removeClass('open');
	}


	
	/*==========  Element Background and height  ==========*/
	$('[data-height-adjust="true"]').each(function () {
		var h = $(this).attr('data-elem-height');
		$(this).css("min-height", h);
		$(this).css('background-image', 'url(' + $(this).attr("data-background-image") + ')');
		$(this).css('background-repeat', 'no-repeat');
		if ($(this).attr('data-background-image')) {
		}
	});

	$('[data-aspect-ratio="true"]').each(function () {
			$(this).height($(this).width());
	});

	$('[data-sync-height="true"]').each(function () {
			equalHeight($(this).children());
	});

	$(window).resize(function () {
			$('[data-aspect-ratio="true"]').each(function () {
					$(this).height($(this).width());
			});
			$('[data-sync-height="true"]').each(function () {
					equalHeight($(this).children());
			});

	});
 // initMainMenu();
	

	/*==========  BEGIN Fixed Menu  ==========*/
	function initMainMenu() {
	}
	initExtendedLayoutMenuScroll();
	function initExtendedLayoutMenuScroll(){
	}


	/*==========  TOOLTIP  ==========*/
	$('.tip').tooltip();



	/*==========  BEGIN Horinzontal Menu  ==========*/
	$('.horizontal-menu .bar-inner > ul > li').on('click', function () {
			$(this).toggleClass('open').siblings().removeClass('open');

	});
	 if($('body').hasClass('horizontal-menu')){
			$('.content').on('click', function () {
					$('.horizontal-menu .bar-inner > ul > li').removeClass('open');
			});
	 }
	


	/*==========  BEGIN Lazyload images  ==========*/
	$('.lazy').unveil(0,function(){
		$(this).load(function() {
			// console.log('ads');
		});
	});


	/*==========  GRID  ==========*/
	$('.grid .tools a.remove').on('click', function () {
			var removable = jQuery(this).parents(".grid");
			if (removable.next().hasClass('grid') || removable.prev().hasClass('grid')) {
					jQuery(this).parents(".grid").remove();
			} else {
					jQuery(this).parents(".grid").parent().remove();
			}
	});

	$('.grid .tools a.reload').on('click', function () {
			var el = jQuery(this).parents(".grid");
			blockUI(el);
			window.setTimeout(function () {
					unblockUI(el);
			}, 1000);
	});

	$('.grid .tools .collapse, .grid .tools .expand').on('click', function () {
			var el = jQuery(this).parents(".grid").children(".grid-body");
			if (jQuery(this).hasClass("collapse")) {
					jQuery(this).removeClass("collapse").addClass("expand");
					el.slideUp(200);
			} else {
					jQuery(this).removeClass("expand").addClass("collapse");
					el.slideDown(200);
			}
	});

	$('.user-info .collapse').on('click', function () {
			jQuery(this).parents(".user-info ").stop().slideToggle(400, "swing");
	});


	var handleSidenarAndContentHeight = function () {
			var content = $('.page-content');
			var sidebar = $('.page-sidebar');

			if (!content.attr("data-height")) {
					content.attr("data-height", content.height());
			}

			if (sidebar.height() > content.height()) {
					content.css("min-height", sidebar.height() + 120);
			} else {
					content.css("min-height", content.attr("data-height"));
			}
	};
	$('.panel-group').on('hidden.bs.collapse', function (e) {
			$(this).find('.panel-heading').not($(e.target)).addClass('collapsed');
	});

	$('.panel-group').on('shown.bs.collapse', function (e) {
			// $(e.target).prev('.accordion-heading').find('.accordion-toggle').removeClass('collapsed');
	});

	

	/*==========  BEGIN Layout Readjust  ==========*/
	$(window).setBreakpoints({
			distinct: true,
			breakpoints: [
			320,
			480,
			768,
			1024]
	});
	//Break point entry 
	$(window).bind('enterBreakpoint320', function () {
			$('#main-menu-toggle-wrapper').show();
			$('#header_inbox_bar').hide();
			$('#main-menu').removeClass('mini');
			$('.page-content').removeClass('condensed');
	});

	$(window).bind('enterBreakpoint480', function () {
			$('#main-menu-toggle-wrapper').show();
			$('.header-seperation').show();
			$('#header_inbox_bar').hide();
			//Incase if condensed layout is applied
			$('#main-menu').removeClass('mini');
			$('.page-content').removeClass('condensed');
	});

	$(window).bind('enterBreakpoint768', function () {
			$('#main-menu-toggle-wrapper').show();
			$('#header_inbox_bar').hide();

			if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					$('#main-menu').removeClass('mini');
					$('.page-content').removeClass('condensed');
			}

	});
	
	
	$(window).bind('enterBreakpoint1024', function () {
			if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					var elem = jQuery('.page-sidebar ul');
					elem.children('li.open').children('a').children('.arrow').removeClass('open');
					elem.children('li.open').children('a').children('.arrow').removeClass('active');
					elem.children('li.open').children('.sub-menu').slideUp(200);
					elem.children('li').removeClass('open');
			}
			$('.bar').show();
			$('.bar').css('overflow','visible');
	});

	$(window).bind('exitBreakpoint320', function () {
			$('#main-menu-toggle-wrapper').hide();
			$('#header_inbox_bar').show();
	});

	$(window).bind('exitBreakpoint480', function () {
			$('#main-menu-toggle-wrapper').hide();
			$('#header_inbox_bar').show();
	});

	$(window).bind('exitBreakpoint768', function () {
			$('#main-menu-toggle-wrapper').hide();
			$('#header_inbox_bar').show();
	});


	/*==========  BEGIN Main Menu Toggle  ==========*/
	$('#layout-condensed-toggle').click(function () {
			if ($('#main-menu').attr('data-inner-menu') == '1') {
					//Do nothing
					console.log("Menu is already condensed");
			} else {
					if ($('#main-menu').hasClass('mini')) {
							$('body').removeClass('grey');
							$('body').removeClass('condense-menu');
							$('#main-menu').removeClass('mini');
							$('.page-content').removeClass('condensed');
							$('.scrollup').removeClass('to-edge');
							$('.header-seperation').show();
							//Bug fix - In high resolution screen it leaves a white margin
							$('.header-seperation').css('height', '61px');
							$('.footer-widget').show();
					} else {
							$('body').addClass('grey');
							$('#main-menu').addClass('mini');
							$('.page-content').addClass('condensed');
							$('.scrollup').addClass('to-edge');
							$('.header-seperation').hide();
							$('.footer-widget').hide();
					}
			}
	});

	$('#horizontal-menu-toggle').click(function () {
			if($('body').hasClass('breakpoint-480') || $('body').hasClass('breakpoint-320') ){
					$('.bar').slideToggle(200, "linear");
			}
	});


	$(window).resize(function () {
			calculateHeight();
	});

	$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
					$('.scrollup').fadeIn();
			} else {
					$('.scrollup').fadeOut();
			}
	});
	
	$('.scrollup').click(function () {
			$("html, body").animate({
					scrollTop: 0
			}, 700);
			return false;
	});
	
	/*==========  BEGIN dropdow menu  ==========*/
	$('.dropdown-toggle').click(function () {
	});

	var notificationListShown = false
	$('#my-task-list').click(function() {
		if (notificationListShown) {
			$('#notification-list').fadeOut();
		} else {
			$('#notification-list').fadeIn();
		}
		notificationListShown = !notificationListShown
	});

});

/*-----  End of DOCUMENT READY FUNCTIONS  ------*/