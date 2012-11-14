/**********************************************
* Use this file to send order information to  *
* your server for order fulfillment.          *
***********************************************/
var ProcessOrder = {

	// Called when order is successful via PayPal
	success : function(order, transactionId){
		$.info('Payment Success.  TransactionID: ' + transactionId);
		$.info('Order Data = ' + JSON.stringify(order));
		Ti.UI.createAlertDialog({
		    title   : config.PAYMENT_SUCCESS_MESSAGE.TITLE,
		    message : config.PAYMENT_SUCCESS_MESSAGE.MESSAGE
		}).show();
	},

	// Called when order was cancelled by user during PayPal flow
	cancelled : function(order){
		$.info('Payment Canceled');
	},

	// Called if an error occurs during PayPal transaction
	failed : function(order, errorCode, errorMessage){
		$.info('Payment Error');
		$.info('errorCode: ' + errorCode);
	    $.info('errorMessage: ' + errorMessage);
		alert(errorMessage);
	}
};