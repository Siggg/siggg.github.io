---
title: test hackathon
description : projets du hackathon
---
# [Générateur de comptes](comptes.md)

# Compteur sur un compte

![QR code du contrat de don](/contract_qr_code.png)

Adresse du compte : 0xd972634e4a036d91d0d4a35ef4927b63ac0fa7f4

## Les chiffres

* Dons collectés, hors frais (en ethers) : <span id="collected_sum">(chargement en cours)</span> ETH
    * soit, en euros au cours moyen du jour : <span id="collected_sum_eur">(chargement en cours)</span> EUR
* Dons collectés (nombre) : <span id="collected_count">(chargement en cours)</span>
* Frais de sécurisation pour la collecte des dons (en ethers) : <span id="collection_fees_sum">(chargement en cours)</span> ETH
    * soit, en euros au cours moyen du jour : <span id="collection_fees_sum_eur">(chargement en cours)</span> EUR
* Retraits effectués depuis ce compte (en ethers) : <span id="withdrawn_sum">(chargement en cours)</span> ETH
    * soit, en euros au cours moyen du jour : <span id="withdrawn_sum_eur">(chargement en cours)</span> EUR
* Détails des transactions :
<div id="transactions"> (chargement en cours) </div>

[Audit technique du contrat de don et des transactions](https://etherscan.io/address/0xd972634e4a036d91d0d4a35ef4927b63ac0fa7f4)

Powered by Etherscan.io APIs

<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script>
    var etherscanAPIKeyToken = "XZYBD5MNJ6TEN28TZGMVTF2SZ9PGNVUV3K";
    var account_address = "0xd972634e4a036d91d0d4a35ef4927b63ac0fa7f4";
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
            // we got incoming transactions, let's get outgoing transactions too
            // sort them by timestamp
            var transactions = data.result.sort( function(t1, t2) { return t2.timeStamp - t1.timeStamp; } );
            var html = '<ul>';
            var collected_sum = 0; // cumulated sum of donations collected
            var collected_count = 0; // number of donations collected
            var collection_fees_sum = 0; // cumulated transaction fees paid by donors
            var withdrawn_sum = 0; // cumulated donations withdrawn
            transactions.forEach(function(item, index, array) {
                console.log(item, index);
                var newDate = new Date();
                newDate.setTime(item.timeStamp*1000);
                var dateString = newDate.toISOString();
                var event = item.input.substring(0,10);
                switch(event) {
                    case '0x':
                        var value = Number.parseFloat(item.value / Math.pow(10,18));
                        if (value > 0) {           // deposit = donation
                           collected_sum += value;
                           collected_count += 1;
                           var gas_price = Number.parseFloat(item.gasPrice);
                           var gas_used = Number.parseFloat(item.gasUsed);
                           var transaction_fees = gas_price * gas_used / Math.pow(10,18);
                           collection_fees_sum += transaction_fees;
                           event = "Réception d'un don de " + value.toFixed(4) + " ETH";
                           event += " et paiement de " + collection_fees_sum.toFixed(4) + " ETH";
                           event += " par le donateur pour les frais de sécurisation de la collecte";
                        } else {                    // withdrawal
                           withdrawn_sum += value;
                           event = "Retrait de " + value.toFixed(4) + " ETH";
                        };
                        html += '<li><a href="https://etherscan.io/tx/' + item.hash + '">' +
                           event +
                           ' (' + dateString.substring(0,10) +
                           ' à ' + dateString.substring(11,19) +
                           ')</a></li>';
                        break;
                    default:
                        event = item.input;
                };
            });
            html += '</ul>';
            $('#transactions').html(html);
            // Fill the dashboard with figures
            $('#withdrawn_sum').html(withdrawn_sum.toFixed(4));
            $('#collection_fees_sum').html(collection_fees_sum.toFixed(4));
            collection_fees_percent = collection_fees_sum / collected_sum * 100;
            $('#collection_fees_percent').html(collection_fees_percent.toPrecision(2));
            $('#collected_sum').html(collected_sum.toFixed(4));
            $('#collected_count').html(collected_count);
            //
            // let's convert ETH sums into EUR
            //
            var absolute_url_of_price_request = "https://min-api.cryptocompare.com/data/generateAvg?fsym=ETH&tsym=EUR&e=Kraken";
            $.getJSON( absolute_url_of_price_request )
                    .done( function(data) {
                        var price = data.RAW.PRICE;
                        var withdrawn_sum_eur = withdrawn_sum * price ;
                        var collection_fees_sum_eur = collection_fees_sum * price ;
                        var collected_sum_eur = collected_sum * price ;
                        $('#withdrawn_sum_eur').html(withdrawn_sum_eur.toFixed(2));
                        $('#collection_fees_sum_eur').html(collection_fees_sum_eur.toFixed(2));
                        $('#collected_sum_eur').html(collected_sum_eur.toFixed(2));
                    } )
                    .fail( function(error) { console.log( "fail while trying to get ETH price", error ); } )
                    .always( function() { console.log( "always log after trying to get ETH price" ); } );
        } )
        .fail( function(error) { console.log( "fail while trying to get contract transactions", error ); } )
        .always( function() { console.log( "always after trying to get contract transactions" ); } );
</script>
