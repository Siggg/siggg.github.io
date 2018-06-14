---
title: test hackathon
description : projets du hackathon
---
# [Générateur de comptes](comptes.md)

# Compteur sur un compte

![QR code du contrat de don](/contract_qr_code.png)

Adresse du compte : 0xd972634e4a036d91d0d4a35ef4927b63ac0fa7f4

## Les chiffres

* Dons distribués aux bénéficiaires (en ethers) : <span id="given_sum">(chargement en cours)</span> ETH
    * soit, en euros au cours moyen du jour : <span id="given_sum_eur">(chargement en cours)</span> EUR
* Frais de sécurisation à la charge des donateurs (en ethers) : <span id="collection_fees_sum">(chargement en cours)</span> ETH
    * soit, en euros au cours moyen du jour : <span id="collection_fees_sum_eur">(chargement en cours)</span> EUR
* Dons collectés, hors frais (en ethers) : <span id="collected_sum">(chargement en cours)</span> ETH
    * soit, en euros au cours moyen du jour : <span id="collected_sum_eur">(chargement en cours)</span> EUR
* Dons collectés (nombre) : <span id="collected_count">(chargement en cours)</span>
* Frais de sécurisation à la charge des donateurs (en % des dons collectés) : <span id="collection_fees_percent">(chargement en cours)</span> %
* Inscriptions de bénéficiaires (nombre) : <span id="registrations_count">(chargement en cours)</span>
* Désinscriptions de bénéficiaires (nombre) : <span id="unregistrations_count">(chargement en cours)</span>

## Les dernières transactions

<div id="transactions">

(chargement en cours, veuillez patienter...)

En cas de dysfonctionnement, tentez de recharger la page ou contactez par email **sig arobase akasig point org**.

</div>

[Audit technique du contrat de don et des transactions](https://etherscan.io/address/0xd972634e4a036d91d0d4a35ef4927b63ac0fa7f4)



<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script>
    var etherscanAPIKeyToken = "MonTokenDAPIPourMonCompteur001";
    var contract_address = "0xd972634e4a036d91d0d4a35ef4927b63ac0fa7f4";
    var balance_request = "module=account&action=balance&address="
        + contract_address
        + "&tag=latest";
    var relative_url_of_transactions_request = "module=account&action=txlist&address="
        + contract_address
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
            var given_sum = 0; // cumulated donations given
            var collection_fees_percent = 0; // percent of collected amount that goes into collection fees
            var registrations_count = 0; // number of beneficiary registrations
            var unregistrations_count = 0; // number of beneficiary unregistrations
            transactions.forEach(function(item, index, array) {
                console.log(item, index);
                var newDate = new Date();
                newDate.setTime(item.timeStamp*1000);
                var dateString = newDate.toISOString();
                var event = item.input.substring(0,10);
                switch(event) {
                    case '0x':
                        var value = Number.parseFloat(item.value / Math.pow(10,18));
                        collected_sum += value;
                        collected_count += 1;
                        var gas_price = Number.parseFloat(item.gasPrice);
                        var gas_used = Number.parseFloat(item.gasUsed);
                        var transaction_fees = gas_price * gas_used / Math.pow(10,18);
                        collection_fees_sum += transaction_fees;
                        event = "Réception d'un don de " + value.toFixed(4) + " ETH";
                        event += " et paiement de " + collection_fees_sum.toFixed(4) + " ETH";
                        event += " par le donateur pour les frais de sécurisation de la collecte";
                        break;
                    case '0x6b9f96ea':
                        event = "Distribution des dons";
                        break;
                    case '0xcdd8b2b2':
                        var beneficiary = item.input.substring(34,38) + '...';
                        registrations_count += 1;
                        event = "Inscription du bénéficiaire #" + beneficiary;
                        break;
                    case '0x71d0028d':
                        var beneficiary = item.input.substring(34,38) + '...';
                        unregistrations_count += 1;
                        event = "Désinscription du bénéficiaire #" + beneficiary;
                        break;
                    case '0x60606040':
                        event = "Initialisation du contrat";
                        break;
                    default:
                        event = item.input;
                };
                html += '<li><a href="https://etherscan.io/tx/' + item.hash + '">' +
                    event +
                    ' (' + dateString.substring(0,10) +
                    ' à ' + dateString.substring(11,19) +
                    ')</a></li>';
                });
                html += '</ul>';
                $('#transactions').html(html);
                // Fill the dashboard with figures
                given_sum = collected_sum - collection_fees_sum;
                $('#given_sum').html(given_sum.toFixed(4));
                $('#collection_fees_sum').html(collection_fees_sum.toFixed(4));
                collection_fees_percent = collection_fees_sum / collected_sum * 100;
                $('#collection_fees_percent').html(collection_fees_percent.toPrecision(2));
                $('#collected_sum').html(collected_sum.toFixed(4));
                $('#collected_count').html(collected_count);
                $('#registrations_count').html(registrations_count);
                $('#unregistrations_count').html(unregistrations_count);
                //
                // let's convert ETH sums into EUR
                //
                var absolute_url_of_price_request = "https://min-api.cryptocompare.com/data/generateAvg?fsym=ETH&tsym=EUR&e=Kraken";
                $.getJSON( absolute_url_of_price_request )
                    .done( function(data) {
                        var price = data.RAW.PRICE;
                        var given_sum_eur = given_sum * price ;
                        var collection_fees_sum_eur = collection_fees_sum * price ;
                        var collected_sum_eur = collected_sum * price ;
                        $('#given_sum_eur').html(given_sum_eur.toFixed(2));
                        $('#collection_fees_sum_eur').html(collection_fees_sum_eur.toFixed(2));
                        $('#collected_sum_eur').html(collected_sum_eur.toFixed(2));
                    } )
                    .fail( function(error) { console.log( "fail while trying to get ETH price", error ); } )
                    .always( function() { console.log( "always log after trying to get ETH price" ); } );
        } )
        .fail( function(error) { console.log( "fail while trying to get contract transactions", error ); } )
        .always( function() { console.log( "always after trying to get contract transactions" ); } );
</script>
