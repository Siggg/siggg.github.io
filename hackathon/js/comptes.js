var qr_code_size = 300;
var qr_code_options = { 
      // render method: 'canvas', 'image' or 'div'
      render: 'canvas',
      // version range somewhere in 1 .. 40
      minVersion: 1,
      maxVersion: 40,
      // error correction level: 'L', 'M', 'Q' or 'H'
      ecLevel: 'H',
      // offset in pixel if drawn onto existing canvas
      left: 0,
      top: 0,
      // size in pixel
      size: qr_code_size,
      // code color or image element
      fill: '#000',
      // background color or image element, null for transparent background
      background: '#fff',
      // content
      text: "no text",
      // corner radius relative to module width: 0.0 .. 0.5
      radius: 0.5,
      // quiet zone in modules
      quiet: 1,
      // modes
      // 0: normal
      // 1: label strip
      // 2: label box
      // 3: image strip
      // 4: image box
      mode: 2,
      // size of text
      mSize: 0.08,
      mPosX: 0.5,
      mPosY: 0.5,
      label: "no label",
      fontname: 'sans',
      fontcolor: '#000',
      image: null
    };

var number_of_accounts = 10;

var zip = new JSZip();
var i;
for (i = 0; i < number_of_accounts; i++) {
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
            + '">En cours de calcul...</span><br />'
            + '<canvas width="' + qr_code_size
            + '" height="' + qr_code_size
            + '" id="public_address_qr_code_' + i
            + '"></canvas></td>'
            + '<td><span id="private_key_string_' + i
            + '">En cours de calcul...</span><br />'
            + '<canvas width="' + qr_code_size
            + '" height="' + qr_code_size
            + '" id="private_key_qr_code_' + i
            + '"></canvas></td></tr>');
  $('#public_address_string_'+i).html(checksum_address);
  $('#private_key_string_'+i).html(private_key);

  var qr_name = "public_address_qr_code_"+i;
  qr_code_options['label'] = "Adresse "+checksum_address.substring(0,6) + "...";
  qr_code_options['text'] = checksum_address;
  qr_code_options['fill'] = '#000';
  qr_code_options['fontcolor'] = '#000';
  $("#" + qr_name).qrcode(qr_code_options);
  var padded_index = ("000" + i).slice(-3);
  zip.file(padded_index + '_public_address.txt', checksum_address);
  var qr_name = "private_key_qr_code_"+i;
  qr_code_options['label'] = "Clé secrète pour "+checksum_address.substring(0,6) + "...";
  qr_code_options['text'] = private_key;
  qr_code_options['fill'] = '#900';
  qr_code_options['fontcolor'] = '#f00';
  $("#" + qr_name).qrcode(qr_code_options);
  zip.file(padded_index + '_private_key.txt', private_key);
}; 

$(document).ready(function () {
  var i;
  for (i = 0; i < number_of_accounts; i++) {
    var padded_index = ("000" + i).slice(-3);
    var qr_name = "public_address_qr_code_"+i;
    var dataURL = $("#" + qr_name).get(0).toDataURL();
    // console.log(dataURL);
    zip.file(padded_index + '_public_address.png', dataURL.split('base64,')[1], {base64: true});
    var qr_name = "private_key_qr_code_"+i;
    var dataURL = $("#" + qr_name).get(0).toDataURL();
    // console.log(dataURL);
    zip.file(padded_index + '_private_key.png', dataURL.split('base64,')[1], {base64: true});
  };
  zip.generateAsync({type:"blob"})
  .then(function(content) {
    saveAs(content, "example.zip");
  });
});


