// Disable Submit Buttons onSubmit
function protectSubmitButtons() {
  // On form submission
  $("form").submit( function() { 
    
    // Disable any and all submit buttons, both input, and button elements
    $(':submit').attr( { disabled : 'disabled' } ); 
  } );
}

function detectCardType() {
  // Find and hide the card drop down
  
  // Insert black and white Card Brand images
  
    // If the card # is present, default to the colored image to handle page reloads
  
  // Add event handler to credit card field
}


$(document).ready(function() {

  /* 
    TODO: Need to customize the date picker for each scenario and add support for fields split over multiple select fields Also, styling.
    TODO: Color input popup.
    TODO: File inputs. This may be fairly hairy.
  */
  
  detectCardType();
  protectSubmitButtons();  

});