document.addEventListener('DOMContentLoaded', function () {
const categoryButtons = document.querySelectorAll('.category-btn');
const events = document.querySelectorAll('.event');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log("Hii")
        const category = button.id;
        events.forEach(event => {
            if (event.classList.contains(category)) {
                event.style.display = 'block';
            } else {
                event.style.display = 'none';
            }
        });
    });
});
});