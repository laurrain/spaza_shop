module.exports = {

	get_total_avg_day_week_sales:function(sales_history){

		var day_week_sales = [],
			total = 0,
			date_tracker  = sales_history[1]["date"],
			count_days = 1,
			count_weeks = 1;

		sales_history.forEach(function(row){
			if(row["stock_item"] !== "stock item"){
				total += Number(row["sales_price"].substr(1, row["sales_price"].length)) * Number(row["no_sold_items"]);
			}

			if(date_tracker !== row["date"] && row["stock_item"] !== "stock item"){
				date_tracker = row["date"];
				count_days++;
				if((count_days/7) > Math.round(count_days/7)){
					count_weeks = Math.round(count_days/7) + 1;
				}
				else{
					count_weeks = count_days/7;
				}
			}
		});

		day_week_sales.push(
							{time: "day_avg", avg: Math.round(total/count_days)},
							{time: "week_avg", avg: Math.round(total/count_weeks)}
							);
		return day_week_sales;
	},

	get_product_avg_dayWeek_sales:function(sales_history, selling_items){

		var the_product_avgs = [];

		selling_items.forEach(function(item){

			var date_tracker = sales_history[1]["date"],
				count_days = 0,
				count_weeks = 1,
				sales = 0;

			sales_history.forEach(function(row){
				if(row["stock_item"] === item["product"] && row["stock_item"] !== "stock item" && Number(row["no_sold_items"]) > 0){
						sales += Number(row["sales_price"].substr(1, row["sales_price"].length)) * Number(row["no_sold_items"]);
						count_days++;

					if((count_days/7) > Math.round(count_days/7)){
						count_weeks = Math.round(count_days/7) + 1;
					}
					else{
						count_weeks = count_days/7;
					}	
				}
			});

			the_product_avgs.push({product: item["product"], day_avg: Math.round(sales/count_days), week_avg: Math.round(sales/count_weeks)});

		});
		return the_product_avgs;

	},

	get_avg_cat_dayWeek_sales:function(the_product_avgs){

		var category_avgs = [];

		var junk_food = {day_avg: 0, week_avg: 0},
			veg_and_carbs = {day_avg: 0, week_avg: 0},
			fruit = {day_avg: 0, week_avg: 0},
			dairy = {day_avg: 0, week_avg: 0},
			not_edible = {day_avg: 0, week_avg: 0};

		the_product_avgs.forEach(function(item){
			switch(item["product"]){
				case "Mixed Sweets 5s":
				case "Top Class Soy Mince":
				case "Fanta 500ml":
				case "Cream Soda 500ml":
				case "Heart Chocolates":
				case "Coke 500ml":
					junk_food["day_avg"] += Number(item["day_avg"]);
					junk_food["week_avg"] += Number(item["week_avg"]);
				break;

				case "Chakalaka Can":
				case "Gold Dish Vegetable Curry Can":
				case "Iwisa Pap 5kg":
				case "Bread":
					veg_and_carbs["day_avg"] += Number(item["day_avg"]);
					veg_and_carbs["week_avg"] += Number(item["week_avg"]);
				break;

				case "Bananas - loose":
				case "Apples - loose":
					fruit["day_avg"] += Number(item["day_avg"]);
					fruit["week_avg"] += Number(item["week_avg"]);
				break;

				case "Milk 1l":
				case "Imasi":
					dairy["day_avg"] += Number(item["day_avg"]);
					dairy["week_avg"] += Number(item["week_avg"]);
				break;

				case "Soap Bar":
				case "Shampoo 1 litre":
				case "Rose (Plastic)":
				case "Valentines Cards":
					not_edible["day_avg"] += Number(item["day_avg"]);
					not_edible["week_avg"] += Number(item["week_avg"]);
				break;
			};

		});

		category_avgs.push(
						{category: "junk_food", day_avg: junk_food["day_avg"], week_avg: junk_food["week_avg"]}, 
			            {category: "dairy", day_avg: dairy["day_avg"], week_avg: dairy["week_avg"]},
			            {category: "veg_and_carbs", day_avg: veg_and_carbs["day_avg"], week_avg: veg_and_carbs["week_avg"]},
			            {category: "not_edible", day_avg: not_edible["day_avg"], week_avg: not_edible["week_avg"]},
			            {category: "fruit", day_avg:fruit["day_avg"], week_avg: fruit["week_avg"]}
						);

		return category_avgs;

	},

	get_avg_sales_per_day:function(sales_history){

		var these_days = [
							{day: "Sunday", avg: 0},
							{day: "Monday", avg: 0},
							{day: "Tuesday", avg: 0},
							{day: "Wednesday", avg: 0},
							{day: "Thursday", avg: 0},
							{day: "Friday", avg: 0},
							{day: "Saturday", avg: 0}
							],

			track_date = sales_history[1]["date"];

		these_days.forEach(function(week_day){

			var total = 0,
				counter = 0;
				//date = row["date"];

			sales_history.forEach(function(row){

				if(week_day["day"] === row["day"]){

					total += Number(row["no_sold_items"]) * Number(row["sales_price"].substr(1, row["sales_price"].length))

					if(track_date !== row["date"]){
						counter++;
						track_date = row["date"]
					}
				}

			});

			if(counter !== 0)
				week_day["avg"] += Math.round(total/counter);
			else
				week_day["avg"] += Math.round(total)


		});
		return these_days;

	},

	get_avg_sales_per_week:function(sales_history){

		var these_days = [
							{day: "Sunday", avg: 0},
							{day: "Monday", avg: 0},
							{day: "Tuesday", avg: 0},
							{day: "Wednesday", avg: 0},
							{day: "Thursday", avg: 0},
							{day: "Friday", avg: 0},
							{day: "Saturday", avg: 0}
							],

			track_day = sales_history[1]["day"],
			track_date = sales_history[1]["date"],
			these_weeks = [];

		//these_days.forEach(function(week_day){

			var total = 0,
				counter = 1;
				//date = row["date"];

			sales_history.forEach(function(row){

				if(track_day === row["day"] && track_date !== row["date"]){
					these_weeks.push({week: "week"+counter, avg: total});
					counter++;
					track_date = row["date"]
					total = 0;
				}

				total += Number(row["no_sold_items"]) * Number(row["sales_price"].substr(1, row["sales_price"].length))


			});


			if(counter === 0){
				these_weeks.push({week:"week1", avg: total});
			}
			else
				these_weeks.push({week:"week"+counter, avg: total})
/*
			if(counter !== 0)
				week_day["avg"] += Math.round(total/counter);
			else
				week_day["avg"] += Math.round(total)


		});*/
		return these_weeks;

	}

};