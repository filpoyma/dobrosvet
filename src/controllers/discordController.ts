import { Request, Response } from 'express';
import { MJData } from '../models/mjData';

export async function handleDiscordWebhook(req: Request, res: Response) {
  try {
    const { prompt, imageUrl, messageId, channelId, timestamp } = req.body;

    console.log('Получены данные от Discord:', {
      prompt,
      imageUrl,
      messageId,
      channelId,
      timestamp
    });

    // Проверяем обязательные поля
    if (!prompt || !imageUrl || !messageId || !channelId || !timestamp) {
      return res.status(400).json({ 
        error: 'Отсутствуют обязательные поля: prompt, imageUrl, messageId, channelId, timestamp' 
      });
    }

    // Извлекаем текст между двойными звездочками **
    let cleanedPrompt = prompt;
    const starMatch = prompt.match(/\*\*(.*?)\*\*/);
    if (starMatch) {
      cleanedPrompt = starMatch[1].trim();
    } else {
      // Если нет двойных звездочек, очищаем от лишних звездочек в начале и конце
      cleanedPrompt = prompt.replace(/^\*\*+/, '').replace(/\*\*+$/, '').trim();
    }


    const mjData = new MJData({
      prompt: cleanedPrompt,
      imageUrl,
      messageId,
      channelId,
      timestamp: new Date(timestamp)
    });

    await mjData.save();

    console.log('✅ Данные сохранены в MongoDB:', mjData._id);

    res.json({ 
      success: true, 
      message: 'Данные получены и сохранены',
      data: {
        id: mjData._id,
        prompt: cleanedPrompt,
        imageUrl,
        messageId,
        channelId,
        timestamp: mjData.timestamp
      }
    });
  } catch (error: any) {
    console.error('❌ Ошибка обработки Discord webhook:', error);
    
    // Проверяем, является ли ошибка дублированием ключа
    if (error.code === 11000) {
      return res.status(409).json({ 
        error: 'Сообщение с таким messageId уже существует' 
      });
    }
    
    res.status(500).json({ error: error.message });
  }
}

export async function getAllMJData(req: Request, res: Response) {
  try {
    const { page = 1, limit = 10, channelId } = req.query;
    
    const skip = (Number(page) - 1) * Number(limit);
    
    // Строим фильтр
    const filter: any = {};
    if (channelId) {
      filter.channelId = channelId;
    }
    
    // Получаем данные с пагинацией
    const mjData = await MJData.find(filter)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean();
    
    // Получаем общее количество записей
    const total = await MJData.countDocuments(filter);
    
    res.json({
      success: true,
      data: mjData,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error: any) {
    console.error('❌ Ошибка получения данных MJData:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getLatestMJData(req: Request, res: Response) {
  try {
    const { channelId } = req.query;
    
    // Строим фильтр
    const filter: any = {};
    if (channelId) {
      filter.channelId = channelId;
    }

    const latestData = await MJData.findOne(filter)
      .sort({ timestamp: -1 })
      .lean();
    

    
    if (!latestData) {
      return res.status(404).json({
        success: false,
        message: 'Записи не найдены',
        data: null
      });
    }
    
    res.json({
      success: true,
      message: 'Последняя запись получена',
      data: latestData
    });
  } catch (error: any) {
    console.error('❌ Ошибка получения последней записи MJData:', error);
    res.status(500).json({ error: error.message });
  }
}
