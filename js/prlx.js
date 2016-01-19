$(function(){
  var boxes = $('.box');
  var $window = $(window);
  $window.scroll(function() {
    var scrollTop = $window.scrollTop();
    boxes.each(function() {
      var $this = $(this);
      var yscrollspeed = parseInt($this.data('yscroll-speed'));
      var yval = - scrollTop / yscrollspeed;
      var xscrollspeed = parseInt($this.data('xscroll-speed'));
      var xval = - scrollTop / xscrollspeed;
      var sval = (1 - scrollTop/1500) > 0 ? (1 - scrollTop / 1250) : 0;
      if (xval) $this.css({transform: 'translateX(' + xval + 'px) scale(' + sval + ')'});
      if (yval) $this.css({transform: 'translateY(' + yval + 'px) scale(' + sval + ')'});
      if (scrollTop == 0) {
        $this.css('transform', 'translateX(' + 0 + 'px)');
        $this.css('transform', 'translateY(' + 0 + 'px)');
      }
    });
  });
})
