$(document).ready(function() {
    const add_new_question = document.getElementById('show_new_question');
    const remove_new_question = document.getElementById('hide_new_question');

    add_new_question.onclick = () => {
        const question_div = document.getElementById('questions_div').lastElementChild.lastElementChild;
        const inputs = question_div.getElementsByTagName('input');
        for (let input of inputs) {
            input.setAttribute('required','');
        }
        add_new_question.setAttribute('hidden','');
        remove_new_question.removeAttribute('hidden');
        question_div.getElementsByClassName('card-header')[0].removeAttribute('hidden');
        question_div.getElementsByClassName('card-body')[0].removeAttribute('hidden');
    }

    remove_new_question.onclick = () => {
        const question_div = document.getElementById('questions_div').lastElementChild.lastElementChild;
        const inputs = question_div.getElementsByTagName('input');
        for (let input of inputs) {
            input.removeAttribute('required');
            input.removeAttribute('value');
        }
        add_new_question.removeAttribute('hidden');
        remove_new_question.setAttribute('hidden','');
        question_div.getElementsByClassName('card-header')[0].setAttribute('hidden','');
        question_div.getElementsByClassName('card-body')[0].setAttribute('hidden','');
    }
});
