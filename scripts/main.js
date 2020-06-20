/*
 * main.js - DayOfYear viwer and printing template
 * Copyright 2020, Steffen Ott
 */

 
function RushCalendar() {
    
    this.monthNames = { 
        "de" : ["Januar", "Februar", "M&auml;rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
        "en" : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Oktober", "November", "Dezember" ],
        "hr" : ["Sije&#269;anj", "Velja&#269;a", "O&#382;ujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac" ]
    };
    this.weekDayNames = {
        "de" : ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
        "en" : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        "hr" : ["Pon", "Uto", "Sri", "Cet", "Pet", "Sub", "Ned"]
    };
    this.lang = "en";
    this.year = 0;
    this.init();
}

RushCalendar.prototype.init = function() {

    this.year = (new Date()).getFullYear();
    var navElement = $("#cal-nav");
    var yearSelect = $("<div></div>");    
    navElement.append(yearSelect);

    for (var i = this.year-5; i<this.year+5; ++i) {
        if (this.year == i) {
            yearSelect.append("<a class=\"w3-bar-item w3-button w3-blue-gray cal-year-select\" href=\"#\">" + i + "</a>");
        } else {
            yearSelect.append("<a class=\"w3-bar-item w3-button cal-year-select\" href=\"#\">" + i + "</a>");
        }
    }

    navElement.append("<div style=\"border: 1px solid gray; margin: 5px;\"></div>");

    var languageSelect = $("<div></div>");
    navElement.append(languageSelect);
    languageSelect.append("<a class=\"w3-bar-item w3-button w3-blue-gray cal-language-select\" data-lang=\"en\" href=\"#\">English</a>");
    languageSelect.append("<a class=\"w3-bar-item w3-button cal-language-select\" data-lang=\"de\" href=\"#\">Deutsch</a>");
    languageSelect.append("<a class=\"w3-bar-item w3-button cal-language-select\" data-lang=\"hr\" href=\"#\">Hrvatski</a>");

    this.render();

    $("nav.w3-sidebar a").click(function(event) {

        var clicked = $(event.target);

        // Exchange background color
        clicked.siblings().removeClass("w3-blue-gray");
        clicked.addClass("w3-blue-gray");

        if (clicked.hasClass("cal-year-select")) {        

            // Parse year and render
            this.year = parseInt(clicked.text());
            this.render();
            return (false);

        } else if (clicked.hasClass("cal-language-select")) {

            // Read language code and render
            this.lang = clicked.data("lang");
            this.render();
            return (false);
        }

    }.bind(this));
};

RushCalendar.prototype.render = function() {

    for (var month = 1; month < 13; ++month)
    {
        // Render month name
        var monthCaptionElement = $("<h6 class=\"cal-month\">" + this.monthNames[this.lang][month-1] + "</h6>");

        // Render month table
        var monthTableElement = $("<table class=\"w3-table w3-centered\"></table>");

        // Render table header
        var tableHeader = $("<tr></tr>");
        for (var i = 0; i < 7; ++i)
        {            
            tableHeader.append("<td><b>" + this.weekDayNames[this.lang][i] + "</b></td>");
        }
        monthTableElement.append(tableHeader);

        // Calculate when this month starts
        var currentDate = new DateTime(this.year, month, 1);        
        currentDate = currentDate.addDays(-currentDate.getDayOfWeek(true));
        
        // Render the weeks for the month
        for (var i = 0; i < 6; ++i)
        {            
            var weekElement = $("<tr></tr>");
            for (var j = 0; j < 7; ++j)
            {            
                if (currentDate.getMonth() != month)                
                {
                    weekElement.append("<td class=\"w3-text-light-gray\">" 
                        + currentDate.getDay() 
                        + "<br/>" 
                        + currentDate.getDayOfYear() 
                        + "</td>");
                }
                else
                {
                    weekElement.append("<td>" 
                        + currentDate.getDay() 
                        + "<br/>" 
                        + currentDate.getDayOfYear() 
                        + "</td>");
                }
                currentDate = currentDate.addDays(1);
            }
            monthTableElement.append(weekElement);
        }

        var monthElement = $("td#cal-month-" + month);
        monthElement.empty();
        monthElement.append(monthCaptionElement);
        monthElement.append(monthTableElement);

        var yearElement = $("#cal-year");
        yearElement.text(this.year);
    }
};


$(function() {
    window.cal = new RushCalendar();
});