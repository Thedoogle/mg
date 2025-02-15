     // Add this new function for the hamburger menu
    function toggleSettings() {
        const settingsPanel = document.getElementById('settingsPanel');
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        settingsPanel.classList.toggle('hidden');
        hamburgerMenu.classList.toggle('active');
    }

    let gameState = {
        cards: [],
        firstCard: null,
        secondCard: null,
        canFlip: true,
        matchedPairs: 0,
        totalPairs: 6,
        currentGridSize: 12
    };

    // Update selectGrid to also close settings after selection
    function selectGrid(totalCards) {
        gameState.currentGridSize = totalCards;
        gameState.totalPairs = totalCards / 2;
        
        document.querySelectorAll('.grid-option').forEach(option => {
            option.classList.remove('selected');
        });
        event.target.classList.add('selected');

        const container = document.getElementById('gameContainer');
        container.className = 'game-container ' + getGridClass(totalCards);

        document.querySelector('.button').classList.add('visible');
        
        startNewGame();
        toggleSettings(); // Close settings after selection
    }

    // Rest of the JavaScript remains the same
    function getGridClass(totalCards) {
        switch(totalCards) {
            case 4: return 'grid-2x2';
            case 6: return 'grid-2x3';
            case 12: return 'grid-3x4';
            case 20: return 'grid-4x5';
            default: return 'grid-3x4';
        }
    }

    function startNewGame() {
        const gameContainer = document.getElementById('gameContainer');
        gameContainer.innerHTML = '';
        gameState.matchedPairs = 0;
        document.getElementById('pairsFound').textContent = '0';
        
        initializeGame(gameState.totalPairs);
        renderCards();
        
    }

    function renderCards() {
        const gameContainer = document.getElementById('gameContainer');
        gameContainer.className = 'game-container ' + getGridClass(gameState.currentGridSize);
        
        gameState.cards.forEach(card => {
            const cardElement = document.createElement('button');
            cardElement.className = 'card';
            cardElement.dataset.id = card.id;
            cardElement.onclick = () => handleCardClick(card.id);
            gameContainer.appendChild(cardElement);
        });
    }

    function handleCardClick(cardId) {
        handleCardFlip(cardId);
        updateUI();
    }

    function updateUI() {
        gameState.cards.forEach(card => {
            const cardElement = document.querySelector(`[data-id="${card.id}"]`);
            cardElement.className = 'card' + 
                (card.isFlipped ? ' flipped' : '') + 
                (card.isMatched ? ' matched' : '');
            
            // Change to use an image instead of text
            if (card.isFlipped || card.isMatched) {
                cardElement.innerHTML = `<img src="${card.value}" style="max-width:100%; max-height:100%; object-fit:cover;">`;
            } else {
                cardElement.innerHTML = '';
            }
        });
        
        document.getElementById('pairsFound').textContent = gameState.matchedPairs;
    }

    function initializeGame(numberOfPairs) {
        gameState.totalPairs = numberOfPairs;
        gameState.cards = createCards(numberOfPairs);
        shuffleCards(gameState.cards);
        document.querySelector('.button').classList.remove('visible');
    }

    function createCards(numberOfPairs) {
        const cards = [];
        const imageFiles = [
            'unicorn.jpg',
            'spider.jpg',
            'bird.jpg',
            'monkey.jpg',
            'fish.jpg',
            'elephant.jpg',
            'lion.jpg',
            'cat.jpg',
            'cat2.jpg',
            'dog.jpg',
            'blue_giraff.jpg',
            'blue_gorilla.jpg',
            'blue_spider.jpg',
            'giraff.jpg',
            'gorilla.jpg',
            'lemur.jpg',
            'otter.jpg',
            'rainbow_monkey.jpg',
            'red_lion.jpg',
            'red_spider.jpg',
            'shark.jpg',
            'tiger.jpg',
            'trex.jpg',
            'whale.jpg',
            'woodpecker.jpg',
            'spider1.jpg',
            'spider2.jpg',
            'spider3.jpg',
            'spider4.jpg',
            'spider5.jpg',
            'spider6.jpg',
            'spider7.jpg',
            'spider8.jpg',
            'spider9.jpg',
            'spider10.jpg',
            'spider11.jpg',
            'spider12.jpg',
            'spider13.jpg',
            'spider14.jpg',
            'spider15.jpg',
            'spider16.jpg',
            'pteradactyl.jpg'
        ]; // Add your image filenames
    
        for (let i = 0; i < numberOfPairs; i++) {
            cards.push(
                { 
                    id: i * 2, 
                    value: `images/${imageFiles[i]}`, 
                    isFlipped: false, 
                    isMatched: false 
                },
                { 
                    id: i * 2 + 1, 
                    value: `images/${imageFiles[i]}`, 
                    isFlipped: false, 
                    isMatched: false 
                }
            );
        }
        return cards;
    }

    function handleCardFlip(cardId) {
        if (!gameState.canFlip) return;
        
        const card = gameState.cards.find(c => c.id === cardId);
        if (card.isFlipped || card.isMatched) return;
        
        flipCard(card);
        
        if (!gameState.firstCard) {
            gameState.firstCard = card;
        } else {
            gameState.secondCard = card;
            checkForMatch();
        }
    }

    function checkForMatch() {
        gameState.canFlip = false;
        
        if (gameState.firstCard.value === gameState.secondCard.value) {
            handleMatch();
        } else {
            handleMismatch();
        }
    }

    function handleMatch() {
        gameState.firstCard.isMatched = true;
        gameState.secondCard.isMatched = true;
        gameState.matchedPairs++;
        
        resetTurn();
        checkWinCondition();
    }

    function handleMismatch() {
        setTimeout(() => {
            flipCard(gameState.firstCard);
            flipCard(gameState.secondCard);
            resetTurn();
            updateUI();
        }, 1000);
    }

    function resetTurn() {
        gameState.firstCard = null;
        gameState.secondCard = null;
        gameState.canFlip = true;
    }

    function checkWinCondition() {
        if (gameState.matchedPairs === gameState.totalPairs) {
            setTimeout(() => {
                alert('Congratulations! You won! 🎉');
                document.querySelector('.button').classList.add('visible');
            }, 200);
        }
    }

    function flipCard(card) {
        card.isFlipped = !card.isFlipped;
    }

    function shuffleCards(cards) {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        startNewGame();
    });