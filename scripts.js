// make a name space object
const makeStudySpace = {};

// cache selectors
makeStudySpace.$deskInput = $('input#desk');
makeStudySpace.$coffeeTableInput = $('input#coffeeTable');

// make function to show the photo on the canvas and pass value selected
makeStudySpace.showPhoto = function(value){
    // make variable for the selected photo 
    let chosenPhoto = $(`.canvas .imageContainer.${value}`);
    
    // toggle the show class on the chosen photo
    chosenPhoto.toggleClass('show');
}

// make function to send alert about tabletop surface
makeStudySpace.alertTabletop = function(value){
    // send alert
    swal({
        title: 'You can only have one tabletop surface!',
        button: 'Okay.',

        // uncheck the coffeetable input
    }).then(() => {
        $(`input#${value}`).prop('checked', false);
    });
}

// make function that checks if there is a sibling already checked
makeStudySpace.checkSiblings = function (value, category) {

    // if one element is selected, check if something in same category is checked
    if ($(`input#${value}`).siblings(`.${category}`).prop('checked')) {

        // throw alert that only one can be selected
        swal({
            title: `You can only have one ${category}!`,
            button: 'Okay.',

            // remove the checked property after alert
        }).then(() => {
            $(`input#${value}`).prop('checked', false);
        });

        // if not selected, show it
    } else {
        // then call function to show the photos
        makeStudySpace.showPhoto(value);
    }
}

// make function that checks to see if desk or coffee table is selected, if value is laptop or notebook
makeStudySpace.checkForTable = function(value){

    // if coffee table selected, then show the selections
    if (makeStudySpace.$coffeeTableInput.prop('checked')) {
        // then call function to show the photos
        makeStudySpace.showPhoto(value);

        // if desk selected, then add class to style, and show the selections
    } else if (makeStudySpace.$deskInput.prop('checked')){
        // add class of on desk to position
        $(`.canvas .imageContainer.${value}`).toggleClass('onDesk');

        // show the photos
        makeStudySpace.showPhoto(value);

        // if not selected, throw error
    } else {
        // throw alert that only one can be selected
        swal({
            title: `You need to choose a desk or coffee table!`,
            button: 'Okay.',

            // remove the checked property after alert
        }).then(() => {
            $(`input#${value}`).prop('checked', false);
        });
    }
}

// make function to initialize the events
makeStudySpace.eventListeners = function(){
    // when click the start button, scroll down to the main
    $('.startButton').on('click', function () {
        // animate the body to scroll to the main
        $('html, body').animate(
            {
                scrollTop: $('main').offset().top,
            },
            'slow',
        );
    })

    // when the radio buttons chosen, collect value and show the selected photo
    $('input[type=radio]').on('change', function () {
        // store the sitting pics in variable
        let sitting = $('.canvas .imageContainer.radio');
        // clear it before showing a new one
        sitting.removeClass('show');

        // store the value in variable
        let selectedValue = $(this).val();

        // if select desk, and coffee table is checked, send alert
        if (selectedValue === 'desk' && makeStudySpace.$coffeeTableInput.prop('checked')) {
            // call function to check if other table is selected
            makeStudySpace.alertTabletop(selectedValue);

            // or else, show photo as normal
        } else {
            // call function to show the selected photo
            makeStudySpace.showPhoto(selectedValue);
        }
    })

    // when the checkbox is clicked, collect the value
    $('input[type=checkbox]').on('click', function () {

        // set a variable for the value selected
        let selectedValue = $(this).val();

        // call function that checks if the value is laptop or notebook, make sure that desk or coffee table is selected
        if (selectedValue === 'laptop' || selectedValue === 'notebook') {
            // call the checkvalue function, pass the value
            makeStudySpace.checkForTable(selectedValue);
            // if value is tea or coffee, checks if siblings with same class are checked
        } else if (selectedValue === 'tea' || selectedValue === 'coffee') {
            makeStudySpace.checkSiblings(selectedValue, 'drink');

            // if value is cat or dog, check if siblings with same class are checked
        } else if (selectedValue === 'cat' || selectedValue === 'dog') {
            makeStudySpace.checkSiblings(selectedValue, 'animal');

            // if coffeeTable is selected, and desk is checked, throw an error
        } else if (selectedValue === 'coffeeTable' && makeStudySpace.$deskInput.prop('checked')) {
            // call function to check if other table is selected
            makeStudySpace.alertTabletop(selectedValue);

            // else, show the photo
        } else {
            // call function that shows the photo
            makeStudySpace.showPhoto(selectedValue);
        }

    });
}

// initializing function
makeStudySpace.init = function(){

    // if the width of the screen is less than 750 tell them to turn their phone
    if($(window).width() <= 750){
        // add a sweet alert
        swal({
            title: 'Please turn your phone to landscape to enjoy!',
            button: 'Okay.',
        });
    }

    // clear values on reload
    $(`input`).prop('checked', false);

    // call the function to initialize event listeners
    makeStudySpace.eventListeners();
}

// document ready
$(function(){

    // call initializing function
    makeStudySpace.init();

});