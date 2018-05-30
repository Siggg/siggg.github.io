  // var secret_seed_1 = lightwallet.keystore.generateRandomSeed();

  // var mnemonic = bip39.generateMnemonic()
  // var seed = bip39.mnemonicToSeed(mnemonic)
  // var hdwallet = hdkey.fromMasterSeed(seed)
  var mnemonic = new Mnemonic("english");
  var secret_words_1 = mnemonic.generate();
  var passphrase = "";
  var secret_seed_1 = mnemonic.toSeed(secret_words_1, passphrase);
  
  var account = ethereumjs.WalletHD.fromMasterSeed(secret_seed_1).getWallet();
  var private_key = account.getPrivateKey().toString('hex');
  // var public_key = account.getPublicKeyString();
  var public_address = account.getAddressString();
  var checksum_address = account.getChecksumAddressString();
  // var json_wallet = account.toV3("secret");
  $('#private_key_words_1').html(secret_words_1);
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
