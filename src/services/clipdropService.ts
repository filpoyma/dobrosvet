import axios from 'axios';
import FormData from 'form-data';

const CLIPDROP_API_KEY = process.env.CLIPDROP_API_KEY as string;
const CLIPDROP_API_URL = 'https://clipdrop-api.co/text-to-image/v1';

if (!CLIPDROP_API_KEY) {
  throw new Error('CLIPDROP_API_KEY должен быть задан в .env');
}

export interface ClipdropImageResponse {
  imageBuffer: Buffer;
  remainingCredits: number;
  creditsConsumed: number;
}

export async function generateClipdropImage(prompt: string): Promise<ClipdropImageResponse> {
  try {
    const formData = new FormData();
    formData.append('prompt', prompt);

    const response = await axios.post(CLIPDROP_API_URL, formData, {
      headers: {
        'x-api-key': CLIPDROP_API_KEY,
        ...formData.getHeaders(),
      },
      responseType: 'arraybuffer',
    });

    const imageBuffer = Buffer.from(response.data);
    const remainingCredits = parseInt(response.headers['x-remaining-credits'] || '0');
    const creditsConsumed = parseInt(response.headers['x-credits-consumed'] || '1');

    return {
      imageBuffer,
      remainingCredits,
      creditsConsumed,
    };
  } catch (error: any) {
    console.error('Clipdrop API error:', error);
    
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data 
        ? Buffer.from(error.response.data).toString('utf-8')
        : error.message;
      
      throw new Error(`Clipdrop API error: ${error.response?.status} - ${errorMessage}`);
    }
    
    throw new Error(`Failed to generate image: ${error.message}`);
  }
}

export async function generateClipdropImageAsBase64(prompt: string): Promise<string> {
  const { imageBuffer } = await generateClipdropImage(prompt);
  return imageBuffer.toString('base64');
} 