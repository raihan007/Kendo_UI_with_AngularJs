/* [ ---- Admin Panel - sticky notifications ---- ] */
(function ($) {

    // Using it without an object
    $.sticky = function (note, options, callback) { return $.fn.sticky(note, options, callback); };

    $.fn.sticky = function (note, options, callback) {
        // Default settings
        var settings =
        {
            speed: "fast",// animations: fast, slow, or integer
            duplicates: true,
            autoclose: 5000,
            position: "top-center",
            type: ""
        };
        // Passing in the object instead of specifying a note
        if (!note) {
            note = this.html();
        }
        if (options) {
            $.extend(settings, options);
        }
        // Variables
        var display = true;
        var duplicate = 'no';
        // Somewhat of a unique ID
        var uniqID = Math.floor(Math.random() * 99999);

        // Handling duplicate notes and IDs
        $('.sticky-note').each(function () {
            if ($(this).html() == note && $(this).is(':visible')) {
                duplicate = 'yes';
                if (!settings.duplicates) {
                    display = false;
                }
            }
            if ($(this).attr('id') == uniqID) {
                uniqID = Math.floor(Math.random() * 9999999);
            }
        });
        // Make sure the sticky queue exists
        if (!$('body').find(".sticky-queue." + settings.position).html()) {
            $('body').append('<div class="sticky-queue ' + settings.position + '"></div>');
        }

        // Can it be displayed?
        if (display) {
            // Building and inserting sticky note
            $(".sticky-queue." + settings.position).prepend('<div class="sticky border-' + settings.position + " " + settings.type + '" id="' + uniqID + '"></div>');

            $('#' + uniqID).append('<span class="close st-close" rel="' + uniqID + '" title="Close" >&times;</span>');
            var newDate = new Date();
            $('#' + uniqID).append('<span class="st-time" title="Close" >' + newDate.timeNow() + '</span>');
            ///
            var icon = ' ';
            if (settings.type == "st-success") {
                icon = 'glyphicon-ok';
            } else if (settings.type == "st-error") {
                icon = 'glyphicon-ban-circle';
            } else if (settings.type == "st-info") {
                icon = 'glyphicon-info-sign';
            } else if (settings.type == "st-warning") {
                icon = 'glyphicon-warning-sign';
            } else {
                icon = 'glyphicon-signal';
            }
            ///
            $('#' + uniqID).append('<div class="sticky-note" rel="' + uniqID + '"><i class="glyphicon ' + icon + '"></i>&nbsp; ' + note + '</div>');

            // Smoother animation
            var height = $('#' + uniqID).height();
            $('#' + uniqID).css('height', '100%');
            $('#' + uniqID).slideDown(settings.speed);
            display = true;
        }

       // $(".sticky").ready(function () {
            // If 'autoclose' is enabled, set a timer to close the sticky
           
            if (settings.autoclose) {
              $('#' + uniqID).delay(settings.autoclose).slideUp(settings.speed, function () {
                    var stickyBox = $(this).closest(".sticky-queue");
                    var c = stickyBox.find(".sticky");
                    $(this).remove();
                    c.length == "1" && stickyBox.remove();
                });
            }
        //});
        // Closing a sticky
        $('.st-close').click(function () {
            $('#' + $(this).attr('rel')).dequeue().slideUp(settings.speed, function () {
                var stickyBox = $(this).closest(".sticky-queue");
                var c = stickyBox.find(".sticky");
                $(this).remove();
                c.length == "1" && stickyBox.remove();
            });
        });
        // Callback data
        var response =
        {
            id: uniqID,
            duplicate: duplicate,
            displayed: display,
            position: settings.position,
            type: settings.type
        };
        // Callback function?
        if (callback) {
            callback(response);
        } else {
            return (response);
        }
    };
    //For todays date;
    Date.prototype.today = function () {
        return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear()
    };
    //For the time now
    Date.prototype.timeNow = function () { return ((this.getHours() < 10) ? "0" : "") + ((this.getHours() > 12) ? (this.getHours() - 12) : this.getHours()) + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds() + ((this.getHours() > 12) ? (' pm') : ' am'); };

})(jQuery);