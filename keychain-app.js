var keychain = require('keychain');

keychain.setPassword({ account: 'LucyTheCat4', service: 'LucyTheCat4', password: 'test4' }, function(err) {
  keychain.getPassword({ account: 'LucyTheCat2', service: 'LucyTheCat4'}, function(err, pass) {
    console.log('Password is', pass);
    // Prints: Password is baz
  });
});
