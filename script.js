document.addEventListener('DOMContentLoaded', () => {
    let deckId;
    let button = document.getElementById('button');
    let body = document.querySelector('body');
    let displayCount = 0;
    let selectTag = document.querySelector('select');
    let drawAmt = 0;

    function createOptions () {
        for (let i = 1; i <= 10; i++) {
        let options = document.createElement('option');
            options.setAttribute('value', `${i}`);
            options.innerText = `${i}`
            selectTag.appendChild(options);
        }
    };
    
    function getDeckId() {
        axios
        .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(response => {
            deckId = response.data.deck_id;
        });
    };
    
    function drawCards () {
        return axios
        .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${drawAmt}`)
        .then(response => {
            return response.data.cards;
        })
    };
    
    function renderCards(cardsDrawn) {
        let cardDiv = document.createElement('div');
        cardDiv.setAttribute('id', 'cardDiv');
        body.appendChild(cardDiv);
        
        cardsDrawn.forEach((el => {
            let card = document.createElement('img');
            card.setAttribute('src', `${el.image}`)
            cardDiv.appendChild(card)
        }))
    };
    
    function replaceCards() {
        let cardDiv = document.getElementById('cardDiv');
        body.removeChild(cardDiv);
    }
    
    createOptions();
    getDeckId();

    selectTag.addEventListener('change', () => {
        drawAmt = selectTag.value;
    });
    
    button.addEventListener('click', () => {
        drawCards().then((cards) => {
            if (displayCount === 0) {
                renderCards(cards);
                displayCount++;
            } else if (displayCount > 0) {
                replaceCards();
                renderCards(cards);
            }
        });
    });


    
});