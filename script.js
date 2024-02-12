// Initialize text-to-speech synthesis
const synth = window.speechSynthesis;

// Function to populate voice options
function populateVoiceList() {
    const voices = synth.getVoices();
    const voiceSelect = document.getElementById('voiceSelect');
    voiceSelect.innerHTML = '';

    voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.textContent = voice.name + ' (' + voice.lang + ')';
        option.setAttribute('value', index);
        voiceSelect.appendChild(option);
    });
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

// Function to generate voice
function generateVoice() {
    const textInput = document.getElementById('textInput').value;
    const voiceSelect = document.getElementById('voiceSelect');
    const selectedVoiceIndex = voiceSelect.value;
    const utterance = new SpeechSynthesisUtterance(textInput);
    utterance.voice = synth.getVoices()[selectedVoiceIndex];

    synth.speak(utterance);

    // Download link
    const downloadLink = document.getElementById('downloadLink');
    utterance.onend = function () {
        const blob = new Blob([textInput], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.style.display = 'inline-block';
    };
}
