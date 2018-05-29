---
title: test hackathon
description : projets du hackathon
---
<ul>
  <lh>Comptes</lh>
  <li>Compte n°1
    <ul>
      <li>Adresse publique : <span id="checksum_address1">En cours de calcul...</span></li>
      <li>QR Code : <span id="qr_code1">En cours de calcul...</span></li>
      <li>Clef secrète : <span id="private_key1">En cours de calcul...</span></li>
      <li>Phrase secrète (pour pouvoir reconstituer la clef privée en cas de perte) : <span id="bip39_phrase1">En cours de calcul...</span></li>
    </ul>
  </li>
</ul>


<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="js/ethereumjs-wallet-0.6.0.min.js"></script>
<script src="js/qrcode.min.js"></script>
<script>
  var account = ethereumjs.Wallet.generate();
  var private_key = account.getPrivateKeyString();
  var public_key = account.getPublicKeyString();
  var address = account.getAddressString();
  var checksum_address = account.getChecksumAddressString();
  var json_wallet = account.toV3("secret");
  $('#checksum_address1').html(checksum_address);
  $('#private_key1').html(private_key);
  var qrcode = new QRCode(document.getElementById("qr_code1"), {
	  text: checksum_address,
	  width: 128,
	  height: 128,
	  colorDark : "#000000",
	  colorLight : "#ffffff",
	  correctLevel : QRCode.CorrectLevel.H
  });
</script>
