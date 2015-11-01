var chars = {};
chars['#'] = '#!$%@_-+=';
chars['9'] = '0123456789';
chars['v'] = 'aeiouy';
chars['V'] = chars['v'].toUpperCase();
chars['c'] = 'bcdfghjklmnprstvwxz';
chars['C'] = chars['c'].toUpperCase();
chars['l'] = 'abcdefghijklmnoprstuvwxyz';
chars['U'] = chars['l'].toUpperCase();
chars['a'] = chars['l'] + chars['9'];
chars['A'] = chars['U'] + chars['9'];
chars['*'] = chars['l'] + chars['U'] + chars['9'] + chars['#'];

function generate() {
  var pattern = document.getElementById("pattern").value;
  var ul = document.getElementById("passwords");

  randomPasswords(pattern, 8).forEach(function(password) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(password));
    ul.insertBefore(li, ul.firstChild);
  });
}

function randomPasswords(pattern, number) {
  var i, j, password, possible;
  var passwords = [];

  for (i = 0; i < number; i++) {
    password = new Array(pattern.length);
    for (j = 0; j < pattern.length; j++) {
      possible = chars[pattern.charAt(j)];
      password.push(possible.charAt(Math.floor(Math.random() * possible.length)));
    }
    passwords.push(password.join(''));
  }
  return passwords;
}
