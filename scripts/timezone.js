// Original script by Josh Fraser (http://onlineaspect.com/2007/06/08/auto-detect-a-time-zone-with-javascript/)
// Updated by Garrett Dimon (http://sifterapp.com) to work with Rails time zone select lists.
function selectTimeZone() {
  // Get the current time from the user agent including the time zone offset
  // rightNow = Mon May 10 2010 12:28:38 GMT-500 (CDT)
  var rightNow = new Date();

  // Use the current date/time to get January 1st and June 1st represtations to help determine daylight savings time

  // jan1 = Fri Jan 01 2010 00:00:00 GMT-0600 (CST)
  var jan1 = new Date(rightNow.getFullYear(), 0, 1, 0, 0, 0, 0);
  
  // june1 = Thu Jul 01 2010 00:00:00 GMT-0500 (CDT)
  var june1 = new Date(rightNow.getFullYear(), 6, 1, 0, 0, 0, 0);
  
  // temp = Fri, 01 Jan 2010 06:00 GMT
  var temp = jan1.toGMTString();

  // jan2 = Fri Jan 01 2010 06:00:00 GMT-0600 (CST)
  var jan2 = new Date(temp.substring(0, temp.lastIndexOf(" ")-1));

  // temp = Thu, 01 Jul 2010 05:00:00 GMT
  temp = june1.toGMTString();

  // june2 = Thu Jul 01 2010 05:00:00 GMT-0500 (CDT)
  var june2 = new Date(temp.substring(0, temp.lastIndexOf(" ")-1));

  // Calculate the standard offset using January dates)
  var std_time_offset = (jan1 - jan2) / (1000 * 60 * 60);

  // Calculate the daylight savings time offset using june dates
  var daylight_time_offset = (june1 - june2) / (1000 * 60 * 60);
  var dst;

  // If the two offsets are equal
  if (std_time_offset == daylight_time_offset) {
    // Daylight savings time is not observed
    dst = "0";
  } else {
    // Positive is southern hemisphere and negative is northern hemisphere
    var hemisphere = std_time_offset - daylight_time_offset;
    if (hemisphere >= 0) {
      std_time_offset = daylight_time_offset;
    }
    dst = "1"; // Daylight savings time is observed
  }
  
  $('select.timezone').each( function(intIndex) {
    timeZoneSelect = this;
      var i;
      for (i = 0; i < timeZoneSelect.options.length; i++) {
        if (timeZoneSelect.options[i].text.indexOf(convert(std_time_offset))>=0) {
          timeZoneSelect.selectedIndex = i;
          break;
        }
      }
    }
  );
}

// Convert the time zone offset into a select-friendly string (ex. -06:00) for setting the selected value
function convert(value) {
  var hours = parseInt(value);
  value -= parseInt(value);
  value *= 60;
  var mins = parseInt(value);
  value -= parseInt(value);
  value *= 60;
  var secs = parseInt(value);
  var display_hours = hours;
  display_hours = (hours < 10 && hours > 0) ? "+0"+hours : "+"+hours; // positive
  display_hours = (hours == 0) ? "0"+hours : display_hours; // handle GMT case (00:00)
  display_hours = (hours < 0 && hours > -10) ? "-0"+Math.abs(hours) : display_hours; // neg
  mins = (mins < 10) ? "0"+mins : mins;
  return display_hours+":"+mins;
}

$(document).ready(function() {

  selectTimeZone();

});