const button = document.querySelector('.search-btn');
const wordTitle = document.querySelector('.word-title');
const definition = document.querySelector('.definition');
const additionalData = document.querySelector('.additional-data');
const speaker = document.querySelector('.speaker-btn');
const wordInput = document.querySelector('.word-input');

button.addEventListener('click', function() {
    const input = wordInput.value.trim().toLowerCase()

    if (input === '') {
        alert("Please enter a word")
        return
    }

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`)
        .then(response => response.json())
        .then(data => {
            const word = data[0].word;
            const wordDefinition = data[0].meanings[0].definitions[0].definition
            const audioUrl = data[0].phonetics[0]?.audio 
            const synonyms = data[0].meanings[0].definitions[0].synonyms 

            wordTitle.textContent = word;
            definition.textContent = wordDefinition;
            additionalData.textContent = synonyms

            if (audioUrl) {
                speaker.style.display = 'block';
                speaker.onclick = () => {
                    const audio = new Audio(audioUrl);
                    audio.play();
                };
            } else {
                speaker.style.display = 'none';
            }
        })
        .catch(error => {
            console.error(error);
            alert("Word not found or Check your spelling");
        });
});
