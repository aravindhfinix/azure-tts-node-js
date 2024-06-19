require('dotenv').config();
const sdk = require("microsoft-cognitiveservices-speech-sdk");

// Predefined viseme ID to character/name mapping
const visemeMapping = {
    0: "",
    1: "a",
    2: "i",
    3: "u",
    4: "e",
    5: "o",
    6: "c",
    7: "d",
    8: "O",
    9: "t",
    10: "b",
    11: "p",
    12: "k",
    13: "r",
    14: "l",
    15: "g",
    16: "n",
    17: "s",
    18: "f",
    19: "m",
    20: "y",
    21: "v",
    22: "h"
};

// Function to synthesize speech using SSML and capture viseme events
async function synthesizeSpeechSSML(inputParams) {
    const { text, language = 'en-US', voiceName = 'en-US-JennyNeural', speakingRate = 0.85 } = inputParams;

    const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.SUBSCRIPTION_KEY, process.env.SERVICE_REGION);
    speechConfig.speechSynthesisLanguage = language;
    speechConfig.speechSynthesisVoiceName = voiceName;

    const speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig);

    const visemes = [];
    const visemeIds = [];
    const durations = [];

    let previousAudioOffset = 0;

    speechSynthesizer.visemeReceived = function (s, e) {
        const currentAudioOffset = e.audioOffset / 10000000; // Convert to seconds
        const duration = currentAudioOffset - previousAudioOffset;
        previousAudioOffset = currentAudioOffset;

        visemes.push(visemeMapping[e.visemeId]);
        visemeIds.push(e.visemeId.toString());
        durations.push(duration);
    };

    const ssml = `<speak version='1.0' xml:lang='${language}'>
                    <voice name='${voiceName}'>
                        <prosody rate='${speakingRate}'>
                            ${text}
                        </prosody>
                    </voice>
                  </speak>`;

    return new Promise((resolve, reject) => {
        speechSynthesizer.speakSsmlAsync(
            ssml,
            function (result) {
                speechSynthesizer.close();
                const audioBuffer = result.audioData;
                const base64String = Buffer.from(audioBuffer).toString('base64');

                const roundedDurations = durations.map(duration => Number(duration.toFixed(5)));

                resolve({
                    audio_base64: base64String,
                    dialogue_message_time: Date.now() / 1000,
                    duration_arr: roundedDurations,
                    input_text: text,
                    speaking_rate: speakingRate,
                    viseme_arr: visemes,
                    visemeid_arr: visemeIds,
                    voice: voiceName
                });
            },
            function (error) {
                console.error('Speech synthesis error:', error);
                speechSynthesizer.close();
                reject(error);
            }
        );
    });
}

// Example of how to invoke the function with input parameters
const inputParams = {
    text: "Good morning",
    language: "en-US",
    voiceName: "en-US-JennyNeural",
    speakingRate: 0.1
};

// Example of handling the async function call
synthesizeSpeechSSML(inputParams)
    .then(result => {
        console.log('Speech synthesis successful:', result);
        // Handle success: Send response or further process result
    })
    .catch(error => {
        console.error('Speech synthesis failed:', error);
        // Handle error: Send appropriate response or log
    });
