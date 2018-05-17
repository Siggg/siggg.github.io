# Envoyez des Ethers à l'adresse : 0xd972634e4a036d91d0d4a35ef4927b63ac0fa7f4

Pour faire un don direct à des personnes certifiées en tant que bénéficiaires de l'Allocation Adulte Handicapé :

1. installez [Coinbase](https://www.coinbase.com/mobile?locale=fr) sur votre smartphone (ou une app équivalente)
2. achetez pour quelques euros d'Ether avec votre carte bleue (par exemple pour 15 euros)
3. envoyez de l'Ether à l'adresse ci-dessus

Vos dons en Ether sont distribués aux bénéficiaires [de manière publique, transparente, vérifiable et automatique.](#more)

**En chiffres** | Depuis 24H | Depuis 7 jours | Depuis 1 mois | Depuis 1 an
--- | --- | --- | --- | ---
Somme donnée aux bénéficiaires (en ethers) | 0 | 0 | 0 | 0
Dons collectés (nombre) | 0 | 0 | 0 | 0
Inscriptions de bénéficiaires (nombre) | 0 | 0 | 0 | 0
Désinscriptions de bénéficiaires (nombre) | 0 | 0 | 0 | 0

# Dernières transactions du contrat de don

<ul id="transactions">

    <li> Chargement des transactions en cours...</li>
    <li> Veuillez patienter...</li>
    <li> En cas de dysfonctionnement, tentez de recharger la page...</li>
    <li> Ou contactez par email sig <arobase> akasig <point> org.</li>

</ul>

[Audit technique du contrat de don et des transactions](https://etherscan.io/address/0xd972634e4a036d91d0d4a35ef4927b63ac0fa7f4)

# <a name="more"></a>En savoir plus

Vos dons ne sont pas collectés ni distribués par un intermédiaire central tel qu'une administration ou une association. Vos dons sont collectés par un logiciel autonome et de haute sécurité. La haute sécurité de ce logiciel est assurée par [plusieurs milliers d'internautes indépendants](https://www.ethernodes.org/network/1). Les ordinateurs des ces internautes vérifient que les dons sont collectés et distribués comme prévu par le logiciel. Ces vérifications sont réalisées en permanence et de manière indépendante. En échange, ces internautes sont rémunérés par des frais prélevés sur chaque collecte ou distribution de don.

C'est le principe de fonctionnement des [logiciels de type **contrat intelligent**](https://fr.wikipedia.org/wiki/Contrat_intelligent). C'est la technologie de la **blockchain [Ethereum](https://www.ethereum.org/)** qui permet de les exécuter de manière sécurisée. Il existe des milliers de contrats intelligents, pour tout type d'usage. Ils ne sont pas utilisés que pour collecter ou distribuer des dons mais pour gérer toutes sortes de transactions financières ou d'échanges de données, entre particuliers, entreprises ou administrations. On appelle **mineurs** les personnes qui vérifient l'exécution des contrats intelligents en échange de **frais de transactions**.

Vous pouvez aussi auditer de manière manuelle la collecte et la distribution des dons grâce aux liens fournis ci-dessus pour chaque transaction.


<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script>
    var etherscanAPIKeyToken = "MyApiKeyToken";
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
            transactions.forEach(function(item, index, array) {
                console.log(item, index);
                var newDate = new Date();
                newDate.setTime(item.timeStamp*1000);
                var dateString = newDate.toISOString();
                var event = item.input.substring(0,10);
                switch(event) {
                    case '0x':
                        var value = Number.parseFloat(item.value / Math.pow(10,18)).toFixed(4);
                        event = "Réception d'un don de " + value + " ETH";
                        break;
                    case '0x6b9f96ea':
                        event = "Distribution des dons";
                        break;
                    case '0xcdd8b2b2':
                        var beneficiary = item.input.substring(34,38) + '...';
                        event = "Inscription du bénéficiaire #" + beneficiary;
                        break;
                    case '0x71d0028d':
                        var beneficiary = item.input.substring(34,38) + '...';
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
        } )
        .fail( function(error) { console.log( "fail", error ); } )
        .always( function() { console.log( "always" ); } );
</script>
