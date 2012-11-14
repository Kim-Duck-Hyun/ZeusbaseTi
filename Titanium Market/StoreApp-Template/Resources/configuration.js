var config = {
	// Background Color for the Spotlight section
	"SPOTLIGHT_BG_COLOR" : "#191919",

	// Background Image for the Spotlight section (not required)
	"SPOTLIGHT_BG_IMAGE" : null,

	// Default thumb image
	"PRODUCTS_DEFAULT_THUMB_IMAGE" : "path/to/default_thumb.png",

	// Default main image
	"PRODUCTS_DEFAULT_MAIN_IMAGE" : "path/to/default_main.png",

	// Default spotlight image
	"PRODUCTS_DEFAULT_SPOTLIGHT_IMAGE" : "path/to/default_spotlight.png",

	// Info screens (titles & webview urls)
	"INFO_SCREENS" : [
		{
			"TITLE" : "About Rockable",
			"URL"   : "http://rockablepress.com/about-us/"
		},
		{
			"TITLE" : "Our Guarantee",
			"URL"   : "http://rockablepress.com/our-guarantee/"
		}
	],

	// PayPal App ID Issued by PayPal (set to "null" for testing)
	"PAYPAL_APP_ID" : "null",

	// PayPal payment recipient email (so you get paid)
	"PAYPAL_RECIPIENT" : "add_email_here",

	// PayPal transaction type (HARD_GOODS, SERVICE or PERSONAL)
	"PAYPAL_TRANSACTION_TYPE" : "SERVICE",

	// PayPal payment environment (LIVE, SANDBOX or NONE)
	"PAYPAL_ENVIRONMENT" : "SANDBOX",

	// Whether or not to select/send PayPal shipping information
	"PAYPAL_ENABLE_SHIPPING" : false,

	// Merchant Name used in PayPal transaction (default to app name)
	"MERCHANT_NAME" : Ti.App.name,

	// URL for product list on server
	"PRODUCT_LIST_URL" : "http://www.your-domain.com/path/to/Products.js",

	// Successful Payment Message
	"PAYMENT_SUCCESS_MESSAGE" : {
		"TITLE"   : "Payment successful!",
		"MESSAGE" : "Thank You for your purchase!"
	}
};