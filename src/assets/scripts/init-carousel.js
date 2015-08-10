loadScript('/assets/scripts/global.min.js', function(){
	loadScript('/assets/scripts/plugins.min.js', function(){
		loadScript('/assets/scripts/init-minimal.min.js', function() {
			loadScript('/assets/scripts/slick.min.js', function() {
				$(document).ready(function () {
					var slickOpts = {
				        lazyLoad: 'ondemand',
					    slidesToShow: 1,
					    slidesToScroll: 1,
					    arrows: true,
					    dots: true,
					    mobileFirst: true,
					    adaptiveHeight: true,
					    autoplay: true,
					    swipe: true
				    };
				    // Init the slick
				    $('#product-carousel').slick(slickOpts);
				    $('#product-carousel').fadeIn();
				});
			});
		});
	});
});