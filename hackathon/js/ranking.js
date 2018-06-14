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

// Name of the JSON file describing the accounts to be ranked
var accounts_json_filename = "comptes.json";

// Please do login to https://etherscan.io/myapikey and get an API key for your pages
// so that mine does get blocked because of over-use
var etherscanAPIKeyToken = "";

// Load the description of the accounts to be ranked
var jqxhr = $.getJSON( accounts_json_filename, function() {
  console.log( "success" );
})
  .done(function() {
    console.log( "second success" );
  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });
 
// Set another completion function for the request above
jqxhr.complete(function() {
  console.log( "second complete" );
});

// Display the address of the account
$('#account_address').html(account_address);
    
// Set the graphics options for the QR Code
var qr_code_size = 300;
var qr_code_options = { 
  // render method: 'canvas', 'image' or 'div'
  render: 'canvas',
  // version range somewhere in 1 .. 40
  minVersion: 1,
  maxVersion: 40,
  // error correction level: 'L', 'M', 'Q' or 'H'
  ecLevel: 'H',
  // offset in pixel if drawn onto existing canvas
  left: 0,
  top: 0,
  // size in pixel
  size: qr_code_size,
  // code color or image element
  fill: '#000',
  // background color or image element, null for transparent background
  background: '#fff',
  // content
  text: account_address,
  // corner radius relative to module width: 0.0 .. 0.5
  radius: 0.5,
  // quiet zone in modules
  quiet: 1,
  // modes
  // 0: normal
  // 1: label strip
  // 2: label box
  // 3: image strip
  // 4: image box
  mode: 2,
  // size of text
  mSize: 0.08,
  mPosX: 0.5,
  mPosY: 0.5,
  label: "Adresse " + account_address.substring(0,6) + "...",
  fontname: 'sans',
  fontcolor: '#000',
  image: null
};

// Display the QR Code
$("#account_qr_code").html('<canvas width="' + qr_code_size
  + '" height="' + qr_code_size
  + '" id="public_address_qr_code'
  + '"></canvas>');
$("#public_address_qr_code").qrcode(qr_code_options);
    
// Get the history of transactions (donations, withdrawals, etc.) for this address (from Etherscan APIs)
var balance_request = "module=account&action=balance&address="
  + account_address
  + "&tag=latest";
var relative_url_of_transactions_request = "module=account&action=txlist&address="
  + account_address
  + "&startblock=0&endblock=99999999&page=1&offset=10&sort=asc"
var absolute_url_of_transactions_request = "https://api.etherscan.io/api?"
  + relative_url_of_transactions_request
  + "&apikey="
  + etherscanAPIKeyToken;
$.getJSON( absolute_url_of_transactions_request )
  .done( function(data) {
    console.log( "done", data );
    // sort transactions by timestamp
    var transactions = data.result.sort( function(t1, t2) { return t2.timeStamp - t1.timeStamp; } );
    // now process them one by one in order to count ether transfers
    var html = '<ul>';
    var collected_sum = 0; // cumulated sum of donations collected
    var collected_count = 0; // number of donations collected
    var collection_fees_sum = 0; // cumulated transaction fees paid by donors
    var withdrawn_sum = 0; // cumulated donations withdrawn
    transactions.forEach(function(item, index, array) {
      console.log(item, index);
      // We'll want to display the date and time of the transaction
      var newDate = new Date();
      newDate.setTime(item.timeStamp*1000);
      var dateString = newDate.toISOString();
      // Is this a simple ether transfer or a special transaction (use of a smart contract) ?
      var event = item.input.substring(0,10);
      switch(event) {
        case '0x':  // this transaction is a simple incoming or outgoing transfer of ethers
          var value = 0;
          try {
              value = Number.parseFloat(item.value / Math.pow(10,18));
          } catch (err) {
              value = parseFloat(item.value / Math.pow(10,18));
          };
          if (value > 0) {  // incoming ethers = deposit = donation
            collected_sum += value;
            collected_count += 1;
            var gas_price = 0;
            var gas_used = 0;
            try {
                gas_price = Number.parseFloat(item.gasPrice);
                gas_used = Number.parseFloat(item.gasUsed);
            } catch (err) {
                gas_price = parseFloat(item.gasPrice);
                gas_used = parseFloat(item.gasUsed);
            };                
            var transaction_fees = gas_price * gas_used / Math.pow(10,18);
            collection_fees_sum += transaction_fees;
            // Display human readable explanation of the transaction
            event = "Réception d'un don de " + value.toFixed(4) + " ETH";
            event += " et paiement de " + collection_fees_sum.toFixed(4) + " ETH";
            event += " par le donateur pour les frais de sécurisation de la collecte";
            html += '<li><a href="https://etherscan.io/tx/' + item.hash + '">' +
              event +
              ' (' + dateString.substring(0,10) +
              ' à ' + dateString.substring(11,19) +
              ')</a></li>';
          };
          break;
        default:
          event = item.input;
      };
    });
    html += '</ul>';
    // Display the history of transactions
    $('#transactions').html(html);
    // Fill the dashboard/counter with some figures
    $('#collection_fees_sum').html(collection_fees_sum.toFixed(4));
    collection_fees_percent = collection_fees_sum / collected_sum * 100;
    $('#collection_fees_percent').html(collection_fees_percent.toPrecision(2));
    $('#collected_sum').html(collected_sum.toFixed(4));
    $('#collected_count').html(collected_count);
    //
    // Let's convert ETH sums into EUR
    // using cryptocompare API to get market price
    var absolute_url_of_price_request = "https://min-api.cryptocompare.com/data/generateAvg?fsym=ETH&tsym=EUR&e=Kraken";
    $.getJSON( absolute_url_of_price_request )
      .done( function(data) {
        var price = data.RAW.PRICE;
        var collection_fees_sum_eur = collection_fees_sum * price ;
        var collected_sum_eur = collected_sum * price ;
        $('#collection_fees_sum_eur').html(collection_fees_sum_eur.toFixed(2));
        $('.collected_sum_eur').html(collected_sum_eur.toFixed(2));
      } )
      .fail( function(error) { console.log( "fail while trying to get ETH price", error ); } )
      .always( function() { console.log( "always log after trying to get ETH price" ); } );
  } )
  .fail( function(error) { console.log( "fail while trying to get contract transactions", error ); } )
  .always( function() { console.log( "always after trying to get contract transactions" ); } );

