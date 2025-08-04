import axios from 'axios';

const PINTEREST_ACCESS_TOKEN = process.env.PINTEREST_ACCESS_TOKEN as string;
const PINTEREST_BOARD_ID = process.env.PINTEREST_BOARD_ID as string; // ID доски, куда публикуем

if (!PINTEREST_ACCESS_TOKEN || !PINTEREST_BOARD_ID) {
  throw new Error('PINTEREST_ACCESS_TOKEN и PINTEREST_BOARD_ID должны быть заданы в .env');
}

const PINTEREST_API_URL = 'https://api.pinterest.com/v5/pins';

export async function publishPin({ imageUrl, title, description, link }: {
  imageUrl: string;
  title: string;
  description: string;
  link?: string;
}): Promise<any> {
  const data = {
    board_id: PINTEREST_BOARD_ID,
    title,
    description,
    media_source: {
      source_type: 'image_url',
      url: imageUrl
    },
    link: link || undefined
  };

  try {
    const response = await axios.post(PINTEREST_API_URL, data, {
      headers: {
        'Authorization': `Bearer ${PINTEREST_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      const errorText = error.response.data;
      throw new Error(`Pinterest API error: ${error.response.status} ${errorText}`);
    }
    throw new Error(`Pinterest API error: ${error.message}`);
  }
}