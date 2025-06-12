document.addEventListener('DOMContentLoaded', () => {
    const startDate = new Date('2025-01-22T00:00:00');
    const kissBtn = document.getElementById('kissBtn');
    const kissCountElement = document.getElementById('kissCount');
    let kissCounter = localStorage.getItem('kissCounter') ? parseInt(localStorage.getItem('kissCounter')) : 0;
    kissCountElement.textContent = kissCounter;

    const heartsContainer = document.getElementById('heartsContainer');
    const floatingHeartsContainer = document.getElementById('floatingHearts');

    initPetals();
    initLoveTimer();
    initKissButton();
    initLoveCounter();
    initFuturePlans();
    initQuiz();
    initNasaSection();
    initGallery();
    initMemoryGame();
    initSecretMessage();
    initValentineCountdown();

    launchConfetti();

    function initPetals() {
        const canvas = document.getElementById('petalsCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Petal {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = -20;
                this.radius = Math.random() * 6 + 3;
                this.speedY = Math.random() * 1.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.color = `hsl(${Math.random() * 40 + 340}, 80%, 65%)`;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.03;
                this.shape = Math.random() > 0.5 ? 'heart' : 'petal';
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                this.rotation += this.rotationSpeed;

                if (this.y > canvas.height + this.radius) {
                    this.reset();
                }

                if (this.x > canvas.width + this.radius || this.x < -this.radius) {
                    this.speedX = -this.speedX;
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.beginPath();
                if (this.shape === 'heart') {
                    ctx.moveTo(0, -this.radius);
                    ctx.bezierCurveTo(this.radius * 0.7, -this.radius * 0.5, this.radius, this.radius * 0.5, 0, this.radius * 1.5);
                    ctx.bezierCurveTo(-this.radius, this.radius * 0.5, -this.radius * 0.7, -this.radius * 0.5, 0, -this.radius);
                } else {
                    ctx.ellipse(0, 0, this.radius, this.radius / 1.5, 0, 0, Math.PI * 2);
                }
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.restore();
            }
        }

        const petals = [];
        for (let i = 0; i < 15; i++) {
            petals.push(new Petal());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            petals.forEach(petal => {
                petal.update();
                petal.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    function initLoveTimer() {
        function update() {
            const now = new Date();
            const diff = now - startDate;

            let months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
            let days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
            let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('love-months').textContent = months;
            document.getElementById('love-days').textContent = days;
            document.getElementById('love-hours').textContent = hours;
            document.getElementById('love-minutes').textContent = minutes;
            document.getElementById('love-seconds').textContent = seconds;
        }

        update();
        setInterval(update, 1000);
    }

    function initKissButton() {
        kissBtn.addEventListener('click', () => {
            kissCounter++;
            kissCountElement.textContent = kissCounter;
            localStorage.setItem('kissCounter', kissCounter);
            spawnHeart();
            spawnFloatingHearts(5);

            if (kissCounter % 5 === 0) {
                launchConfetti();
            }
        });

        function spawnHeart() {
            const heart = document.createElement('div');
            heart.classList.add('heart-animation');
            heart.innerHTML = '<i class="fas fa-heart"></i>';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = Math.random() * 1.5 + 1 + 'rem';
            heart.style.color = `hsl(${Math.random() * 40 + 340}, 80%, 60%)`;
            heartsContainer.appendChild(heart);
            setTimeout(() => heart.remove(), 5000);
        }
    }

    function initLoveCounter() {
        const countBtn = document.getElementById('countLoveBtn');
        const loveCount = document.getElementById('loveCount');
        let count = parseInt(localStorage.getItem('loveCount')) || 0;
        loveCount.textContent = count;

        const quotes = document.querySelectorAll('.quote');
        let currentQuote = 0;

        function rotateQuotes() {
            quotes[currentQuote].classList.remove('active');
            currentQuote = (currentQuote + 1) % quotes.length;
            quotes[currentQuote].classList.add('active');
        }
        setInterval(rotateQuotes, 5000);

        countBtn.addEventListener('click', () => {
            count++;
            loveCount.textContent = count;
            localStorage.setItem('loveCount', count);

            const heart = document.createElement('div');
            heart.classList.add('heart-animation');
            heart.innerHTML = '<i class="fas fa-heart"></i>';
            heart.style.position = 'absolute';
            heart.style.left = '50%';
            heart.style.transform = 'translateX(-50%)';
            heart.style.fontSize = '2rem';
            heart.style.color = '#d32f2f';
            document.querySelector('.love-counter-display').appendChild(heart);
            setTimeout(() => heart.remove(), 2000);
        });
    }

    function initFuturePlans() {
        const plansContainer = document.getElementById('plansContainer');
        const addPlanBtn = document.getElementById('addPlanBtn');

        const additionalPlans = [
            { title: "Casarmos", desc: "Planejar nosso casamento dos sonhos e celebrar nosso amor." },
            { title: "Construir uma Família", desc: "Formar uma família linda, cheia de amor e união." },
            { title: "Lua de Mel dos Sonhos", desc: "Viajar juntos para um lugar inesquecível depois do casamento." }
];
        let planIndex = 0;

        addPlanBtn.addEventListener('click', () => {
            if (planIndex < additionalPlans.length) {
                const plan = additionalPlans[planIndex];
                const planItem = document.createElement('div');
                planItem.classList.add('plan-item');
                planItem.innerHTML = `
                    <h3>${plan.title}</h3>
                    <p>${plan.desc}</p>
                `;
                plansContainer.appendChild(planItem);
                planIndex++;
                launchConfetti();
            } else {
                alert('Estamos cheios de planos incríveis, meu amor! Vamos realizá-los juntos?');
            }
        });
    }

    function initQuiz() {
        const quizContainer = document.getElementById('quizContainer');
        const quizResult = document.getElementById('quizResult');

        const questions = [
            {
                question: "Onde foi o pedido de namoro?",
                options: ["No shopping", "Na praça", "Na sua casa", "Quinta da Boa Vista"],
                answer: 3
            },
            {
                question: "Qual foi o local do nosso primeiro date?",
                options: ["No shopping", "Igreja", "Praça", "Rua"],
                answer: 0
            },
            {
                question: "Quem teve atitude de beijar primeiro?",
                options: ["Guilherme (Eu)", "Os dois", "Você mesma(Nicolly)"],
                answer: 2
            },
            {
                question: "Quem ama mais?",
                options: ["Guilherme (Eu)", "Você (Nicolly)"],
                answer: 0
            },
            {
                question: "Quem é mais linda, perfeita, maravilhosa?",
                options: ["Você (Nicolly)"],
                answer: 0
            }
        ];

        let currentQuestion = 0;
        let score = 0;

        function showQuestion(index) {
            if (index >= questions.length) {
                showQuizResult();
                return;
            }

            const q = questions[index];
            quizContainer.innerHTML = `
                <div class="quiz-question">
                    <h3>${index + 1}. ${q.question}</h3>
                    <div class="quiz-options">
                        ${q.options.map((opt, i) => `<div class="quiz-option" data-answer="${i}">${opt}</div>`).join('')}
                    </div>
                    <div class="quiz-progress">Pergunta ${index + 1} de ${questions.length}</div>
                </div>
            `;

            document.querySelectorAll('.quiz-option').forEach(option => {
                option.addEventListener('click', handleOptionClick);
            });

            function handleOptionClick(e) {
                e.preventDefault();
                const answerIndex = parseInt(this.dataset.answer);

                document.querySelectorAll('.quiz-option').forEach(opt => {
                    opt.style.pointerEvents = 'none';
                    if (parseInt(opt.dataset.answer) === q.answer) {
                        opt.classList.add('selected-correct');
                    } else if (opt === this) {
                        opt.classList.add('selected-wrong');
                    }
                });

                if (answerIndex === q.answer) {
                    score++;
                }

                const nextBtn = document.createElement('button');
                nextBtn.className = 'love-btn next-question-btn';
                nextBtn.textContent = 'Próxima Pergunta';
                nextBtn.addEventListener('click', () => {
                    currentQuestion++;
                    showQuestion(currentQuestion);
                });
                quizContainer.querySelector('.quiz-question').appendChild(nextBtn);
            }
        }

        function showQuizResult() {
            const percentage = Math.round((score / questions.length) * 100);
            let message = '';

            if (percentage >= 80) {
                message = `Perfeita, meu amor! ${percentage}% de acerto! - Você merece mil beijos! ❤️`;
            } else if (percentage >= 50) {
                message = `Quase perfeita! ${percentage}% de acerto - Um beijo bem grande! 💕`;
            } else {
                message = `Vamos tentar de novo, amor? ${percentage}% de acerto - Ainda te amo! 😉`;
            }

            quizResult.innerHTML = `
                <h3>Resultado do Quiz</h3>
                <p>${message}</p>
                <button class="love-btn" id="retryQuiz">Tentar Novamente</button>
            `;
            quizResult.classList.add('show');

            document.getElementById('retryQuiz').addEventListener('click', () => {
                currentQuestion = 0;
                score = 0;
                quizResult.classList.remove('show');
                showQuestion(0);
            });
        }

        showQuestion(0);
    }

    function initNasaSection() {
        const skyImages = {
            '2025-01-05': {
                src: 'imagens/dia05.jpg',
                description: '"Essas duas galáxias — NGC 2207 e IC 2163 — estão se encontrando no espaço, se puxando devagarzinho há milhões de anos... criando faíscas de estrelas, nuvens de poeira e caminhos de luz. Um dia, vão se fundir e virar uma só. Me lembra a gente... No nosso primeiro beijo, foi como se dois mundos começassem a se misturar — calmos por fora, mas com o universo inteiro acontecendo por dentro."'
            },
            '2025-01-22': {
                src: 'imagens/dia22.jpg',
                description: '"Na Terra, o continente da América do Norte não pode criar estrelas. Mas lá no céu, a nebulosa com o mesmo nome faz exatamente isso. Na parte que lembra o litoral leste, chamada de "Muro do Cisne", nascem estrelas entre nuvens de gás e poeira, iluminadas por sóis recém-nascidos. Foi nesse cenário, entre estrelas surgindo e um céu em transformação, que a gente começou a escrever a nossa história. Nosso namoro nasceu como essas estrelas: em silêncio, mas com luz suficiente pra mudar tudo."'
            }
        };

        document.querySelectorAll('.date-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const date = btn.dataset.date;
                const title = btn.dataset.title;
                const data = skyImages[date];
                if (data) {
                    openModal({
                        title: `${title} - ${formatDate(date)}`,
                        imageSrc: data.src,
                        description: data.description
                    });
                }
            });
        });
    }

    function initGallery() {
        const galleryContainer = document.getElementById('galleryContainer');
        const photos = [
            { src: 'imagens/image1.jpg', text: 'Meu amor, você é minha luz' },
            { src: 'imagens/image2.jpg', text: 'Cada momento contigo é mágico' },
            { src: 'imagens/image3.jpg', text: 'Minha parceira para sempre' },
            { src: 'imagens/image4.jpg', text: 'Quero te abraçar eternamente' },
            { src: 'imagens/image5.jpg', text: 'Você faz meu coração sorrir' },
            { src: 'imagens/image6.jpg', text: 'Minha alma gêmea' },
            { src: 'imagens/image7.jpg', text: 'Sonho com nosso futuro juntos' },
            { src: 'imagens/image8.jpg', text: 'Você é meu lar' },
            { src: 'imagens/image9.jpg', text: 'Minha rainha do coração' },
            { src: 'imagens/image10.jpg', text: 'Apaixonado por você, sempre' },
            { src: 'imagens/image11.jpg', text: 'Você é meu para sempre' }
        ];

        photos.forEach(photo => {
            const item = document.createElement('div');
            item.classList.add('gallery-item');
            item.innerHTML = `<img src="${photo.src}" alt="${photo.text}" loading="lazy">`;
            item.addEventListener('click', () => {
                openModal({
                    imageSrc: photo.src,
                    description: photo.text
                });
            });
            galleryContainer.appendChild(item);
        });
    }

    const modal = document.getElementById('customModal');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.querySelector('.custom-modal-close');

    function openModal({ title, imageSrc, description }) {
        let content = '';
        if (imageSrc) {
            content += `<img src="${imageSrc}" alt="${description || title || 'Imagem'}">`;
        }
        if (title) {
            content += `<h3>${title}</h3>`;
        }
        if (description) {
            content += `<p>${description}</p>`;
        }
        modalContent.innerHTML = content;
        modal.style.display = 'flex';
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        modalContent.innerHTML = '';
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    }

    function initMemoryGame() {
        const memoryGrid = document.getElementById('memoryGrid');
        const memoryMessage = document.getElementById('memoryMessage');

        const memoryCards = [
            { id: 1, image: 'imagens/image8.jpg', text: 'Nosso primeiro encontro' },
            { id: 1, image: 'imagens/image8.jpg', text: 'Nosso primeiro encontro' },
            { id: 2, image: 'imagens/image10.jpg', text: 'Primeiro beijo mágico' },
            { id: 2, image: 'imagens/image10.jpg', text: 'Primeiro beijo mágico' },
            { id: 3, image: 'imagens/image11.jpg', text: 'Dia dos Namorados' },
            { id: 3, image: 'imagens/image11.jpg', text: 'Dia dos Namorados' },
            { id: 4, image: 'imagens/image12.jpg', text: 'Nosso amor eterno' },
            { id: 4, image: 'imagens/image12.jpg', text: 'Nosso amor eterno' }
        ];

        const shuffledCards = [...memoryCards].sort(() => Math.random() - 0.5);

        let hasFlippedCard = false;
        let lockBoard = false;
        let firstCard, secondCard;
        let matchedPairs = 0;

        shuffledCards.forEach(card => {
            const memoryCard = document.createElement('div');
            memoryCard.classList.add('memory-card');
            memoryCard.dataset.id = card.id;

            const frontFace = document.createElement('div');
            frontFace.classList.add('front-face');
            frontFace.style.backgroundImage = `url('${card.image}')`;

            const backFace = document.createElement('div');
            backFace.classList.add('back-face');
            backFace.innerHTML = '<i class="fas fa-heart"></i>';

            memoryCard.appendChild(frontFace);
            memoryCard.appendChild(backFace);

            memoryCard.addEventListener('click', flipCard);
            memoryGrid.appendChild(memoryCard);
        });

        function flipCard(e) {
            e.preventDefault();
            if (lockBoard || this === firstCard || this.classList.contains('flipped')) return;

            this.classList.add('flipped');

            if (!hasFlippedCard) {
                hasFlippedCard = true;
                firstCard = this;
                return;
            }

            secondCard = this;
            checkForMatch();
        }

        function checkForMatch() {
            const isMatch = firstCard.dataset.id === secondCard.dataset.id;

            if (isMatch) {
                disableCards();
                matchedPairs++;

                if (matchedPairs === memoryCards.length / 2) {
                    setTimeout(() => {
                        memoryMessage.textContent = 'Você é perfeita, meu amor! Encontrou todos os pares do nosso amor! ❤️';
                        memoryMessage.classList.add('show');
                        launchConfetti();
                    }, 1000);
                }
            } else {
                unflipCards();
            }
        }

        function disableCards() {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            resetBoard();
        }

        function unflipCards() {
            lockBoard = true;
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                resetBoard();
            }, 1000);
        }

        function resetBoard() {
            [hasFlippedCard, lockBoard] = [false, false];
            [firstCard, secondCard] = [null, null];
        }
    }

    function initSecretMessage() {
        const messagePieces = document.querySelectorAll('.piece');
        const fullMessageContainer = document.getElementById('fullMessage');
        const secretFullMessage = "Meu amor, neste Dia dos Namorados, quero te dizer que você é meu universo. Cada momento contigo é uma estrela brilhando no meu céu. Quero construir uma vida inteira ao seu lado, cheia de risadas, abraços e amor eterno. Você é meu tudo, agora e sempre. ❤️";
        let foundPieces = 0;

        messagePieces.forEach(piece => {
            piece.addEventListener('click', handlePieceClick);
        });

        function handlePieceClick(e) {
            e.preventDefault();
            if (this.classList.contains('found')) return;

            this.classList.add('found');
            this.innerHTML = '<i class="fas fa-heart"></i>';
            foundPieces++;
            if (foundPieces === messagePieces.length) {
                fullMessageContainer.textContent = secretFullMessage;
                fullMessageContainer.classList.add('show');
                launchConfetti();
            }
        }
    }

    function initValentineCountdown() {
        const countdownDays = document.getElementById('countdownDays');
        const valentineDate = new Date('2026-06-12T00:00:00');

        function updateCountdown() {
            const now = new Date();
            const diff = Math.floor((valentineDate - now) / (1000 * 60 * 60 * 24));
            countdownDays.textContent = diff;
        }

        updateCountdown();
        setInterval(updateCountdown, 1000 * 60 * 60 * 24);
    }

    function launchConfetti() {
        confetti({
            particleCount: 100,
            spread: 70,
            colors: ['#d32f2f', '#f06292', '#f9a825'],
            shapes: ['circle', 'heart']
        });
    }

    function spawnFloatingHearts(count) {
        for (let i = 0; i < count; i++) {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerHTML = '<i class="fas fa-heart"></i>';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = Math.random() * 100 + 'vh';
            heart.style.fontSize = Math.random() * 0.8 + 0.6 + 'rem';
            heart.style.color = `hsl(${Math.random() * 40 + 340}, 80%, 60%)`;
            floatingHeartsContainer.appendChild(heart);
            setTimeout(() => heart.remove(), 5000);
        }
    }

    setInterval(() => spawnFloatingHearts(3), 3000);
});
