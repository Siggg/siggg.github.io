---
title: test hackathon
description : projets du hackathon
---
<ul>
  <lh>Comptes</lh>
  <li>Compte n°1
    <ul>
      <li>Adresse publique :
        <ul>
          <li>sous forme textuelle : <span id="public_address_string_1">En cours de calcul...</span></li>
          <li>sous forme graphique : <span id="public_address_qr_code_1"> </span></li>
        </ul>
      </li>
      <li>Clef secrète :
        <ul>
          <li>sous forme textuelle : <span id="private_key_string_1">En cours de calcul...</span></li>
          <li>sous forme graphique : <span id="private_key_qr_code_1"> </span></li>
          <li>sous forme de 12 mots  (à conserver précieusement) : <span id="private_key_seed_1">En cours de calcul...</span></li>
        </ul>
      </li>
    </ul>
  </li>
</ul>


<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="js/ethereumjs-wallet-0.6.0.min.js"></script>
<script src="js/ethereumjs-wallet-hd-0.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/eth-lightwallet@3.0.1/dist/lightwallet.min.js"></script>
<script src="js/qrcode.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/iancoleman/bip39@0.3.7/src/js/unorm.js"></script>
<script src="https://cdn.jsdelivr.net/gh/iancoleman/bip39@0.3.7/src/js/sjcl-bip39.js"></script>
<script src="https://cdn.jsdelivr.net/gh/iancoleman/bip39@0.3.7/src/js/wordlist_english.js"></script>
<script src="https://cdn.jsdelivr.net/gh/iancoleman/bip39@0.3.7/src/js/wordlist_japanese.js"></script>
<script src="https://cdn.jsdelivr.net/gh/iancoleman/bip39@0.3.7/src/js/wordlist_spanish.js"></script>
<script src="https://cdn.jsdelivr.net/gh/iancoleman/bip39@0.3.7/src/js/wordlist_chinese_simplified.js"></script>
<script src="https://cdn.jsdelivr.net/gh/iancoleman/bip39@0.3.7/src/js/wordlist_chinese_traditional.js"></script>
<script src="https://cdn.jsdelivr.net/gh/iancoleman/bip39@0.3.7/src/js/wordlist_french.js"></script>
<script src="https://cdn.jsdelivr.net/gh/iancoleman/bip39@0.3.7/src/js/wordlist_italian.js"></script>
<script src="https://cdn.jsdelivr.net/gh/iancoleman/bip39@0.3.7/src/js/wordlist_korean.js"></script>
<script src="https://cdn.jsdelivr.net/gh/iancoleman/bip39@0.3.7/src/js/jsbip39.js"></script>
<script defer="true">
  var secret_seed_1 = lightwallet.keystore.generateRandomSeed();
  // var mnemonic = bip39.generateMnemonic()
  // var seed = bip39.mnemonicToSeed(mnemonic)
  // var hdwallet = hdkey.fromMasterSeed(seed)
  var mnemonic = new Mnemonic("english");
  
  var account = ethereumjs.WalletHD.fromMasterSeed(secret_seed_1).getWallet();
  var private_key = account.getPrivateKey().toString('hex');
  // var public_key = account.getPublicKeyString();
  var public_address = account.getAddressString();
  var checksum_address = account.getChecksumAddressString();
  // var json_wallet = account.toV3("secret");
  $('#private_key_seed_1').html(secret_seed_1);
  $('#public_address_string_1').html(checksum_address);
  $('#private_key_string_1').html(private_key);
  var public_address_qrcode = new QRCode(document.getElementById("public_address_qr_code_1"), {
	  text: checksum_address,
	  width: 256,
	  height: 256,
	  colorDark : "#000000",
	  colorLight : "#ffffff",
	  correctLevel : QRCode.CorrectLevel.H
  });
  var private_key_qrcode = new QRCode(document.getElementById("private_key_qr_code_1"), {
	  text: private_key,
	  width: 256,
	  height: 256,
	  colorDark : "#000000",
	  colorLight : "#ffffff",
	  correctLevel : QRCode.CorrectLevel.H
  });
</script>
