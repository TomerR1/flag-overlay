// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery-ui
//= require turbolinks
//= require_tree .


$(document).ready(function () {
    $("#flag").css({
      "width":$("#img img").width() - 2
    });
    $("#mix").change(function() {
        $("#img img").css("opacity", this.value);
        $("#flag img").css("opacity", (1 -this.value));
    });
    $("#fit").click(function() {
        $("#flag").css({
            "width":$("#img img").width()
        });
    });
    $("#go").click(function() {
        html2canvas($("#flag"), {
            allowTaint: true,
            taintTest: true,
            onrendered: function(canvas) {
               $("#result").append(canvas);
            }
        });
    });
    $("#flag").draggable({ containment: $("#img img") });
    $("#flag").resizable({ containment: $("#img img"), handles: 'ne, se, sw, nw', aspectRatio: 'true' });
});