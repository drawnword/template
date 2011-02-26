// Disable Submit Buttons onSubmit
function protectSubmitButtons() {
  // On form submission
  $("form").submit( function() { 
    
    // Disable any and all submit buttons, both input, and button elements
    $(':submit').attr( { disabled : 'disabled' } ); 
  } );
}

$(document).ready(function() {

  /* 
    TODO: Need to customize the date picker for each scenario and add support for fields split over multiple select fields Also, styling.
    TODO: Color input popup.
    TODO: File inputs. This may be fairly hairy.
  */
  
  protectSubmitButtons();  

});