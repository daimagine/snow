// @codekit-prepend "../../../bower_components/card/lib/js/jquery.card.js";
// @codekit-prepend "../../../bower_components/validetta/dist/validetta.min.js";

$(document).ready(function() {

	$('#payment').exists(function(){
				
			$('#payment').card({
				container: $('.card-wrapper'),
				formSelectors: {
					numberInput: 'input#cc_number', // optional — default input[name="number"]
					expiryInput: 'input#expiry', // optional — default input[name="expiry"]
					cvcInput: 'input#cvc', // optional — default input[name="cvc"]
					nameInput: 'input#card_holder_name' // optional - defaults input[name="name"]
				},
			});

			$("#payment-phone-number").keydown(function (e) {
				// Allow: backspace, delete, tab, escape, enter and .
				if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
					 // Allow: Ctrl+A
					(e.keyCode == 65 && e.ctrlKey === true) || 
					 // Allow: home, end, left, right
					(e.keyCode >= 35 && e.keyCode <= 39)) {
						 // let it happen, don't do anything
						 return;
				}
				// Ensure that it is a number and stop the keypress
				if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
					e.preventDefault();
				}
			});


			$("#homephone").keydown(function (e) {
				// Allow: backspace, delete, tab, escape, enter and .
				if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
					 // Allow: Ctrl+A
					(e.keyCode == 65 && e.ctrlKey === true) || 
					 // Allow: home, end, left, right
					(e.keyCode >= 35 && e.keyCode <= 39)) {
						 // let it happen, don't do anything
						 return;
				}
				// Ensure that it is a number and stop the keypress
				if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
					e.preventDefault();
				}
			});


			$('#payment').validetta({
					realTime: true,
					display : 'inline',
					errorTemplateClass : 'validetta-inline',
					errorClose : false,
					onValid : function( event ) {

					console.log("Checking Channel Default Value..");
					var channelName=$('#channelname').val().toUpperCase();
					if(channelName=='CREDIT CARD'){
						console.log("Check All Number And Everything..");
						
						var cc_number=$('#cc_number').val();
						var expiry_date=$('#expiry').val();
						var cvc=$('#cvc').val();
						var card_holder_name=$('#card_holder_name').val();
						
						console.log("=========================");
						console.log("cc_number:"+cc_number);
						console.log("expiry_date:"+expiry_date);
						console.log("cvc:"+cvc);
						console.log("card_holder_name:"+card_holder_name);
						console.log("=========================");

						if(cc_number==null||cc_number==undefined||cc_number==''
							||expiry_date==null||expiry_date==undefined||expiry_date==''
							||cvc==null||cvc==undefined||cvc==''
							||card_holder_name==null||card_holder_name==undefined||card_holder_name==''){
							event.preventDefault();
							alert("Masukkan semua input kartu kredit anda untuk melanjutkan transaksi..");
						}

						var validateCvc=$('#cvc').formance('validate_credit_card_cvc');
						var validateCC=$('#cc_number').formance('validate_credit_card_number');
						var validateExpiry=$('#expiry').formance('validate_credit_card_expiry');

						console.log("Hasil Validate CVC==>",validateCvc);
						console.log("Hasil Validate CC==>",validateCC);
						console.log("Hasil Validate Expiry==>",validateExpiry);

						
						var message='';
						var validateResult=true;

						if(validateCvc==null||validateCvc==null||validateCvc==false){
							validateResult=false;
							console.log("Cvc Error, Result==>",validateCvc);
							message=message+"CVV / CVC Tidak Valid ";
						}

						if(validateCC==null||validateCC==null||validateCC==false){
							validateResult=false;
							console.log("CC Error, Result==>",validateCC);
							message=message+"Credit Card Tidak Valid ";


						}

						if(validateExpiry==null||validateExpiry==null||validateExpiry==false){
							validateResult=false;
							console.log("Expiry Error, Result==>",validateExpiry);
							message=message+"Expiry Date Tidak Valid ";
						}

						if(validateResult==false){
							event.preventDefault();
							alert(message);
						}
						
					}
					console.log("Success");
					},onError : function(){
					console.log("Failed");
					}
			});


			var indexSelected=$('.tabber-menu a').prop('id');
			var channelNameSelected=$('.tabber-menu a').attr('data-channel-name');
			$('#channelname').val(channelNameSelected);
			$('#HASHPARAM').val(indexSelected);
			console.log("index selected HASHPARAM===>"+$('#HASHPARAM').val());
			console.log("name selected channelname===>"+$('#channelname').val());
			//console.log("id===>"+$('ul#tabChannel li.active').attr('id'));
			
			var activeTab = null;
			$('.tabber-menu').on('click', function (e) {
			activeTab = e.target;
			value=$(activeTab).prop('id');
			channelNameSelected=$(activeTab).attr('data-channel-name');
			
			console.log("acxtivetab===>"+value);
			console.log("channel name value===>"+channelNameSelected);
			$('#channelname').val(channelNameSelected);
			$('#HASHPARAM').val(value);
			});


			$('#birthdate').datepicker({
			nextText: "&nbsp;"
			,prevText: "&nbsp;"
			,changeMonth: true
			,changeYear: true
			,dateFormat: "dd/mm/yy"
			,yearRange: "1950:2000"
			});
	});

});
// document ready end