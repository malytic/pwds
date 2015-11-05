/**
 * CREDITS
 * https://github.com/alexblack/infinite-scroll
 * https://github.com/rusintez/infinite-scroll
 */

var isIE = /msie/gi.test(navigator.userAgent);

function getScrollPos() {
  if (isIE) {
    return document.documentElement.scrollTop;
  } else {
    return window.pageYOffset;
  }
}

function InfiniteScroll(options) {
  if (!(this instanceof InfiniteScroll)) {
    return new InfiniteScroll(options);
  }
  options.callback = options.callback || function() {};
  options.distance = options.distance || 50;

  this.updateInitiated = false;
  this.prevScrollPos = getScrollPos();
  this.options = options;
  this.enabled = false;

  window.addEventListener('scroll',    this._onScroll.bind(this), false);
  window.addEventListener('touchmove', this._onScroll.bind(this), false);
}

InfiniteScroll.prototype._onScroll = function(e) {
  if (!this.enabled) return;
  if (this.updateInitiated) return;

  var scrollPos = getScrollPos();
  if (scrollPos === this.prevScrollPos) return;

  var body = document.body;
  var html = document.documentElement;

  var pageHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  var clientHeight = document.documentElement.clientHeight;

  if (pageHeight - (scrollPos + clientHeight) < this.options.distance) {
    this.updateInitiated = true;
    this.options.callback(function() {
      this.updateInitiated = false;
    }.bind(this));
  }
  this.prevScrollPos = scrollPos;
};

InfiniteScroll.prototype.enable = function() {
  this.enabled = true;
};

InfiniteScroll.prototype.disable = function() {
  this.enabled = false;
};
