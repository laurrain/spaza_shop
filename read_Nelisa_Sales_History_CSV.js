function print_logo (callback) {
	// body...
	var logo = require('figlet');

	logo("Nelisa's Spaza Shop!!!", function(err, data){
		if(err)
			throw err;

		process.stdout.write(data + "\n");
		callback();
	});
}

function bubbleSort (array) {
	// body...

	for(var i = 0; i < array.length; i++){
		for (var k = 0; k < array.length-1; k++) {
			if(array[k]["sold_no"] < array[k+1]["sold_no"]){
				var temp = array[k];
				array[k] = array[k+1];
				array[k+1] = temp;
				//console.log(array[k]["sold_no"]);
			}
		};
	};
}


function write_to_file (filename, data, data_nummer) {
	// body...

	/*var file_ops = require('fs');

	if(data_nummer === null || data_nummer === 1){ 
		file_ops.writeFile(filename, "", function(err){
			if(err) throw err;
		});

		console.log('');
		data.forEach(function(item){
			file_ops.appendFile(filename, item + '\n', function(err){
				if(err) throw err;

				//console.log(item);
			});
		});
	}
	
	else{
		console.log('');
		file_ops.writeFileSync(filename, "");
		
		data.forEach(function(item){
			file_ops.appendFile(filename, item["product"] + ';'+ item["sold_no"] + '\n', function(err){
				if (err) throw err;
				//console.log(item["product"] + '  '+ item["sold_no"]);
			});	
		});
		console.log("\n");
	}
	console.log("Wrote to file: " + filename + "\n\n");*/

};

function popular_products (spaza_inventory, sales_history) {
	//Answering the question 'How much of each item has been sold?' starts here
	var inventory_sold = [];

	spaza_inventory.forEach(function (item) {
		// body...
		var sold = 0;
		sales_history.forEach(function(row){
			if(item === row['stock_item']){
				sold += Number(row['no_sold_items']);
			}
		});

		inventory_sold.push({product: item, sold_no: sold});

	});

	bubbleSort(inventory_sold);
	write_to_file("Selling Items (Sorted by Number sold).csv", inventory_sold, 2);
	
}

function get_sales_history (filename) {
	// body...
	var fs = require('fs');
	var buffer = fs.readFileSync(filename);
	var list = buffer.toString().replace(/,/gi, '.');
	var sales_history_rows = list.split('\n');

	var sales_history = sales_history_rows.map(function(row){
		
		var fields = row.split(";");

		return {
			day: fields[0],
			date: fields[1],
			stock_item: fields[2],
			no_sold_items: fields[3],
			sales_price: fields[4]
		}

	});

	return sales_history
}

function popular_products_over_days (filename, spaza_inventory, start_date, end_date) {
	// body...
	var sales_history = get_sales_history(filename);

	var inventory_sold = [];
	var track_date = 0;

	var sold = 0, i = 1;
	

	spaza_inventory.forEach(function (item) {

		sales_history.forEach(function (item_history) {
			if(item === item_history)
				console.log(item);
		});
	});

	//console.log(inventory_sold);

	//bubbleSort(inventory_sold);
	//write_to_file("Testing.csv", inventory_sold, 2);
}


function getTheInventory(filename) { //This gets the items sold the spaza shop
	// body...

	var sales_history = get_sales_history(filename);

	var spaza_inventory = [];

	sales_history.forEach(function(row){

		var i = 0;

		spaza_inventory.forEach(function(item){
			if(item === row['stock_item']){
				++i;
			}
			
		});

		if(i === 0 && row['stock_item'] !== 'stock item'){
			spaza_inventory.push(row['stock_item']);
		}

	});	//Getting the inventory ends here
	//write_to_file("Selling Items.csv", spaza_inventory, 1);
	
	popular_products(spaza_inventory, sales_history);

	popular_products_over_days(filename, spaza_inventory, "12-Feb", "16-Feb");


};


print_logo(function(){

	var filename = 'Nelisa Sales History.csv';
	process.stdout.write("\n" + "---------------------------------------------------------------------------------------------------" + "\n");
	getTheInventory(filename);
});