
const { Cu, Cc, Ci } = require('chrome');
let promise = require("sdk/core/promise");
Cu.import("resource:///modules/devtools/gcli.jsm");

gcli.addCommand({
  name: "mdn",
  description: "..."
});

gcli.addCommand({
  name: 'mdn css',
  description: "...",
  params: [
    {
      name: 'property',
      type: 'string',
    }
  ],
  returnType: 'mdn',

  exec: function(args, context) {
    var deferred = promise.defer();

    var url = "https://developer.mozilla.org/en-US/search.json?q=" + args.property + "&topic=css";  
    var xhr = Cc['@mozilla.org/xmlextras/xmlhttprequest;1']
                .createInstance(Ci.nsIXMLHttpRequest);

    xhr.onload = function onload() {
      try {
        let response = JSON.parse(xhr.responseText);
        deferred.resolve({ property: args.property, response: response });
      }
      catch (ex) {
        deferred.reject(ex);
      }
    }.bind(this);

    xhr.onabort = xhr.onerror = xhr.ontimeout = function(err) {
      deferred.reject(err);
    }.bind(this);

    try {
      xhr.open('GET', url);
      xhr.send();
    }
    catch (ex) {
      deferred.reject(ex);
    }

    return deferred.promise;
  }
});

gcli.addConverter({
  from: "mdn",
  to: "view",
  exec: function(mdn, context) {
    mdn.excerpt = function(parent) {
      parent.innerHTML = mdn.response.documents[0].excerpt;
      return '';
    };

    return context.createView({
      html: "<div><h2>CSS Properties: ${property}</h2>" +
            "<p style='${excerpt(__element)}'></p>" +
            "<div style='text-align:right'>" +
            "<a href='${response.documents[0].link}'>" +
            "Click for more</a></div></div>",
      data: mdn,
      options: { allowEval: true }
    });
  }
});
