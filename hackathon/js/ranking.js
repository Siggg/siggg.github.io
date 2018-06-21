/*

This script is released under the Affero General Public License version 3.0 or later (AGPL v.3.0)
A copy of this license is available at https://www.gnu.org/licenses/agpl-3.0.html
Copyright 2018 Conseil Départemental des Hauts-de-Seine & Jean Millerat

In order to use this script, you will have to set the values of the following variables :
- FIXME: accounts_json_filename
- etherscanAPIKeyToken

And you will have to create the following HTML elements in the web page calling this script so that it generates them :
FIXME: #collected_sum : sum of donations in ethers
FIXME: .collected_sum_eur : sum of donations in euros (at daily market price)
FIXME: #account_address : address of the Ethereum address to be inspected
FIXME: #account_qr_code : QR Code corresponding to this Ethereum address
FIXME: #collected_count : number of donations to this address
FIXME: #collection_fees_sum : sum of transaction/mining fees for donations, in ethers
FIXME: #collection_fees_sum_eur : sum of transaction/mining fees for donations, equivalent value in euros at daily market price
FIXME: #transactions : human readable list of donations for this address

This scripts requires the following scripts to be loaded before :

<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>

Here you go. */

// utility function
function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
}


// Parse local CSV file
var csv_filename = "2018-06-19_hackathon_entrees-attribuees.csv";
var etherscan_api_url = "https://api.etherscan.io/api?module=account&action=txlistinternal&startblock=0&endblock=99999999&sort=asc";
etherscan_api_url += "&apikey=PB8BWBNFYSC7KRCZC8ESWHMS79AD996W9Q"

$.ajax({
        url : csv_filename,
		dataType: "text",
	}).fail( function(err) {
        console.log("error with csv_filename, err : ", csv_filename, err); 
	}).always( function(data) {
        // console.log("always with csv_filename : ", csv_filename); 
	}).done( function (data) {
		console.log("success parsing csv_filename : ", csv_filename);
		Papa.parse(data, {
			header: true,
			// delimiter: ";",
			// newline: '\n',
			encoding: "UTF-8",
			error: function(err, file, inputElem, reason) {
				// executed if an error occurs while loading the file,
				// or if before callback aborted for some reason
				console.log("Error:", err, file, inputElem, reason);
			},
			complete: function(results) {
				console.log("parsing complete with results :", results);
				var projects = results.data;
				var donations_total_eth = 0;
				var donations_total_eur = 0;
				var price = 0;
				var i;
				if (projects[projects.length-1].Numero == "") { projects.pop(); }
				for (i = 0; i < projects.length; i++) {
					$('#the_div').html('<h1>(Examen du projet n°' + i + ' sur ' + projects.length + ' en cours, veuillez patienter SVP)</h1>');
					var project = projects[i];
					var padded_index = ("000" + i).slice(-3);
					// load the public address into the document
					var api_url = etherscan_api_url + "&address=" + project.Cle
					$.ajax({
						url : api_url,
						async: false,
						// dataType: "text",
					}).done( function (data) {
						if (project.Cle.startsWith("0xb64D")) {
							console.log("SIEL Bleu ?", project.Operateur);
						};
						var transactions = data.result;
						console.log("load success with padded_index, transactions : ", padded_index, transactions);
						var donations_nb = 0;
						var donations_sum_eth = 0;
						if (! Array.isArray(transactions)) { console.log(data); }; 
						if (Array.isArray(transactions) && transactions.length > 0) {
							const counter = function(number, transaction, index, array) {
								var is_a_donation = transaction.to.toLowerCase() == project.Cle.toLowerCase();
								/* console.log(is_a_donation,
									transaction.from,
									transaction.to,
									transaction.value); */
								var nb = number;
								if (is_a_donation) { // donation
									nb += 1;
								};
								return nb;
							};
							donations_nb = transactions.reduce(counter, 0);
							const sumer = function(sum, transaction, index, array) {
								var is_a_donation = transaction.to.toLowerCase() == project.Cle.toLowerCase();
								if (is_a_donation) { // donation
									var value = 0;
									try {
										value = Number.parseInt(transaction.value);
									} catch (err) {
										value = parseInt(transaction.value);
									};
									return sum + parseInt(value);
								} else {
									return sum;
								};
							};
							donations_sum_eth = transactions.reduce(sumer, 0);
						};
						console.log(donations_nb, " donations with a total of ", donations_sum_eth, " Wei");
						try {
							donations_sum_eth = Number.parseFloat(donations_sum_eth / Math.pow(10,18));
						} catch (err) {
							donations_sum_eth = parseFloat(donations_sum_eth / Math.pow(10,18));
						};
						project.donations_nb = donations_nb;
						project.donations_sum_eth = donations_sum_eth;
						donations_total_eth += donations_sum_eth;
					}).fail( function(err) {
						console.log("error with padded_index, err : ", padded_index, err); 
					}).always( function(data) {
						// console.log("always with padded_index, data : ", padded_index, data); 
					});
				};
				projects = projects.sort(function(a, b){
					return a.donations_sum_eth < b.donations_sum_eth;
				});
				var absolute_url_of_price_request = "https://min-api.cryptocompare.com/data/generateAvg?fsym=ETH&tsym=EUR&e=Kraken";
				$.ajax({
					url : absolute_url_of_price_request,
					async: false,
				}).done( function(data) {
					price = data.RAW.PRICE;
					donations_total_eur = donations_total_eth * price ;
				}).fail( function(error) {
					console.log( "fail while trying to get ETH price", error );
				}).always( function() {
					console.log( "always log after trying to get ETH price" );
				});
				var html = '<h1 id="donations_total_eur">TOTAL DES DONS : ' + donations_total_eur.toFixed(2) + ' euros';
				html += ' (' + donations_total_eth.toFixed(2) + ' ethers)</h1>';
				$('#the_div').html(html);
				var table = '<table><thead><tr>';
				table += '<td>Projet (et porteur), adresse publique</td>';
				table += '<td>Nombre de dons reçus</td>';
				table += '<td>Somme donnée (en ethers)</td>';
				table += '<td>Somme donnée (en euros)</td></tr></thead><tbody>';
				for (i = 0; i < projects.length; i++) {
					var project = projects[i];
					var project_url = "https://siggg.github.io/hackathon/compteur.html?account_address=";
					project_url += project.Cle
					table += '<tr><td><a href="' + project_url + '">';
					table += project["Denomination de l'action"] + '</a>';
					table += ' (par ' + project.Operateur + '), ';
					table += project.Cle.slice(0,6) + '...</td>';
					table += '<td>' + project.donations_nb + ' dons</td>';
					table += '<td>' + project.donations_sum_eth.toFixed(2) + ' ETH</td>';
					table += '<td>' + (project.donations_sum_eth * price).toFixed(2) + ' EUR</td></tr>';
				};
				table += '</tbody></table>';
				$('#the_div').append(table);
			}
		});
	});


