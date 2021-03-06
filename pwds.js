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

var charKeys = Object.keys(chars);
var keyRegex = new RegExp('[^' + charKeys + ']', 'g');

var patternInput = document.getElementById('pattern');
var patternLength = document.getElementById('pattern-length');
var passwordList = document.getElementById('passwords');
var passwordHeight = 45;

var help = function() {
  alert('Pattern Character Legend\n\n' +
        '9    Digits\n' +
        'v    lowercase vowels\n' +
        'V    Uppercase vowels\n' +
        'c    lowercase consonants\n' +
        'C    Uppercase consonants\n' +
        'l    lowercase letters\n' +
        'U    Uppercase letters\n' +
        'a    lowercase alphanumerics\n' +
        'A    Uppercase alphanumerics\n' +
        '#    Special characters\n' +
        '*    Any character\n');
};

var generatePattern = function() {
  var i;
  var possible = ['cv', 'CV', '99'];
  var length = Math.floor(Math.random() * (7 - 4) + 4);
  var pattern = new Array(length);
  for (i = 0; i < length; i++) {
    pattern.push(possible[Math.floor(Math.random() * possible.length)]);
  }
  patternInput.value = pattern.join('');
  patternLength.innerHTML = patternInput.value.length;
};

var sanitizePattern = function() {
  var sanitizedPattern = patternInput.value.replace(keyRegex, '');
  patternInput.value = sanitizedPattern;
  patternLength.innerHTML = sanitizedPattern.length;
  return sanitizedPattern;
};

var appendPasswords = function(number) {
  var pattern = sanitizePattern();
  if (!pattern.length) return;

  generatePasswords(pattern, number).forEach(function(password) {
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(password));
    passwordList.appendChild(li);
  });
};

var generatePasswords = function(pattern, number) {
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
};

var fillViewport = function() {
  var viewport = document.documentElement.clientHeight;
  var docHeight = document.documentElement.offsetHeight;
  if (viewport < docHeight) return;
  var emptySpace = viewport - docHeight;
  var possiblePasswords = Math.ceil(emptySpace / passwordHeight);
  appendPasswords(possiblePasswords + 1);
};

var appendOnePage = function() {
  var viewport = document.documentElement.clientHeight;
  appendPasswords(Math.ceil(viewport / passwordHeight));
  window.scrollTo(0, document.body.scrollHeight);
};

var newPattern = function() {
  generatePattern();
  appendOnePage();
};

var scrollOptions = {
  distance: 200,
  callback: function(done) {
    appendPasswords(Math.ceil(this.distance / passwordHeight));
    done();
  }
};
infiniteScroll = new InfiniteScroll(scrollOptions);
infiniteScroll.enable();

generatePattern();
fillViewport();

window.addEventListener('resize', fillViewport);
