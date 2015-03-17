var spaza = require('./spaza_shop_functions');

//Print the logo first then execute the rest of the functions
var logo = spaza.print_logo("Nelisa's Spaza Shop", function(){

	//Get selling items and sales history into variables
	var selling_items = spaza.get_selling_items("Nelisa Sales History.csv");
	var sales_history = spaza.get_sales_history("Nelisa Sales History.csv")

	//console.log(selling_items);

	//Get most popular products, write them to file and print to console as well
	var popularity = spaza.get_popular_products(selling_items, sales_history);
	spaza.write_to_file("popular_products.csv", popularity, 2);
	//console.log(popularity)
	console.log("THE MOST POPULAR PRODUCT: " + popularity[0]["product"] + " - Sales: " + popularity[0]["sold_no"])

	//Get most popular categories, print the to console and write to file as well
	var popular_categories = spaza.get_popular_category(popularity);
	spaza.write_to_file("popular_categories.csv", popular_categories, 2);

	console.log("MOST POPULAR CATEGORY: " + popular_categories[0]["product"] + " - Sales: " + popular_categories[0]["sold_no"]);
	console.log("LEAST POPULAR PRODUCT: " + popularity[popularity.length-1]["product"] + " - Sales: " + popularity[popularity.length-1]["sold_no"]);
	console.log("LEAST POPULAR CATEGORY: " + popular_categories[popular_categories.length-1]["product"] + " - Sales: " + popular_categories[popular_categories.length-1]["sold_no"]);

	//Get the most regular sales
	var regular_sales  = spaza.get_regular_sales(sales_history, selling_items);
	//console.log(regular_sales);
	spaza.write_to_file("most_regular_sales.csv", regular_sales, 2);
	console.log("MOST REGULAR SALES" + "\n-----------------------------------")
	regular_sales.forEach(function(item){
		console.log(item["product"] + "   " + item["sold_no"]);
	});

	var purchase_history = spaza.get_purchase_history("NelisaPurchases.csv");
	//console.log(purchase_history);

	var entire_stock = spaza.get_entire_stock(selling_items, purchase_history);
	//console.log(entire_stock)

	console.log(	)
	var stock_rates = spaza.get_stock_rates(entire_stock, popularity);
	stock_rates.forEach(function(item){
		console.log(item["product"] + "   " + item["remaining_stock"] + "    " + item["percent_left"])
	})
});