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
//= require bootstrap-sprockets
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
                    var dlLink = canvas2.toDataURL('image/png').replace(/^data:image\/png/, 'data:application/octet-stream');
                    $("#dl").html("<a download='overlay.png' href='"+ dlLink + "' class='btn btn-default'>DOWNLOAD</a>");
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

function updateFlag(e) {
    $("#flag img").attr("src","/images/flags/pack/"+(e.target.alt)+".png");
    updatePreview();
}

function updateFlags(s) {
    $("#flags .row").empty();
    s = s.toLowerCase();
    for (var i=0;i<flagz.length;i++) {
        if (downcased[i].match(s)) {
            $("#flags .row").append("<img class='flag-thumb' alt='"+flagz[i].replace('.png','')+"' width='80' height='39' src='/images/flags/thumb/"+flagz[i]+"'>");
        }
    }
    $("#flags img").click(function(e) {
        selectFlag(e);
        $(this).addClass("selected");
        updateFlag(e);
    });
}

function selectFlag(e) {
    console.log(e.target.alt);
    $("#flags img").removeClass("selected");
    $("#flags img").css({"opacity":"0.3"});
}

$(document).ready(function() {
    $("#searchFlag").val('');
});

$(window).load(function () {
    var state = 0;
    $("#flag").css({
      "width":$("#img img").width() - 4,
      "height":$("#img img").height() - 4
    });
    $("#overlay").css({
      "width":$("#img img").width(),
      "height":$("#img img").height()
    });
    $("#mix").change(function() {
        $("#img img").css("opacity", this.value);
        $("#flag img").css("opacity", (1 -this.value));
        updatePreview();
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
    
    $("#flag").append( "<div id='helper-arrow'><--Drag me to resize!</div>");
    $("#flags button:last-child").after( "<div id='flags-arrow'><-- Choose your flag</div>");
    $("#flags-arrow").delay(2000).fadeIn(500);
    updateFlags('');
    $("#flags img").click(function() {
        if (state == 0) {
            state = 1;
            $("#helper-arrow").delay(2000).fadeIn(500);
            $("#flags-arrow").fadeOut(500);
            $(".editor, .preview").css({
                "display":"none",
                "visibility":"visible"
            });
            $(".editor, .preview").show();
            updatePreview();
        }
    });
    $("#searchFlag").keyup(function() {
        updateFlags($("#searchFlag").val());
    });
    $("#flags img").click(function(e) {
        selectFlag(e);
        $(this).addClass("selected");
        updateFlag(e);
    });
    $("#searchFlag").focus();
});