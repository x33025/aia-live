import { OpenAI } from 'openai';
import { env } from '$env/dynamic/private';

// Initialize the OpenAIApi client with the configuration
const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export default openai;
