**En chiffres** | Depuis 24H | Depuis 7 jours | Depuis 1 mois | Depuis 1 an
--- | --- | --- | --- | ---
Somme donnée aux bénéficiaires (en ethers) | 0 | 0 | 0 | 0
Dons reçus (nombre) | 0 | 0 | 0 | 0
Inscriptions de bénéficiaires (nombre) | 0 | 0 | 0 | 0
Désinscriptions de bénéficiaires (nombre) | 0 | 0 | 0 | 0

# Dernières transactions du contrat

- Don de 0.00 ETH par le donateur 0x000...
- Don de 0.00 ETH par le donateur 0x000...
- Distribution de 0.00 ETH à 0 bénéficiaires
- Inscription du bénéficiaire 0x000...
- Encaissement de 0.00 ETH
- Inscription du bénéficiaire 0x000...
- Inscription du bénéficiaire 0x000...
- Désinscription du bénéficiaire 0x000...
- Don de 0.00 ETH par le donateur 0x000...
- Don de 0.00 ETH par le donateur 0x000...
- Distribution de 0.00 ETH à 0 bénéficiaires
- Don de 0.00 ETH par le donateur 0x000...
- Don de 0.00 ETH par le donateur 0x000...
- Inscription du bénéficiaire 0x000...
- Don de 0.00 ETH par le donateur 0x000...
- Don de 0.00 ETH par le donateur 0x000...

(transactions plus anciennes)

<div id="transactions" />

## Pour donner aux bénéficiaires inscrits sur le contrat, envoyez vos ethers à l'adresse suivante

### 0x000...

<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script>
    var etherscanAPIKeyToken = "MyApiKeyToken";
    var contractAddress = "0xd972634e4a036d91d0d4a35ef4927b63ac0fa7f4";
    var balanceRequest = "module=account&action=balance&address="
        + contractAddress
        + "&tag=latest";
    var transactionsRequest = "module=account&action=txlist&address="
        + contractAddress
        + "&startblock=0&endblock=99999999&page=1&offset=10&sort=asc"
    var etherscanAPI = "https://api.etherscan.io/api?"
        + transactionsRequest
        + "&apikey="
        + etherscanAPIKeyToken;
    $.getJSON( etherscanAPI )
        .done( function(data) {
            console.log( "done", data );
            var html = '<ul>';
            data.result.forEach(function(item, index, array) {
                console.log(item, index);
                html += '<li>' +
                    'transaction' +
                    '</li>';
            });
            html += '</ul>';
            $('#transactions').html(html);            
        } )
        .fail( function(error) { console.log( "fail", error ); } )
        .always( function() { console.log( "always" ); } );
</script>
