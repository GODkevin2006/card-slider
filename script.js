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

        let arrayActions = document.querySelectorAll('.js-slider-dots');
        let dots_sections = `
        
            <nav class="slider-dots">
                <a href="#card-1" data-dot="1" class="dot" aria-label="Ir a diapositiva 1"></a>
                <a href="#card-2" data-dot="2" class="dot" aria-label="Ir a diapositiva 2"></a>
                <a href="#card-3" data-dot="3" class="dot" aria-label="Ir a diapositiva 3"></a>
                <a href="#card-4" data-dot="4" class="dot" aria-label="Ir a diapositiva 4"></a>
            </nav>`;
        arrayActions.forEach(section => {
            section.innerHTML += dots_sections;
        })

        const dotsActive = container.querySelectorAll('.dot');
        const cards = container.querySelectorAll('.block-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const index = Array.from(cards).indexOf(entry.target);
                if (entry.isIntersecting) {
                    document.querySelectorAll(`[data-dot="${index + 1}"]`).forEach(dot => {
                    dot.classList.add('active');
            });
                } else {
                    document.querySelectorAll(`[data-dot="${index + 1}"]`).forEach(dot => {
                    dot.classList.remove('active');
            });
                }
            })
        }, {threshold: 0.7 })
        cards.forEach(card => observer.observe(card));
    }
});
