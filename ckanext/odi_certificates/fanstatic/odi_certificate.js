// Enable JavaScript"s strict mode. Strict mode catches some common
// programming errors and throws exceptions, prevents some unsafe actions from
// being taken, and disables some confusing and bad JavaScript features.
"use strict";


/* odi_certificates
 *
 * This JavaScript module loads a image from Open Data Certificate from the API
 * On successful load of image it will set the certificate link to the Open Data Certificate website and show the div
 * On error (404) loading image it will hide the div
 *
 * certificate_img_url - The Open Data Certificate img API query
 * certificate_link_url - The Open Data Certificate link API query
 *
 */
ckan.module("odi_certificates", function ($) {
  return {
    initialize: function () {
      // This is a shortcut function provided by CKAN, it wraps jQuery's
      // proxy() function: http://api.jquery.com/jQuery.proxy/
      $.proxyAll(this, /_on/);

      // Gather option data
      var certificateImgSrc = this.options.certificate_api_urls.certificate_img_url;
      var certificateLinkHref = this.options.certificate_api_urls.certificate_link_url;

      // Setup onload and onerror events
      this.$("#certificateImg")
        .one("load", this._onLoad(certificateLinkHref))
        .one("error", this._onError)
        .attr("src", certificateImgSrc)
        .each(function() {
          //Cache fix for browsers that don't trigger .load()
          if(this.complete) $(this).trigger('load');
        });
    },

    _onLoad: function (certificateLinkHref) {
      // Hack work around
      // For some reason this load event gets called before the img is even rendered so the div gets show with an empty img for a second which doesn't look the best
      // Also for some reason this event gets called before the onError event so we check the naturalWidth of img to see if the img was successfully rendered
      for (var start = 1; start < 5; start++) // every .5 seconds for a total of 2.5 seconds to give the img time to load
        setTimeout(function () {
          // Only 1 the first time by checking if the div is still hidden
          if (this.$("#odi_certificates").is(":hidden") && this.$("#certificateImg")[0].naturalWidth > 0 ) {
            this.$("#certificateLink").attr("href", certificateLinkHref);
            this.$("#odi_certificates").fadeIn();
          }
        },500*start); 
    },

    _onError: function () {
      this.el.hide();
    }
  };
});