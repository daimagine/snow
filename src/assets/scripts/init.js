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
	$('.page-sidebar li > a').on('click', function (e) {
		if ($(this).next().hasClass('sub-menu') === false) {
				return;
		}
		var parent = $(this).parent().parent();


		parent.children('li.open').children('a').children('.arrow').removeClass('open');
		parent.children('li.open').children('a').children('.arrow').removeClass('active');
		parent.children('li.open').children('.sub-menu').slideUp(200);
		parent.children('li').removeClass('open');
		//  parent.children('li').removeClass('active');

		var sub = $(this).next();
		if (sub.is(":visible")) {
				$('.arrow', $(this)).removeClass("open");
				$(this).parent().removeClass("active");
				sub.slideUp(200, function () {
						handleSidenarAndContentHeight();
				});
		} else {
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


	
	/*==========  BEGIN dropdow menu  ==========*/
	$('.dropdown-toggle').click(function () {
	});



	/*==========  BEGIN Function calls  ==========*/
	$('table th .checkall').on('click', function () {
		$(this).closest('table').find(':checkbox').prop('checked', this.checked); 
	});


	/*==========  LIVE PREVIEW  ==========*/
	$('#productContent').on('keyup', function(e){
		$('.livePreview p span').text($(this).val());
	});
	


	/*==========  ANIMATE NUMBER  ==========*/
	$('.animate-number').each(function () {
			$(this).animateNumbers($(this).attr("data-value"), true, parseInt($(this).attr("data-animation-duration"), 10));
	});
	$('.animate-progress-bar').each(function () {
			$(this).css('width', $(this).attr("data-percentage"));
	});


	/*==========  EQUALIZE HEIGHT PLUGIN  ==========*/
	$('.equalize').equalize({
		children: '.equalizer',
		equalize: 'innerHeight'
	});
	

	/*==========  BOOTSTRAP WIZARD  ==========*/

	//Form Wizard Validations
	var $validator = $("#addProduct").validate({
		rules: {
			productName: {
				required: true
			},
			productDesc: {
				required: true
			},
			productStock: {
				required: true,
				number: true
			},
			productPrice: {
				required: true
			},
			productLocation: {
				required: true
			}
		},
		errorPlacement: function(label, element) {
			$('<span class="arrow"></span>').insertBefore(element);
			$('<span class="error"></span>').insertAfter(element).append(label)
		}
	});

			
	$('#addProductWizard').bootstrapWizard({
		'tabClass': 'form-wizard',
		'onNext': function(tab, navigation, index) {
			var $valid = $("#addProduct").valid();
			if(!$valid) {
				$validator.focusInvalid();
				return false;
			} else {
				$('#addProductWizard').find('.form-wizard').children('li').eq(index-1).addClass('complete');
				$('#addProductWizard').find('.form-wizard').children('li').eq(index-1).find('.step').html('<i class="fa fa-check"></i>');	
			}
			var uploaderPreview = $('.dz-preview');
			if($("#productType").val() == 'digital') {
				if($(uploaderPreview).is('.dz-error')) {
					return false;
				} else {
					$('#addProductWizard').find('.form-wizard').children('li').eq(index-1).addClass('complete');
					$('#addProductWizard').find('.form-wizard').children('li').eq(index-1).find('.step').html('<i class="fa fa-check"></i>');	
				}
				if(!$(uploaderPreview)[1]) {
					$('.validation-file-uploader').removeClass('uploader-empty');
					$('.validation-file-uploader').addClass('uploader-error');
					return false;
				} else {
					$('#addProductWizard').find('.form-wizard').children('li').eq(index-1).addClass('complete');
					$('#addProductWizard').find('.form-wizard').children('li').eq(index-1).find('.step').html('<i class="fa fa-check"></i>');	
				}
			} else {
				$('#addProductWizard').find('.form-wizard').children('li').eq(index-1).addClass('complete');
				$('#addProductWizard').find('.form-wizard').children('li').eq(index-1).find('.step').html('<i class="fa fa-check"></i>');	
			}
		},
		'onTabClick': function(tab, navigation, index) {
			return false;
		},
		'onFinish': function() {
			console.log('wizard finish!');
		}
	 });
	
	/*-----  End of BOOTSTRAP WIZARD  ------*/



	/*==========  SELECT2  ==========*/
	$(".select2").select2();

	$(".select2").on("change", function() {
		console.log($(this).val());
		if( $(this).val() == 'digital') {
			$('.digitalNeeds').show();
		}
		else if( $(this).val() == 'retail') {
			$('.digitalNeeds').hide();
		}  
	});


	/*==========  TAGS INPUT  ==========*/



	/*==========  INPUTMASK  ==========*/
	$(function($){
		$(".maskDate").inputmask("99/99/9999");
		$(".maskPhone").inputmask("(9999) 999-9999");
	});



	/*==========  DROPZONE  ==========*/
	$('.dz-uploader').dropzone({
		url: 'javascript:;',
		acceptedFiles: 'image/*',
		maxFiles:1,
		init: function() {
			this.on("maxfilesexceeded", function(file) {
				this.removeAllFiles();
				this.addFile(file);
			});
		}
	});

	$('.dz-uploader-unlimited').dropzone({
		url: 'javascript:;',
		acceptedFiles: 'image/*'
	});

	$('.validation-file-uploader').dropzone({
		url: 'javascript:;',
		acceptedFiles: 'image/*',
		maxFiles:1,
		init: function() {
			this.on("maxfilesexceeded", function(file) {
				this.removeAllFiles();
				this.addFile(file);
			});
			this.on("error", function(file) {
				$('.validation-file-uploader').addClass('uploader-error');
				$('.validation-file-uploader').removeClass('uploader-empty');
			});
			if(!$('.dz-preview')[1]) {
				$('.validation-file-uploader').addClass('uploader-empty');
			} else {
				// no further validation
			}
		}
	});
	

	/*==========  ADD FORM  ==========*/
	$.fn.editable.defaults.ajaxOptions = {type: "PUT"};
	//modify buttons style
	$.fn.editableform.buttons = '<button type="submit" class="btn btn-success editable-submit btn-mini"><i class="fa fa-check"></i></button>' +'<button type="button" class="btn editable-cancel btn-mini"><i class="fa fa-close"></i></button>';
	$('.editable').editable({
	});

	$('.addTextField').on('click', function(){
		console.log('text field clicked');
		var textField = '<div class="textField clearfix"> <div class="pull-right"><a href="javascript:;" class="removeField btn btn-danger btn-mini"><span class="fa fa-close"></span></a></div> <div class="col-sm-12"> <div class="form-group"> <label class="form-label"><a href="javascript:;" data-type="text" data-placement="right" class="editable">Edit Label</a>&nbsp;:</label> <input type="text" class="form-control"> </div> </div> </div>'
		$('.newform').append(textField);
		$('.editable').editable({
		});

		$('.removeField').on('click', function() {
			console.log('removeField clicked');
			$(this).parent().parent().remove();
		});

	});


	/*==========  GRAPHS  ==========*/

	var d2 = [
						[1, 30],
						[2, 20],
						[3, 10],
						[4, 30],
						[5,15],
						[6, 25],
						[7, 40]
	];
	var d1 = [
						[1, 30],
						[2, 30],
						[3, 20],
						[4, 40],
						[5, 30],
						[6, 45],
						[7, 50],
	];
	$('#plotPlaceholder00').exists(function(){
		var plot = $.plotAnimator($("#plotPlaceholder00"), [
				{  	label: "Label 1",
					data: d2,
					lines: {
						fill: 0.6,
						lineWidth: 0,
					},
					color:['#f89f9f']
				},{ 
					data: d1,
					animator: {steps: 60, duration: 1000, start:0},
					lines: {lineWidth:2},
					shadowSize:0,
					color: '#f35958'
				},{
					data: d1, 
					points: { show: true, fill: true, radius:6,fillColor:"#f35958",lineWidth:3 },	
					color: '#fff',
					shadowSize:0
				},
				{	label: "Label 2",
					data: d2, 
					points: { show: true, fill: true, radius:6,fillColor:"#f5a6a6",lineWidth:3 },	
					color: '#fff',
					shadowSize:0
				}
			],{	xaxis: {
			tickLength: 0,
			tickDecimals: 0,
			min:2,

					font :{
						lineHeight: 13,
						style: "normal",
						weight: "bold",
						family: "sans-serif",
						variant: "small-caps",
						color: "#6F7B8A"
					}
				},
				yaxis: {
					ticks: 3,
									tickDecimals: 0,
					tickColor: "#f0f0f0",
					font :{
						lineHeight: 13,
						style: "normal",
						weight: "bold",
						family: "sans-serif",
						variant: "small-caps",
						color: "#6F7B8A"
					}
				},
				grid: {
					backgroundColor: { colors: [ "#fff", "#fff" ] },
					borderWidth:1,borderColor:"#f0f0f0",
					margin:0,
					minBorderMargin:0,
					labelMargin:20,
					hoverable: true,
					clickable: true,
					mouseActiveRadius:6
				},
				legend: { show: false}
			});


		$("#plotPlaceholder00").bind("plothover", function (event, pos, item) {
					if (item) {
						var x = item.datapoint[0].toFixed(2),
							y = item.datapoint[1].toFixed(2);

						$("#tooltip").html(item.series.label + " of " + x + " = " + y)
							.css({top: item.pageY+5, left: item.pageX+5})
							.fadeIn(200);
					} else {
						$("#tooltip").hide();
					}
		
			});
		
		$("<div id='tooltip'></div>").css({
				position: "absolute",
				display: "none",
				border: "1px solid #fdd",
				padding: "2px",
				"background-color": "#fee",
				"z-index":"99999",
				opacity: 0.80
		}).appendTo("body");
	});


	$('.generateReport li a').on('click', function(){
		if($(this).hasClass('customRangeGenerate')) {
			$('.customGenerate').show();
		} else {
			$('.customGenerate').hide();
		}
	});

	/*==========  DATEPICKER  ==========*/
	$('.input-append.reportDate').datepicker({
			autoclose: true,
			todayHighlight: true
	});


	/*==========  OWLCAROUSEL  ==========*/
	$('#product-carousel').owlCarousel({
		items: 1,
		loop: true,
		autoHeight: true,
		dots: false,
		nav: true,
		navText: ['<span class=\'fa fa-chevron-left\'></span>','<span class=\'fa fa-chevron-right\'></span>']
	});



	
	/*==========  BEGIN Tiles Controller Options  ==========*/
	$('.widget-item > .controller .reload').click(function () {
			var el = $(this).parent().parent();
			blockUI(el);
			window.setTimeout(function () {
					unblockUI(el);
			}, 1000);
	});
	$('.widget-item > .controller .remove').click(function () {
			$(this).parent().parent().parent().addClass('animated fadeOut');
			$(this).parent().parent().parent().attr('id', 'id_remove_temp_id');
			setTimeout(function () {
					$('#id_remove_temp_id').remove();
			}, 400);
	});

	$('.tiles .controller .reload').click(function () {
			var el = $(this).parent().parent().parent();
			blockUI(el);
			window.setTimeout(function () {
					unblockUI(el);
			}, 1000);
	});
	$('.tiles .controller .remove').click(function () {
			$(this).parent().parent().parent().parent().addClass('animated fadeOut');
			$(this).parent().parent().parent().parent().attr('id', 'id_remove_temp_id');
			setTimeout(function () {
					$('#id_remove_temp_id').remove();
			}, 400);
	});
	if (!jQuery().sortable) {
			return;
	}
	$(".sortable").sortable({
			connectWith: '.sortable',
			iframeFix: false,
			items: 'div.grid',
			opacity: 0.8,
			helper: 'original',
			revert: true,
			forceHelperSize: true,
			placeholder: 'sortable-box-placeholder round-all',
			forcePlaceholderSize: true,
			tolerance: 'pointer'
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


	/*==========  DATA TABLE  ==========*/

	$('#dataTable-00').exists(function(){
		$.extend( true, $.fn.dataTable.defaults, {
			"sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span12'p i>>",
			"sPaginationType": "bootstrap",
			"oLanguage": {
				"sLengthMenu": "_MENU_"
			}
		});
		/* Default class modification */
		$.extend( $.fn.dataTableExt.oStdClasses, {
			"sWrapper": "dataTables_wrapper form-inline"
		});
		/* API method to get paging information */
		$.fn.dataTableExt.oApi.fnPagingInfo = function ( oSettings )
		{
			return {
				"iStart":         oSettings._iDisplayStart,
				"iEnd":           oSettings.fnDisplayEnd(),
				"iLength":        oSettings._iDisplayLength,
				"iTotal":         oSettings.fnRecordsTotal(),
				"iFilteredTotal": oSettings.fnRecordsDisplay(),
				"iPage":          oSettings._iDisplayLength === -1 ?
					0 : Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength ),
				"iTotalPages":    oSettings._iDisplayLength === -1 ?
					0 : Math.ceil( oSettings.fnRecordsDisplay() / oSettings._iDisplayLength )
			};
		};
		/* Bootstrap style pagination control */
		$.extend( $.fn.dataTableExt.oPagination, {
			"bootstrap": {
				"fnInit": function( oSettings, nPaging, fnDraw ) {
					var oLang = oSettings.oLanguage.oPaginate;
					var fnClickHandler = function ( e ) {
						e.preventDefault();
						if ( oSettings.oApi._fnPageChange(oSettings, e.data.action) ) {
							fnDraw( oSettings );
						}
					};

					$(nPaging).addClass('pagination').append(
						'<ul>'+
							'<li class="prev disabled"><a href="#"><i class="fa fa-chevron-left"></i></a></li>'+
							'<li class="next disabled"><a href="#"><i class="fa fa-chevron-right"></i></a></li>'+
						'</ul>'
					);
					var els = $('a', nPaging);
					$(els[0]).bind( 'click.DT', { action: "previous" }, fnClickHandler );
					$(els[1]).bind( 'click.DT', { action: "next" }, fnClickHandler );
				},

				"fnUpdate": function ( oSettings, fnDraw ) {
					var iListLength = 5;
					var oPaging = oSettings.oInstance.fnPagingInfo();
					var an = oSettings.aanFeatures.p;
					var i, ien, j, sClass, iStart, iEnd, iHalf=Math.floor(iListLength/2);

					if ( oPaging.iTotalPages < iListLength) {
						iStart = 1;
						iEnd = oPaging.iTotalPages;
					}
					else if ( oPaging.iPage <= iHalf ) {
						iStart = 1;
						iEnd = iListLength;
					} else if ( oPaging.iPage >= (oPaging.iTotalPages-iHalf) ) {
						iStart = oPaging.iTotalPages - iListLength + 1;
						iEnd = oPaging.iTotalPages;
					} else {
						iStart = oPaging.iPage - iHalf + 1;
						iEnd = iStart + iListLength - 1;
					}

					for ( i=0, ien=an.length ; i<ien; i++ ) {
						// Remove the middle elements
						$('li:gt(0)', an[i]).filter(':not(:last)').remove();

						// Add the new list items and their event handlers
						for ( j=iStart ; j<=iEnd ; j++ ) {
							sClass = (j==oPaging.iPage+1) ? 'class="active"' : '';
							$('<li '+sClass+'><a href="#">'+j+'</a></li>')
								.insertBefore( $('li:last', an[i])[0] )
								.bind('click', function (e) {
									e.preventDefault();
									oSettings._iDisplayStart = (parseInt($('a', this).text(),10)-1) * oPaging.iLength;
									fnDraw( oSettings );
								} );
						}

						// Add / remove disabled classes from the static elements
						if ( oPaging.iPage === 0 ) {
							$('li:first', an[i]).addClass('disabled');
						} else {
							$('li:first', an[i]).removeClass('disabled');
						}

						if ( oPaging.iPage === oPaging.iTotalPages-1 || oPaging.iTotalPages === 0 ) {
							$('li:last', an[i]).addClass('disabled');
						} else {
							$('li:last', an[i]).removeClass('disabled');
						}
					}
				}
			}
		});

		var nCloneTh = document.createElement('th');
		var nCloneTd = document.createElement('td');
		nCloneTd.innerHTML = '<a href=\'javascript:;\'><i class="fa fa-plus-circle"></i></a>';
		nCloneTd.className = "center";
			 
		$('#dataTable-00 thead tr').each( function () {
			this.insertBefore(nCloneTh, this.childNodes[0]);
		});
		 
		$('#dataTable-00 tbody tr').each( function () {
			this.insertBefore(nCloneTd.cloneNode(true), this.childNodes[0]);
		});

		/* Formating function for row details */
		function fnFormatDetails ( oTable, nTr ) {
			var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;" class="inner-table">';
			sOut += '<tr><td>Link to source:</td><td>Could provide a link here</td></tr>';
			sOut += '<tr><td>Extra info:</td><td>And any further details here (images etc)</td></tr>';
			sOut += '</table>';
			return sOut;
		}

		var oTable = $('#dataTable-00').dataTable({
			"sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-12'p i>>",
				 "aaSorting": [],
					"oLanguage": {
				"sLengthMenu": "_MENU_ ",
				"sInfo": "Showing <b>_START_ to _END_</b> of _TOTAL_ entries"
			},
		});

		$('#dataTable-00_wrapper .dataTables_filter input').addClass("input-medium ");
		$('#dataTable-00_wrapper .dataTables_length select').addClass("select2-wrapper span12"); 

		$('#dataTable-00 tbody').on('click', 'i', function () {
			var nTr = $(this).parents('tr')[0];
			if ( oTable.fnIsOpen(nTr) ) {
				/* This row is already open - close it */
				$(this).removeClass("fa-minus-circle");
				$(this).addClass("fa-plus-circle");   
				oTable.fnClose( nTr );
			} else {
				/* Open this row */
				$(this).removeClass("fa-plus-circle");
				$(this).addClass("fa-minus-circle");   
				oTable.fnOpen( nTr, fnFormatDetails(oTable, nTr), 'details' );
			}
		});
		
		$(".select2-wrapper").select2({minimumResultsForSearch: -1});

		/* Formating function for row details */
		function fnFormatDetails ( oTable, nTr ) {
			var aData = oTable.fnGetData(nTr);
			var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;" class="inner-table">';
			sOut += '<tr><td>Product Name :</td><td>'+aData[1]+'</td></tr>';
			sOut += '<tr><td>Social Media :</td><td>Could provide a link here</td></tr>';
			sOut += '<tr><td>Comment :</td><td>And any further details here (images etc)</td></tr>';
			sOut += '</table>';
			return sOut;
		}
	});
	
	/*-----  End of DATA TABLE  ------*/


	/*===================================
	=            AUDIOPLAYER            =
	===================================*/
	
	$('#audioPlayer').exists(function(){
		soundManager.setup({
			url: 'swf/',
			flashVersion: 8, // optional: shiny features (default = 8)
			// optional: ignore Flash where possible, use 100% HTML5 mode
			// preferFlash: false,
			onready: function() {
				soundManager.createSound({
					autoLoad: true,
					autoPlay: false,
					volume: 100
				});
			}
		});
	});
	
	/*-----  End of AUDIOPLAYER  ------*/
	

	/*===================================
	=            VIDEOPLAYER            =
	===================================*/
	
	$('#previewVideo').exists(function(){
		$('#previewVideo').prettyEmbed({
			videoID: 'Cbti19KM3wk',
			// Embed controls
			showInfo: false,
			showControls: true,
			loop: false,
			colorScheme: 'dark',
			showRelated: false,
			useFitVids: true
		});
	});
	
	
	/*-----  End of VIDEOPLAYER  ------*/
	
	


});

/*-----  End of DOCUMENT READY FUNCTIONS  ------*/




/*=============================
=            DEBUG            =
=============================*/

// $('body.open-menu-left .page-content').on('touchstart', function (e) {
// 		alert("asd");
// });

/*-----  End of DEBUG  ------*/






/*========================================
=            RESIZE FUNCTIONS            =
========================================*/

$(window).resize(function () {
	 
});


/*-----  End of RESIZE FUNCTIONS  ------*/



/*==================================
=            PLAYGROUND            =
==================================*/

$(document).ready(function() {

	$('.input-append.playDate').datepicker({
			startView: 2,
			autoclose: true,
			todayHighlight: true,
			keyboardNavigation: false,
			startDate: ("01/01/1945"),
			endDate: ("01/01/1995")
	});

});


/*-----  End of PLAYGROUND  ------*/