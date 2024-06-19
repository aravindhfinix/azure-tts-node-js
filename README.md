You're absolutely right! I apologize for the omission. Here's the updated README with the `npm start` script included:

**azure-tts-node-js**

**Description**

This Node.js project empowers you to seamlessly integrate Azure Text-to-Speech (TTS) functionality within your applications. It leverages the Microsoft Cognitive Services Speech SDK to convert text into natural-sounding audio output, along with capturing viseme events for animation or lip-syncing purposes.

**Installation**

**Prerequisites**

- Node.js (version 12.44.0 or higher recommended) and npm (or yarn) installed on your system. You can download them from the official Node.js website: [https://nodejs.org/en/about/previous-releases](https://nodejs.org/en/about/previous-releases)

**Steps**

1. **Clone or Download:** Obtain the project using Git:

   ```bash
   git clone https://github.com/aravindhfinix/azure-tts-node-js
   ```

   Alternatively, download the ZIP archive from GitHub.

2. **Install Dependencies:** Navigate to the project directory and run:

   ```bash
   npm install
   ```

   (or `yarn install` if using yarn)

This will install the required dependencies:

- `dotenv`: Facilitates secure management of environment variables for your Azure credentials.
- `microsoft-cognitiveservices-speech-sdk`: Provides the Azure Speech SDK for text-to-speech capabilities.

**Usage**

**1. Obtain Azure Cognitive Services Speech Credentials**

- Sign up for a free or paid Azure account.
- Create a new Cognitive Services resource and a Speech service.
- Securely retrieve your subscription key and service region.

**2. Create a `.env` File (Optional but Recommended)**

- Create a file named `.env` in your project's root directory. This file will store your Azure credentials for secure access. The format should be:

  ```
  SUBSCRIPTION_KEY=your_subscription_key
  SERVICE_REGION=your_service_region
  ```

  **Important:** Avoid committing the `.env` file to version control systems like Git as it contains sensitive information. Consider using a `.gitignore` file to exclude it.

**3. Run the Project**

- Start the project using the following command in your terminal:

  ```bash
  npm start
  ```

  This will typically run the main script defined in your `package.json` file (usually `node src/index.js`), which might invoke the `synthesizeSpeechSSML` function or perform other necessary initialization steps.

3. **Invoke the `synthesizeSpeechSSML` Function**

   - Import the function in your JavaScript code:

   ```javascript
   const { synthesizeSpeechSSML } = require("./your_file_path"); // Replace with the path to your file
   ```

   - Provide input parameters to the function:

   ```javascript
   const inputParams = {
     text: "This is sample text for synthesis.", // The text to be spoken
     language: "en-US", // Language code (optional, defaults to 'en-US')
     voiceName: "en-US-JennyNeural", // Voice name (optional, defaults to 'en-US-JennyNeural')
     speakingRate: 1.0, // Speaking rate (optional, defaults to 1.0)
   };

   synthesizeSpeechSSML(inputParams)
     .then((result) => {
       console.log("Speech synthesis successful:", result);
       // Handle the result (e.g., audio data, viseme information)
     })
     .catch((error) => {
       console.error("Speech synthesis failed:", error);
       // Handle the error
     });
   ```

**Returned Data**

Upon successful synthesis, the `synthesizeSpeechSSML` function resolves to a Promise containing the following data:

- `audio_base64`: Base64-encoded representation of the synthesized audio
- `dialogue_message_time`: Timestamp of the synthesis request in seconds since epoch
- `duration_arr`: Array of durations (in seconds) for each viseme
- `input_text`: The original text input
- `speaking_rate`: The speaking rate used
- `viseme_arr`: Array of visemes corresponding to the synthesized speech
- `visemeid_arr`: Array of viseme IDs corresponding to the synthesized speech
- `voice`: The voice name used for synthesis

**Error Handling**

Refer to the previous section for error handling details.

**Advanced Topics**

- Explore the Microsoft Cognitive Services Speech SDK documentation: [https://azure.microsoft.com/en-us/products/ai-services/ai-speech](https://azure.microsoft.com/en-us/products/ai-services/ai-speech)
- Consider extending the project's capabilities.
- Experiment with advanced SSML features.

**Contributing**

We welcome contributions to this project! Feel free to fork the repository, make your changes, and submit a pull request.

**License**

This project is licensed under the MIT License (see LICENSE file for details).

I hope this revised README provides a clearer and more comprehensive guide for using your `azure-tts-node-js` project!
