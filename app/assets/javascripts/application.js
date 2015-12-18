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

function updatePreview() {
        $("#flag").css({
            "border":"none",
            "width":$("#flag").width() + 4,
            "height":$("#flag").height() + 4
        });
        html2canvas($("#overlay"), {
            allowTaint: true,
            taintTest: true,
            onrendered: function(canvas) {
                var canvas2 = document.getElementById("canvas2");
                $("#canvas2").css({
                    "width":$("#flag").width(),
                    "height":$("#flag").height()
                });
                var context = canvas2.getContext('2d');
                
                var imageObj = new Image();
                imageObj.onload = function() {
                    context.clearRect(0, 0, canvas2.width, canvas2.height);
                    canvas2.width = $("#flag").width();
                    canvas2.height = $("#flag").height();
                    var left = $('#flag').css( "left" ).replace(/[^-\d\.]/g, '');
                    var top = $('#flag').css( "top" ).replace(/[^-\d\.]/g, '');
                    context.drawImage(imageObj, left, top, $("#flag").width(), $("#flag").height(), 0, 0, $("#flag").width(), $("#flag").height());
                };
                imageObj.src = canvas.toDataURL();
            }
        });
        $("#flag").css({
            "border":"solid 2px black",
            "width":$("#flag").width() - 4,
            "height":$("#flag").height() - 4
        });
    };

function updateFlag(event) {
    switch (event.data.param) {
        case 1:
            $("#flag img").attr("src","/images/flags/fr.png");
            break;
        case 2:
            $("#flag img").attr("src","/images/flags/us.png")
            break;
        case 3:
            $("#flag img").attr("src","/images/flags/cn.png")
            break;
    }
    updatePreview();
}

$(window).load(function () {
    $("#flag").css({
      "width":$("#img img").width() - 4,
      "height":$("#img img").height() - 4,
    });
    $("#overlay").css({
      "width":$("#img img").width(),
      "height":$("#img img").height()
    });
    $("#mix").change(function() {
        $("#img img").css("opacity", this.value);
        $("#flag img").css("opacity", (1 -this.value));
    });
    $("#fit").click(function() {
        $("#flag").css({
            "left":0,
            "top":0,
            "width":$("#img img").width() - 4,
            "height":$("#img img").height() - 4
        });
        updatePreview();
    });
    $("#go").click(updatePreview);
    $("#flag").on("dragstop", updatePreview);
    $("#flag").on("resizestop", updatePreview);
    $("#flag").draggable({ containment: $("#img img") });
    $("#flag").resizable({ containment: $("#img img"), handles: 'ne, se, sw, nw' });
    $("#flag1").bind('click', { param: 1 }, updateFlag);
    $("#flag2").bind('click', { param: 2 }, updateFlag);
    $("#flag3").bind('click', { param: 3 }, updateFlag);
    
    updatePreview();
});