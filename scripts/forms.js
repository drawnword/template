// Disable Submit Buttons onSubmit
function protectSubmitButtons() {
  // On form submission
  $("form").submit( function() { 
    
    // Disable any and all submit buttons, both input, and button elements
    $(':submit').attr( { disabled : 'disabled' } ); 
  } );
}



// Add placeholder text to designated input fields.
function preparePlaceholders() {
  if (!Modernizr.input.placeholder) {

    // This browser doesn't support the placeholder attribute, so we cretae it
    $("input[placeholder]").each(function() {

      // Let's obtain the value of the placeholder text
      var text = $(this).attr('placeholder')
          
      // Let's change the styling so default text doesn't confuse people
      $(this).addClass('placeholder');
          
      // Now let's add the default text
      $(this).val(text);
          
      // On focus we want to clear the default values and remove the blurred class
       $(this).focus( function() {
        if ( $(this).val() == text) {
           $(this).removeClass('placeholder');
           $(this).val('');
        }
      } );
          
      // When we leave the field, we want to replace the text if it's still null
       $(this).blur( function() {
        if ( $(this).val() == '') {
           $(this).addClass('placeholder')
           $(this).val(text);
        }
      } );
      
    } );
  }
}

// Autofocus on the appropriate field
function prepareAutofocus() {
  if (!Modernizr.input.autofocus) {
    $("input[autofocus]")[0].focus();
  } 
}

// Prepare date selection tools
function prepareDateAndTimes() {
  if (!Modernizr.inputtypes.date) {
    $('input[type="date"]').datepicker({  showOtherMonths: true, 
                                          selectOtherMonths: true, 
                                          showAnim: ''});
  }
  // if (!Modernizr.inputtypes.datetime) {
  //   $('input[type="datetime"]').datepicker();
  // }
  // if (!Modernizr.inputtypes.month) {
  //   $('input[type="month"]').datepicker();
  // }
  // if (!Modernizr.inputtypes.week) {
  //   $('input[type="week"]').datepicker();
  // }
  // if (!Modernizr.inputtypes.time) {
  //   $('input[type="time"]').datepicker();
  // }
  // if (!Modernizr.inputtypes.datetime-local) {
  //   $('input[type="datetime-local"]').datepicker();
  // }
}

// Script by Josh Fraser (http://onlineaspect.com/2007/06/08/auto-detect-a-time-zone-with-javascript/)
// Updated by Garrett Dimon (http://sifterapp.com) to work with Rails time zone select lists.
function selectTimeZone() {
  var rightNow = new Date();
  var jan1 = new Date(rightNow.getFullYear(), 0, 1, 0, 0, 0, 0);  // jan 1st
  var june1 = new Date(rightNow.getFullYear(), 6, 1, 0, 0, 0, 0); // june 1st
  var temp = jan1.toGMTString();
  var jan2 = new Date(temp.substring(0, temp.lastIndexOf(" ")-1));
  temp = june1.toGMTString();
  var june2 = new Date(temp.substring(0, temp.lastIndexOf(" ")-1));
  var std_time_offset = (jan1 - jan2) / (1000 * 60 * 60);
  var daylight_time_offset = (june1 - june2) / (1000 * 60 * 60);
  var dst;
  if (std_time_offset == daylight_time_offset) {
    dst = "0"; // daylight savings time is NOT observed
  } else {
    // positive is southern, negative is northern hemisphere
    var hemisphere = std_time_offset - daylight_time_offset;
    if (hemisphere >= 0)
    std_time_offset = daylight_time_offset;
    dst = "1"; // daylight savings time is observed
  }
  var i;
  for (i = 0; i < document.getElementById('time_zone').options.length; i++) {
    if (document.getElementById('time_zone').options[i].text.indexOf(convert(std_time_offset))>=0) {
      document.getElementById('time_zone').selectedIndex = i;
      break;
    }
  }
}

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

  /* 
    TODO: Need to customize the date picker for each scenario and add support for fields split over multiple select fields Also, styling.
    TODO: Color input popup.
    TODO: File inputs. This may be fairly hairy.
  */
  
  protectSubmitButtons();  
  preparePlaceholders();
  prepareAutofocus();
  prepareDateAndTimes();
  selectTimeZone();

});