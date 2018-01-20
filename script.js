var setup = function (setup_obj) {

  console.log('Using setup_obj:', setup_obj)
  var toggleSection = $(setup_obj.section);   // Replace with ID of your collapsible page section
  var toggleContent = $(setup_obj.content);   // Replace with ID of box containing hidden/visible content
  var toggleButton = $(setup_obj.button);     // Replace with ID of button that toggles section

  var sectionHeight = $(toggleSection).height();        // Height of section to show/hide
  var toggleContentTop = toggleContent.position().top;  // Top value of content

  toggleSection.css("display", "none");
  toggleContent.css("display", "none");
  console.log('Set display:none; for ' + setup_obj.section + ' and ' + setup_obj.content)

  // var otherSections = toggleSection.nextAll();
  var otherContent = toggleContent.siblings();
  console.log('otherContent', otherContent);

  var shown = false;

  var moveStuff = function () {
    if (shown) {
      for (var i = 0; i < otherContent.length; i++) {
        var content = $(otherContent[i]);
        var contentTop = content.position().top;
        //Is this element below toggleContent?
        if (contentTop > toggleContentTop) {
          // var newTopValue = contentTop + sectionHeight;
          content.animate({top: "+=" + sectionHeight + "px"}, 600);
        }
      }
      // TODO perhaps change these?
      $("#lp-pom-root, #lp-pom-root-color-overlay").height(function (index, height) {
        console.log('Shown, adjusting height to ' + (height - sectionHeight))
        return (height - sectionHeight);
      });
      shown = false;
    } else {
      for (var i = 0; i < otherContent.length; i++) {
        var content = $(otherContent[i]);
        var contentTop = content.position().top;
        console.log('content', content)
        console.log('contentTop', contentTop)
        //Is this element below toggleContent?
        if (contentTop > toggleContentTop) {
          var newTopValue = content.position().top - sectionHeight;
          content.animate({top: "-=" + sectionHeight + "px"}, 600);
        }
      }
      $("#lp-pom-root, #lp-pom-root-color-overlay").height(function (index, height) {
        console.log('Not shown, adjusting height to ' + (height - sectionHeight))
        return (height - sectionHeight);
      });
      shown = true;
    }
  }

  //Run moveStuff to adjust content on load
  moveStuff();

  toggleButton.click(function () { // ID of button/trigger
    toggleSection.slideToggle('slow');
    toggleContent.slideToggle('slow');
    moveStuff();
  });

}

var store = [
  {
    section: '#lp-pom-block-160',
    content: '#lp-pom-box-322',
    button: '#lp-pom-button-245'
  },
  {
    section: '#lp-pom-block-335',
    content: '#lp-pom-box-329',
    button: '#lp-pom-button-277'
  },
  {
    section: '#lp-pom-block-340', // todo update
    content: '#lp-pom-box-330',
    button: '#lp-pom-button-278'
  }
]

store.forEach(function (setup_obj) {
  setup(setup_obj)
})
