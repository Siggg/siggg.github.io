---
title: test hackathon
description : projets du hackathon
---
<ul>
  <lh>Comptes</lh>
  <li>Compte n°1
    <ul>
      <li>Adresse publique : <span id="checksum_address1">En cours de calcul...</span></li>
      <li>Clef privée : <span id="private_key1">En cours de calcul...</span></li>
      <li>QR Code : <span id="qr_code1">En cours de calcul...</span></li>
    </ul>
  </li>
</ul>

<script src="js/ethereumjs-wallet-0.6.0.min.js"></script>
<script>
  var account = ethereumjs.Wallet.generate();
  var private_key = account.getPrivateKeyString();
  var public_key = account.getPublicKeyString();
  var address = account.getAddressString();
  var checksum_address = account.getChecksumAddressString();
  var json_wallet = account.toV3("secret");
  $('#checksum_address1').html(checksum_address);
  $('#private_key1').html(private_key);
</script>
