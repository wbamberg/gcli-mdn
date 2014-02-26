*This is just a demo at the moment.*

This add-on adds an "mdn css" command to the [Developer Toolbar](https://developer.mozilla.org/en-US/docs/Tools/GCLI), aka GCLI.

The command takes one argument, which is the name of a CSS property. It shows a summary of the documentation for that property, taken from its MDN page.

For example, if you type:

  mdn css color

...then the toolbar will display the summary documentation from https://developer.mozilla.org/en-US/docs/Web/CSS/color. It also shows a link which should take the user to that page, but that's not implemented yet.

To test it, download the "gcli-mdn.xpi" file from this directory, and open it in Firefox. Firefox will ask if you want to install it, say yes.

It uses the MDN JSON API described here: https://bugzilla.mozilla.org/show_bug.cgi?id=768456#c17 and displays the "excerpt" field as the summary. Note that this doesn't always contain sensible information, and we should fix this.

This is just a demo at the moment. We should take the code in lib/main.js and make it a proper patch for the dev toolbar. We should also consider making it display more interesting stuff such as an example, but that will mean extending the MDN JSON API.