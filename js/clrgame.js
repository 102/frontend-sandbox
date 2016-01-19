function getColors(difficulty) {
  var init = [0, 0, 0];
  var rate = 30 * difficulty + 15;
  for (i = 0; i < init.length; ++i) {
    init[i] = 3 * rate + (Math.round(Math.random() * (255 - 3 * rate)));
  }
  var colors = [];
  var color = '#';
  for (var i = 0; i < 3; ++i) {
    for (var j = 0; j < 3; ++j) {
      x = init[j] - i*rate;
      color += ((x = x.toString(16)).length == 2 ? x : '0' + x);
    }
    colors[i] = color;
    color = '#';
  }
  return colors;
}

$(function() {
  var $window = $(window);
  var $game = $('#game');
  $game.hide();
  var red = '';
  var green ='';
  var blue = '';
  $( '#start' ).click(function() {
    var $level = $('#level').val();
    if ($level == 'easy') colors = getColors(2);
    if ($level == 'medium') colors = getColors(1);
    if ($level == 'hard') colors = getColors(0);
    red = colors[0];
    green = colors[1];
    blue = colors[2];
    $game.show();
    $('#pre').hide();

    for (var i = 1; i < 15; ++i) {
        if (i > 3) {
          var x = Math.round(($window.width()-50)*Math.random());
          var y = Math.round(($window.height()-50)*Math.random());
          $( "div:nth-of-type(" + i + ")" )
            .css('left',x).css('top',y)
            .css('background-color', i < 7 ? red : i < 10 ? green : blue);
        } else {
          $( "div:nth-of-type(" + i + ")" )
            .css('left', $window.width() / 3 * (i-1) + $window.width() / 6 - 35).css('top','40vh')
            .css('background-color', i ==1 ? red : i == 2 ? green : blue);
        }
    }
    var counter = 9;
    $('span').text('Remaining: ' + counter);
    $game.css('background-color', 'white');
    for (i = 1; i < 4; ++i) {
      $( ".draggable" + i ).draggable();
      $( "#droppable" + i ).droppable({
        accept: '.draggable' + i,
        drop: function( event, ui ) {
          if (--counter != 0) $( 'span' ).text('Remaining: ' + counter);
          else $( 'span' ).text('YOU WIN');
          ui.draggable.hide();
        }
      });
    }
});

});
