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
    $('input[type="date"]').datepicker();
  }
  if (!Modernizr.inputtypes.datetime) {
    $('input[type="datetime"]').datepicker();
  }
  if (!Modernizr.inputtypes.month) {
    $('input[type="month"]').datepicker();
  }
  if (!Modernizr.inputtypes.week) {
    $('input[type="week"]').datepicker();
  }
  if (!Modernizr.inputtypes.time) {
    $('input[type="time"]').datepicker();
  }
  if (!Modernizr.inputtypes.datetime-local) {
    $('input[type="datetime-local"]').datepicker();
  }
  
  
}

$(document).ready(function() {

  /* 
    TODO: Date input popup calendar.
    TODO: Color input popup.
    TODO: File inputs. This may be fairly hairy.
  */
  
  protectSubmitButtons();  
  preparePlaceholders();
  prepareAutofocus();
  prepareDateAndTimes();

});