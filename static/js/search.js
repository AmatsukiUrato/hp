// TODO: jQueryを削除する
var lunrIndex, $results, pagesIndex;

function initLunr() {
  $.getJSON("/index.json").done(function(index) {
      pagesIndex = index;
      lunrIndex = lunr(function() {
        var lunrConfig = this;
        lunrConfig.use(lunr.multiLanguage('en', 'jp'));
        lunrConfig.ref("ref");
        lunrConfig.field("contents");
        pagesIndex.forEach(function(page) {
          lunrConfig.add(page);
        });
      });
    })
  .fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.error("Error getting Hugo index flie:", err);
  });
}

function search(){
  $results = $("#results");
  $results.css('display', 'block');
  $results.empty();
  var query = document.getElementById('search-query').value;
  if (query.length < 2) {
    return;
  }
  renderResults(results(query));
}

function results(query) {
  return lunrIndex.search(`*${query}*`).map(function(result) {
    return pagesIndex.filter(function(page) {
      return page.ref === result.ref;
    })[0];
  });
}

function renderResults(results) {
  var $result = $("<div>", {
    class: "dropdown-content"
  });
  if (!results.length) {
    $result.append($('<div>',{
      class: "dropdown-item",
    }).append($('<p>',{ text: "No matches found"})));
  } else {
    results.forEach(function(result) {
      $result.append($("<a></a>", {
        href: result.ref,
        class: "dropdown-item",
        text: result.title.length >= 30 ? result.title.slice(0, 30) + "..." : result.title
      }));
    });
  }
  $results.append($result);
}

initLunr();

$(document).on('click',(e) => {
  if(e.target.closest('#search-query, #results') == null) {
    $results.empty();
  }
});

document.querySelector('#search-form').addEventListener('focusin', (event) => {
  search();
});
