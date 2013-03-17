/*******************
* SAMPLE PRODUCTS  *
********************/
var productData = 
{
    "products": [
	{
		// Product Name
		"name" : "Magical Unicorn",

		// Product ID
		"id" : "101010",

		// Price
		"price" : 999999.99,

		// Groups are used to orginize products in the store
		"groups" : {

			// Add to spotlight section.
			// Requires spotlight image in "imgs" settings)
			"spotlight" : true,

			// Add to featured section
			"featured" : false,

			// Assign product to a category
			"category" : "Pets"
	    },

		// "desc" is used in various places to
		// describe or better yet sell your product
		"desc" : {

			// A short description of the product
			"short" : "An awesome Unicorn that's Magical!",

			// A long description of the product. You can add HTML tags.
			"long" : "<p>The <strong>unicorn</strong> is a legendary magical animal from European folklore that resembles a white horse with a large, pointed, spiraling horn projecting from its forehead, and sometimes a goat's beard.</p><p>Buy One Now! It's Magical!!</p>"
	    },

		// Images to show show off the product ("main" and "thumb" are required).
		"imgs" : {

			// URL for the main image of this product (default size = 133x100)
			"main" : "http://your-domain.com/path/to/main_img.png",

			// URL for the thumbnail image of this product (default size = 75x56)
			"thumb" : "http://your-domain.com/path/to/thumb.png",

			// URL for the spotlight image of this product. Only required if this
			// product is included in the spotlight group (default size = 322x210)
			"spotlight" : "http://your-domain.com/path/to/spotlight_img.png"
	    },
		// Product options to display before adding to cart separated into groups
		"options" : [
			{
				// Option name
				"name" : "Color",

				// enable/disable multiple selection
				"multiple" : false,

				// list of selections for this option 
				"selections" : ["Black", "Brown", "White"]
			},
			{
				// Option name
				"name" : "Size",

				// enable/disable multiple selection
				"multiple" : false,

				// list of selections for this option
				"selections" : ["X-Small", "Small", "Medium", "Large", "X-Large"]
			},
			{
				// Option name
				"name" : "Other Options",

				// enable/disable multiple selection
				"multiple" : true,

				// list of selections for this option
				"selections" : ["Horeshoe", "Saddle", "Brush"]
			}
		]
	},
	{
        "name": "How To Train A Magical Unicorn",
        "id": "100100100",
        "price": 999.99,
        "groups": {
            "spotlight": false,
            "featured": true,
            "category": "Books"
        },
        "desc": {
            "short": "Learn to train your new magical Unicorn. ",
            "long": "<p>Want to teach your magical unicorn how to make rainbows? How about walking on air? Now you can with this amazing how-to book</p>"
        },
        "imgs": {
            "main": "http://your-domain.com/path/to/main_img.png",
            "thumb": "http://your-domain.com/path/to/thumb.png",
            "spotlight": "http://your-domain.com/path/to/spotlight_img.png"
        }
    }]
}