import { OpenAI } from 'openai';

export default async function handler(req, res) {
  // نتحقق أن الطريقة POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'الطريقة غير مسموحة' });
  }

  try {
    const { prompt } = req.body;

    // إنشاء عميل OpenAI باستخدام المفتاح من environment variables
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // إرسال الطلب إلى OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are a creative storyteller that writes in Arabic." 
        },
        { role: "user", content: prompt }
      ],
      max_tokens: 500,
    });

    // إرجاع القصة الناتجة
    const story = completion.choices[0].message.content;
    res.status(200).json({ success: true, story });

  } catch (error) {
    console.error('خطأ:', error);
    res.status(500).json({ 
      success: false, 
      error: 'فشل في توليد القصة',
      message: error.message 
    });
  }
}