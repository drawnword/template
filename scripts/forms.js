// Disable Submit Buttons onSubmit
function protectSubmitButtons() {
  // On form submission
  $("form").submit( function() { 
    
    // Disable any and all submit buttons
    $('input:submit').attr( { disabled : 'disabled' } ); 
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

$(document).ready(function() {

  /* 
    TODO: Date input popup calendar.
    TODO: File inputs. This may be fairly hairy.
  */
  protectSubmitButtons();  
  preparePlaceholders();
  prepareAutofocus();

});



// HTML5 autofocus plugin
// Copyright (c) 2009, Mike Taylor, http://miketaylr.com
// MIT Licensed: http://www.opensource.org/licenses/mit-license.php

// NOTE: As per the spec, only one element is permitted to have the
// autofocus attribute, hence no .each()
// http://www.whatwg.org/specs/web-apps/current-work/multipage/association-of-controls-and-forms.html#autofocusing-a-form-control

// USAGE: $('[autofocus=""]').autofocus();, assuming a boolean attribute like:
// <input type="text" autofocus />

// (function($) {
//   $.fn.autofocus = function() {
//     //Test to see if autofocus is natively supported before proceeding
//     return(this[0].autofocus!==true) ? this.focus() : this;
//   };
// })(jQuery);