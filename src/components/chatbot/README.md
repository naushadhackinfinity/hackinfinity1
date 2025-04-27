# Chatbot Integration with Google Gemini API

This folder contains the components for the chatbot feature powered by Google Gemini API.

## Setup Instructions

To fully enable the chatbot with the Google Gemini API, follow these steps:

1. **Install the Google Generative AI library**:
   ```bash
   npm install @google/generative-ai
   ```

2. **Update the Gemini API integration**:
   Open `src/lib/gemini.ts` and replace the placeholder implementation with the actual API integration:

   ```typescript
   import { GoogleGenerativeAI } from '@google/generative-ai';

   // Initialize the API with your API key
   const genAI = new GoogleGenerativeAI('YOUR_API_KEY_HERE');

   // Uncomment and use the actual implementation in the sendMessageToGemini function
   ```

3. **Add your API key**:
   Replace `'YOUR_API_KEY_HERE'` with your actual Google Gemini API key.

   For security, it's recommended to use environment variables:
   
   a. Create a `.env.local` file in the root of your project:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```
   
   b. Update the code to use the environment variable:
   ```typescript
   const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
   ```

4. **Restart your development server** to apply the changes.

## Components

- **ChatbotButton.tsx**: Floating button that opens the chatbot modal
- **ChatbotModal.tsx**: Main chatbot interface with message history and input
- **ChatMessage.tsx**: Individual message component with styling for user and assistant messages

## Features

- Modern UI with smooth animations and transitions
- Conversation history with timestamps
- Typing indicators
- Suggested questions for new users
- Responsive design for all screen sizes
- Dark mode support

## Customization

You can customize the chatbot's appearance and behavior by modifying:

- Colors and styling in the component files
- Initial messages and suggested questions in ChatbotModal.tsx
- System prompt and conversation context in gemini.ts
