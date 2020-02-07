// document ready begins
$(function(){

    // Cache my selectors
    const $deskInput = $('input#desk');
    const $coffeeTableInput = $('input#coffeeTable');

    
    // make function to show the photo on the canvas and pass value selected
    function showPhoto(value){
        // make variable for the selected photo ** SUB THIS OUT LATER ****
        let chosenPhoto = $(`h2.${value}`);

        // toggle the show class on the chosen photo
        chosenPhoto.toggleClass('show');
    }

    // make function that checks to see if desk or coffee table is selected, if value is laptop or notebook
    function checkValue(value) {
        // if table or coffee table not selected,throw error
        if ($deskInput.prop('checked') || $coffeeTableInput.prop('checked')) {
            showPhoto(value);

        } else {
            console.log('You need to choose a desk or coffee table!');

        }
    }

    // when option is clicked, collect the value
    $('input').on('click', function(){
        // set a variable for the value selected
        let selectedValue = $(this).val();

        // call function that checks if the value is laptop or notebook, make sure that desk or coffee table is selected
        if (selectedValue === 'laptop' || selectedValue === 'notebook'){
            checkValue(selectedValue);
        } else {
            // call function that shows the photo
            showPhoto(selectedValue);
        }

        



    });

});