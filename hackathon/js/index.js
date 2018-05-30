var i;
for (i = 0; i < 9; i++) {
  // var secret_seed_1 = lightwallet.keystore.generateRandomSeed();

  // var mnemonic = bip39.generateMnemonic()
  // var seed = bip39.mnemonicToSeed(mnemonic)
  // var hdwallet = hdkey.fromMasterSeed(seed)
  var mnemonic = new Mnemonic("english");
  var secret_words = mnemonic.generate();
  var passphrase = "verysecret";
  var secret_seed = mnemonic.toSeed(secret_words, passphrase);
  var hdwallet = ethereumjs.WalletHD.fromMasterSeed(secret_seed);
  // var account = ethereumjs.WalletHD.fromMasterSeed(secret_seed).getWallet();
  var path = "m/44'/60'/0'/0" // Jaxx and Metamask derivation Path
  var node = hdwallet.derivePath(path);
  var account = node.getWallet();
  var private_key = account.getPrivateKey().toString('hex');
  // var public_key = account.getPublicKeyString();
  // var public_address = account.getAddressString();
  var checksum_address = account.getChecksumAddressString();
  // var json_wallet = account.toV3("secret");
  // $('#private_key_words').html(secret_words_1);
  $("#accounts")
    .find('tbody')
    .append('<tr><td><span id="public_address_string_' + i
            + '">En cours de calcul...</span><br /><span id="public_address_qr_code_' + i
            + '"></span></td>'
            + '<td><span id="account_index">' + i
            + '</span></td>'
            + '<td><span id="private_key_string_' + i
            + '">En cours de calcul...</span><br /><span id="private_key_qr_code_' + i
            + '"></span></td></tr>');
  $('#public_address_string_'+i).html(checksum_address);
  $('#private_key_string_'+i).html(private_key);
} 

var i;

$(document).ready(function () {
  for (i = 0; i < 9; i++) {
    var public_address_qrcode = new QRCode(document.getElementById("public_address_qr_code_"+i), {
  	  text: checksum_address,
  	  width: 256,
  	  height: 256,
  	  colorDark : "#000000",
  	  colorLight : "#ffffff",
  	  correctLevel : QRCode.CorrectLevel.H
    });
    var private_key_qrcode = new QRCode(document.getElementById("private_key_qr_code_"+i), {
  	  text: private_key,
  	  width: 256,
  	  height: 256,
  	  colorDark : "#000000",
  	  colorLight : "#ffffff",
  	  correctLevel : QRCode.CorrectLevel.H
    });
  }
});
