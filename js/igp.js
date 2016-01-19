$(function() {
  function randomhandler() {
    function get_random() {
      $.ajax({
        url: "https://api.instagram.com/v1/media/popular?client_id=68ed5b515dc84031b707c351fa227eaf",
        dataType: "jsonp",
        success: function(response) {
          console.log(image_url = response.data[Math.round(Math.random() * 100) % 20].images.standard_resolution.url); // server response
          $('#img').css('background-image', 'url(' + image_url + ')');
        }
      });
    }
    var client_id = "68ed5b515dc84031b707c351fa227eaf";
    var username = '';
    if (username = $("#username").val())
      $.ajax({
        url: "https://api.instagram.com/v1/users/search?q=" + username + "&client_id=68ed5b515dc84031b707c351fa227eaf",
        dataType: "jsonp",
        success: function(response) {
          if (response.data[0] !== undefined) {
            var userid = response.data[0].id;
            var getrecent_url = "https://api.instagram.com/v1/users/" + userid + "/media/recent/?client_id=" + client_id;
            $.ajax({
              url: getrecent_url,
              dataType: "jsonp",
              success: function(response) {
                var image_url = response.data[Math.round(Math.random() * 100) % response.data.length].images.standard_resolution.url; // server response
                $('#img').css('background-image', 'url(' + image_url + ')');
              }
            });
          } else {
            $("#username").val('wrong username');
            get_random();
          }
        }
      });
    else {
      get_random();
    };
  };
  $("#getphoto").click(randomhandler);
  $('#username').keypress(function(e) {
    if (e.which == 13) {
      randomhandler();
      return false;
    }
  });
})
