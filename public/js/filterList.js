
function filter() {
    var input, filter, questionnaire, a, i, txtValue;
    input = document.getElementById("inputStr");
    filter = input.value.toUpperCase();
    questionnaires = document.getElementsByClassName("questionnaire");
    for (i = 0; i < questionnaires.length; i++) {
        a = questionnaires[i].getElementsByClassName("card-title")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            questionnaires[i].style.display = "";
        } else {
            questionnaires[i].style.display = "none";
        }
    }
}
