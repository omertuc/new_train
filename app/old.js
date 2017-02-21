function submit()
{
    originSelect = document.getElementById('origin');
    var selectedOrigin = originSelect.options[originSelect.selectedIndex].value;

    destinationSelect = document.getElementById('destination');
    var selectedDestination = destinationSelect.options[destinationSelect.selectedIndex].value;

    if (selectedOrigin == 0)
    {
        alert("לא בחרת מוצא");
        return;
    }

    if (selectedDestination == 0)
    {
        alert("לא בחרת יעד");
        return;
    }

    if (selectedOrigin == selectedDestination)
    {
        alert("אנא בחר מוצא ויעד שונים");
        return;
    }

    // Submit form.
    $('#SendToServer').submit();
}

$(document).ready( function() {
    $( "#datepick" ).datepicker({
        dateFormat: "yy-mm-dd"
    });
    $( "#datepick" ).datepicker("setDate", new Date());
});

$(function() { $( "#Now" )
    .button()
    .click(function( event ) {
        event.preventDefault();

        $( "#datepick" ).datepicker("setDate", new Date());

        submit();
    });
});

$(function() { $( "#OtherTime" )
    .button()
    .click(function( event ) {
        event.preventDefault();

        $("#datediv").toggleClass("unhidden hidden");
    });
});

$(function() { $( "#SearchTimes" )
    .button()
    .click(function( event ) {
        event.preventDefault();

        submit();
    });
});