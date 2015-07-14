
$(document).ready(function() {

	//Form Wizard Validations
	var $validator = $("#addProduct").validate({
		rules: {
			productType: {
				required: true
			},
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
			},
			affiliateFee: {
				required: '#affiliateReady:checked',
				number: true
			}
		},
		errorPlacement: function(label, element) {
			$('<span class="arrow"></span>').insertBefore(element);
			$('<span class="error"></span>').insertAfter(element).append(label)
		}
	});

	var initForm = function() {
		$('#addProductWizard').bootstrapWizard({
			'tabClass': 'form-wizard',
			'onNext': function(tab, navigation, index) {
				var $valid = $("#addProduct").valid();
				if(!$valid) {
					$validator.focusInvalid();
					console.log('validator invalid');
					return false;
				} else {
					$('#addProductWizard').find('.form-wizard').children('li').eq(index-1).addClass('complete');
					$('#addProductWizard').find('.form-wizard').children('li').eq(index-1).find('.step').html('<i class="fa fa-check"></i>');	
				}

				var uploaderPreview = $('.dz-preview');
				console.log('wizard index ' + index);
				if($("#productType").val() == 'digital') {
					console.log('uploaderPreview', uploaderPreview);
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
			'onTabShow': function(tab, navigation, index) {
				var $total = navigation.find('li').length;
				var $current = index+1;
				// If it's the last tab then hide the last button and show the finish instead
				console.log('$current >= $total : ' + $current + ' >= ' + $total);
				if($current >= $total) {
					$('#addProductWizard').find('.wizard .next').hide();
					$('#addProductWizard').find('.wizard .finish').css('display', 'inline');
					$('#addProductWizard').find('.wizard .finish').removeClass('disabled');
				} else {
					$('#addProductWizard').find('.wizard .next').show();
					$('#addProductWizard').find('.wizard .finish').hide();
				}

			},
			'onTabClick': function(tab, navigation, index) {
				return false;
			},
			'onFinish': function() {
				console.log('wizard finish!');
			}
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

		/*==========  LIVE PREVIEW  ==========*/
		$('#productContent').on('keyup', function(e){
			$('.livePreview p span').text($(this).val());
		});

		/*==========  SELECT2  ==========*/
		$(".select2").select();

		$(".select2").on("change", function() {
			console.log($(this).val());
			if( $(this).val() == 'digital') {
				$('.digitalNeeds').show();
			}
			else if( $(this).val() == 'retail') {
				$('.digitalNeeds').hide();
			}  
		});
	}

	console.log('check if bootstrapWizard is loaded');
	var runWhenReady = function(){
        // Wait for the availability of the function
        if ($.fn.bootstrapWizard && $.fn.select){
	        console.log('bootstrapWizard loaded');
	        initForm();
        } else {
            setTimeout(runWhenReady, 50);
            return;
        }
    };
    runWhenReady();

});