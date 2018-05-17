# Faites un don

Pour faire un don direct à des personnes en situation de handicap lourd :

1. installez [Coinbase](https://www.coinbase.com/mobile?locale=fr) sur votre smartphone (ou une app équivalente)
2. achetez pour quelques euros d'Ether avec votre carte bleue (par exemple pour 15 euros)
3. envoyez de l'Ether à l'adresse ci-dessous en scannant ce code :

![QR code du contrat de don](/contract_qr_code.png)

Adresse de collecte des dons : 0xd972634e4a036d91d0d4a35ef4927b63ac0fa7f4

Vos dons en Ether sont distribués à des bénéficiaires [de l'Allocation Adulte aux Handicapés de manière publique, transparente, vérifiable et automatique.](#more)

 | **En chiffres**
--- | ---
Dons distribués aux bénéficiaires (en ethers) | <span id="given_sum">?</span>
Frais de sécurisation à la charge des donateurs (en ethers) | <span id="collection_fees_sum">?</span>
Dons collectés, hors frais (en ethers) | <span id="collected_sum">?</span>
Dons collectés (nombre) | <span id="collected_count">?</span>
Frais de sécurisation à la charge des donateurs (en % des dons collectés) | 0 | 0 | 0 | 0 | <span id="collection_fees_percent">?</span>
Inscriptions de bénéficiaires (nombre) | 0 | 0 | 0 | 0 | <span id="registrations_count">?</span>
Désinscriptions de bénéficiaires (nombre) | 0 | 0 | 0 | 0 | <span id="unregistrations_count">?</span>


# Dernières transactions

<div id="transactions">

Chargement des transactions en cours, veuillez patienter...
En cas de dysfonctionnement, tentez de recharger la page ou contactez par email sig arobase akasig point org.

</div>

[Audit technique du contrat de don et des transactions](https://etherscan.io/address/0xd972634e4a036d91d0d4a35ef4927b63ac0fa7f4)

<a name="more"></a>
# En savoir plus

En France, l'[Allocation aux Adultes Handicapés](https://fr.wikipedia.org/wiki/Allocation_aux_adultes_handicap%C3%A9s) (AAH) est versée aux personnes adultes qui ne peuvent accomplir sans aide ou efforts exceptionnels au moins 50% des actions de la vie quotidienne (se déplacer, travailler, faire des études, voire manger, se laver, s'habiller...) et sont notamment en grande difficulté pour accéder à un emploi. Ce sont les Maisons Départementales des Personnes Handicapées (MDPH) qui identifient les personnes qui peuvent ou non bénéficier de l'AAH. Dans le contexte de cette expérimentation, un agent d'un conseil départemental inscrit (ou désinscrit) des bénéficiaires de l'AAH qui se portent volontaires pour participer à cette expérimentation et recevoir vos dons, après avoir vérifié leur qualité de bénéficiaire de l'AAH.

Le montant de l'AAH permet de survivre dignement mais de manière frugale : par exemple 800 euros par mois pour se loger, manger et faire face aux dépenses du quotidien. Grâce à vos dons (de l'ordre de 15 euro par don), les bénéficiaires peuvent se permettre une petite dépense utile ou agréable : vêtement, cinéma, livre, cosmétique, ...

Une fois les bénéficiaires inscrits, vos dons ne sont pas collectés ni distribués par un intermédiaire central tel qu'une administration ou une association. Vos dons sont collectés et directement distribués aux bénéficiaires par un logiciel autonome et de haute sécurité. La haute sécurité de ce logiciel est assurée par [plusieurs milliers d'internautes indépendants](https://www.ethernodes.org/network/1). Les ordinateurs de ces internautes vérifient que les dons sont collectés et distribués comme prévu par le logiciel. Ces vérifications sont réalisées en permanence et de manière indépendante et automatique. En échange, ces internautes sont rémunérés par des frais prélevés sur chaque collecte ou distribution de don.

C'est le principe de fonctionnement des [logiciels de type **contrat intelligent**](https://fr.wikipedia.org/wiki/Contrat_intelligent). C'est la technologie de la **blockchain [Ethereum](https://www.ethereum.org/)** qui permet de les exécuter de manière sécurisée. Il existe des milliers de contrats intelligents, pour tout type d'usage. Ils ne sont pas utilisés que pour collecter ou distribuer des dons mais pour gérer toutes sortes de transactions financières ou d'échanges de données, entre particuliers, entreprises ou administrations. On appelle **mineurs** les personnes qui vérifient l'exécution des contrats intelligents en échange de **frais de transactions** également appelés **frais de sécurisation** dans le tableau en haut de page.

Les frais sont de nature diverse dans le cadre de ces dons :

* Frais à la charge des donateurs :
  * frais de change des euros en ethers auprès d'une plateforme de change (exemple : Coinbase) = moins de 4% ; certains plateformes de change proposent des frais de moins de 1% mais elles restent pour le moment plus compliquées à utiliser que Coinbase ;
  * frais de sécurisation des dons : cf. tableau en haut de page
* Frais à la charge du conseil départemental : frais de sécurisation des inscriptions de bénéficiaires, des désinscription de bénéficiaires et du déclenchement des distributions de dons, pour un total de moins de 1% du total des dons
* Frais à la charge des bénéficiaires :
  * 0% si le bénéficiaire trouve un commerçant qui accepte d'être payé directement en ethers sans frais (ils sont rares pour le moment mais il en existe)
  * entre 2% et 3% si le bénéficiaire choisit un commerçant qui accepte d'être payé en ethers mais avec des frais raisonnables (par exemple, la société Spectrocoin vend des bons d'achat Amazon avec moins de 3% de commission)
  * environ 5% si le bénéficiaire choisit de convertir ses ethers en euros puis de les virer vers son compte bancaire
  * jusqu'à 20% si le bénéficiaire choisit un commerçant ou un intermédiaire qui accepte les ethers mais pratique des frais de conversion exhorbitants (il en existe)

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
                $('#collection_fees_sum').html(collection_fees_sum.toPrecision(3));
                collection_fees_percent = collection_fees_sum / collected_sum * 100;
                $('#collection_fees_percent').html(collection_fees_percent.toPrecision(2)+' %');
                $('#collected_sum').html(collected_sum.toFixed(4));
                $('#collected_count').html(collected_count);
                $('#registrations_count').html(registrations_count);
                $('#unregistrations_count').html(unregistrations_count);
        } )
        .fail( function(error) { console.log( "fail", error ); } )
        .always( function() { console.log( "always" ); } );
</script>
