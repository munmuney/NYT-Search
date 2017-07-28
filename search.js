$(document).ready(function() {


$("#clear").click(function(){
  $("#info").empty();
});

$("#searchButton").click(function() {




var searchTerm = $("#form1").val();
var begin_date = $("#form3").val() + "0101";
var end_date = $("#form4").val() + "1231";
var pages = $("select").val();

console.log("searchTerm: " + searchTerm, " begin_date: " + begin_date, "end_date: " + end_date, " p: " + pages);


  var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";



  url += '?' + $.param({
    'api-key': "852b931521a545cf8a58a79caf1b8031",
    'q': searchTerm,
    'begin_date': begin_date,
    'end_date': end_date,
    'sort': "newest",
    'hl': "true"
  });
  $.ajax({
    url: url,
    method: 'GET',
  }).done(function(result) {


    for(var i = 0; i < pages; i++) {
      var newDiv = $("<div>");
      newDiv.attr("id","article");

      var title = result.response.docs[i].headline.main;
      var author = result.response.docs[i].byline.original;
      var pub_date = result.response.docs[i].pub_date;
      var article = result.response.docs[i].web_url;


      console.log("Article Link: " + article, " Title: " + title, " Author: " + author, " Pub date: " + pub_date);

      //var p = $("<p>");
      var h2 = $("<h2>").append(title);
      var p1 = $("<p>").append(author);
      var p2 = $("<p>").append(pub_date);
      var a = $("<a>").attr("href", article).append("Article");
      newDiv.append(h2,p1,p2,a);


      $("#info").append(newDiv);


    }






  }).fail(function(err) {
    throw err;
  });

});

});


