loadScript('/assets/scripts/global.min.js', function(){
	loadScript('/assets/scripts/plugins.min.js', function(){
		loadScript('/assets/scripts/init-minimal.min.js');

		if ($.fn.bootstrapWizard) {
			console.log('dashboard: bootstrapWizard loaded');
		} else {
			console.log('dashboard: bootstrapWizard is not loaded')
		}
	});
});