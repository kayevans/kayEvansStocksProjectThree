// make a name space object
const makeStudySpace = {};

// cache selectors
makeStudySpace.$deskInput = $('input#desk');
makeStudySpace.$coffeeTableInput = $('input#coffeeTable');

 // make function that changes the styles of the options clicked 
makeStudySpace.changeButton = function(value){
    // make a variable that will select the label that corresponds with the value
    let selectedLabel = $(`label.${value}`);

    // toggle the selected class on the chosen label
    selectedLabel.toggleClass('selected');
}

// make function to show the photo on the canvas and pass value selected
makeStudySpace.showPhoto = function(value){
    // make variable for the selected photo ** SUB THIS OUT LATER ****
    let chosenPhoto = $(`h2.${value}`);

    // toggle the show class on the chosen photo
    chosenPhoto.toggleClass('show');
}

// make function that checks to see if desk or coffee table is selected, if value is laptop or notebook
makeStudySpace.checkValue = function(value){

    // if table or coffee table selected, then show the selections
    if (makeStudySpace.$deskInput.prop('checked') || makeStudySpace.$coffeeTableInput.prop('checked')) {
        // then call function to show the photos
        makeStudySpace.showPhoto(value);

        // and call function to change button styles
        makeStudySpace.changeButton(value);

        // if not selected, throw error
    } else {
        alert('You need to choose a desk or coffee table!');
    }
}

// initializing function
makeStudySpace.init = function(){
    // when option is clicked, collect the value
    $('input').on('click', function () {
        // set a variable for the value selected
        let selectedValue = $(this).val();

        // call function that checks if the value is laptop or notebook, make sure that desk or coffee table is selected
        if (selectedValue === 'laptop' || selectedValue === 'notebook') {
            makeStudySpace.checkValue(selectedValue);
        } else {
            // call function that shows the photo
            makeStudySpace.showPhoto(selectedValue);

            // call function that changes styles of the input when clicked
            makeStudySpace.changeButton(selectedValue);
        }

    });
}

// document ready
$(function(){

    // call initializing function
    makeStudySpace.init();

});