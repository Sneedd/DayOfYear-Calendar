/*
 * datetime.js - DayOfYear viwer and printing template
 * Copyright 2020, Steffen Ott
 */

window.__DateTimeGlobal__ = {
    dayOfYearPerMonths: [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365 ],
    dayOfYearPerMonthsLeap: [ 0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366 ],
};

/**
 * The DateTime class represents a date and a time value and should feel almost like
 * the DateTime class in the .NET Framework. 
 */ 
function DateTime(year, month, day) {
    if (year instanceof Date) {
        this.date = year;
    } else {
        this.date = new Date(year, month-1, day);
    }
}

/**
 * Gets the day (1-31) of the date.
 */
DateTime.prototype.getDay = function() {    
    return (this.date.getDate()); 
};

/**
 * Gets the month (1-12) of the date.
 */
DateTime.prototype.getMonth = function() {    
    return (this.date.getMonth()+1); 
};

/**
 * Gets the day of week of the date.
 * 0 - Sunday, ..., 6 - Saturday
 * 0 - Monday, ..., 6 - Sunday
 */
DateTime.prototype.getDayOfWeek = function(mondayFirst) {    
    if (mondayFirst) {
        return ((this.date.getDay() + 6) % 7); 
    } else {
        return (this.date.getDay()); 
    }
};

/**
 * Gets the days of the month.
 */
DateTime.prototype.getDaysInMonth = function(year, month) { 
    var date = new Date(year, month, 0);
    return (date.getDate()); 
};

/**
 * Gets true, if the current year is a leap year; otherwise false.
 */
DateTime.prototype.isLeapYear = function() {
    var year = this.date.getFullYear();
    if (year % 4 == 0)
    {
        if (year % 100 == 0)
        {
            return (year % 400 == 0);
        }
        return (true);
    }
    return (false);
};
  
/**
 * Gets the day (1-366) of the year.
 */
DateTime.prototype.getDayOfYear = function() {
    var month = this.date.getMonth();
    var day = this.date.getDate();
    
    day = this.isLeapYear() 
        ? (window.__DateTimeGlobal__.dayOfYearPerMonthsLeap[month] + day) 
        : (window.__DateTimeGlobal__.dayOfYearPerMonths[month] + day);
    return (day);
};

/**
 * Adds the given days to the DateTime and returns the new date.
 */
DateTime.prototype.addDays = function(days) {
    var result = new Date(this.date);
    result.setDate(result.getDate() + days);
    return (new DateTime(result));
};












