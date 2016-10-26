/* scripts/controllers/TimeEntry.js */
    
(function() {
    
    'use strict';
    angular
        .module('customsregister')
        .controller('CustomsRecordManager',  CustomsRecordManager);

    function CustomsRecordManager(customs, $sce,  $window, $timeout, $cookies) {

            // vm is our capture variable
            var vm = this;
            vm.init = function () {
                vm.email = 'accountant@mydomain.com';
                vm.password = 'Test@123';
                vm.token = '';
				
				vm.expireDate = new Date();
                vm.expireDate.setDate(vm.expireDate.getDate() + 365);
				
				vm.token = $cookies.get('auth_token');
				
				vm.retrieved = {};
				vm.retrieved.receipt = {
						b17_debit:"24000/-",
						balance_quantity:"1300",
						balance_value:"6,89,567/-",
						bill_date:"2011-08-17",
						bill_number:"123456",
						description:"New Imported Item",
						duty:"2,12,145/-",
						invoice_date:"2011-07-17",
						invoice_no:"TY123/78",
						procurement_certificate:"132-98",
						procurement_date:"2011-08-17",
						receipt_timestamp:"2011-08-17 11:11:11",
						transport_registration:"UX12 5614M",
						unit_quantity:"1300",
						unit_weight:"1600 Kg",
						value:"6,89,567/-"
					}

         	}
            
			// ++ Sign In Function Started
            vm.signin = function(email,pwd) {
				customs.signin(email,pwd).then(function(results) {
                	if ( results.data ) {
						vm.token = results.data.token ;
						
						// Setting a cookie
						$cookies.put('auth_token',vm.token, {'expires': vm.expireDate});
						vm.email = '';
						vm.password = '';
					} else {
						bootbox.alert("Sign In Failed" , function() {});
					}
                    console.log(results);
                }, function(error) {
                  console.log(error);
                });
            }
			// -- Sign In Function Ended
			
			// ++ Create Receipt
            vm.update = function(receipt) {
				vm.retrieved.receipt = receipt;
				customs.addreceipt(receipt , vm.token).then(function(results) {
                	if ( results.data  && results.data.message === "Receipt Recorded") {
						bootbox.alert("Recipt Created" , function() {});
						vm.receipt_to_add = {};
					} else {
						bootbox.alert("Recipt Creation Failed" , function() {});
						vm.retrieved.receipt = {};
					}
                    console.log(results);
                }, function(error) {
                  console.log(error);
                });
				
				console.log("OK");
            }
			// -- Sign In Function Ended
			
    }
})();
