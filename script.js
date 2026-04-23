document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.block-card');
    const container = document.querySelector('.js-block-cards');
    const [btnPrev, btnNext] = document.querySelectorAll('.card__buttons button');
    let currentIndex = 0;

    const observerOptions = {
        root: container,
        threshold: 0.6 // Mayor umbral evita que dos tarjetas peleen por el índice
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                currentIndex = Array.from(cards).indexOf(entry.target);
                const allDotContainers = document.querySelectorAll('.slider-dots');
                
                allDotContainers.forEach(dotContainer => {
                    const dots = dotContainer.querySelectorAll('.dot');
                    dots.forEach(dot => dot.classList.remove('active'));
                    if (dots[currentIndex]) {
                        dots[currentIndex].classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));

    // --- Lógica de Navegación ---

    const autoPlayDelay = 4000; // 4 segundos es más amigable
    let autoPlayInterval;

    const scrollToCard = (index) => {
        container.scrollTo({
            left: index * container.offsetWidth,
            behavior: 'smooth'
        });
    };

    const startAutoPlay = () => {
        autoPlayInterval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % cards.length;
            scrollToCard(nextIndex);
        }, autoPlayDelay);
    };

    const resetAutoPlay = () => {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    };

    // Botones de flecha
    btnNext?.addEventListener('click', () => {
        let nextIndex = (currentIndex + 1) % cards.length;
        scrollToCard(nextIndex);
        resetAutoPlay();
    });

    btnPrev?.addEventListener('click', () => {
        let prevIndex = (currentIndex - 1 + cards.length) % cards.length;
        scrollToCard(prevIndex);
        resetAutoPlay();
    });

    startAutoPlay();

    container.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    container.addEventListener('mouseleave', () => startAutoPlay());
});