---
title: test hackathon
description : projets du hackathon
---
bla bla

<script src="js/ethereumjs-wallet-0.6.0.min.js"></script>
<script>
  var account = ethereumjs.Wallet.generate();
  var private_key = account.getPrivateKeyString();
  var public_key = account.getPublicKeyString();
  var address = account.getAddressString();
  var checksum_address = account.getChecksumAddressString();
  var json_wallet = account.toV3("secret");
</script>
