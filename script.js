document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.js-block-cards');
    if (container) {
        const btnNext = document.getElementById('btn-next'); 
        const btnBack = document.getElementById('btn-prev');

        const displacement = 550; 

        btnNext.addEventListener('click', function() {
            container.scrollLeft += displacement;
        });

        btnBack.addEventListener('click', function() {
            container.scrollLeft -= displacement;
        })

        const dotsActive = container.querySelectorAll('.dot');
        const cards = container.querySelectorAll('.block-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const index = Array.from(cards).indexOf(entry.target);
                if (entry.isIntersecting) {
                    dotsActive[index].classList.add('active');
                } else {
                    dotsActive[index].classList.remove('active');
                }
            })
        }, {threshold: 0.7 })
        cards.forEach(card => observer.observe(card));





    }
});
