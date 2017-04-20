const fs = require('fs');

fs.writeFile('target.txt', 'loooooooong cat', function(err) {
  if(err) {
    throw err;
  }
  console.log('file saved');
})
