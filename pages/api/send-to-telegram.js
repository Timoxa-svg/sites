import axios from "axios";
import FormData from "form-data";
import formidable from "formidable";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false, // Отключаем стандартный bodyParser, чтобы использовать formidable
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Метод не разрешён" });
  }

  const form = formidable({ multiples: false, maxFileSize: 5 * 1024 * 1024 }); // Лимит 5 МБ

  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    // Извлекаем поля из формы
    const name = fields.name?.[0];
    const phone = fields.phone?.[0];
    const telegram = fields.telegram?.[0];
    const message = fields.message?.[0];
    const file = files.file?.[0];

    // Проверяем обязательные поля
    if (!name || !phone || !message) {
      return res.status(400).json({ message: "Поля 'Имя', 'Номер телефона' и 'Сообщение' обязательны для заполнения" });
    }

    // Получаем токен и ID чата из переменных окружения
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return res.status(500).json({ message: "Отсутствуют настройки Telegram (BOT_TOKEN или CHAT_ID)" });
    }

    // Формируем сообщение для Telegram
    const telegramMessage = `
📋 Новая анкета:
👤 Имя: ${name}
📞 Телефон: ${phone}
📱 Telegram: ${telegram || "Не указан"}
💬 Сообщение: ${message}
    `;

    // Отправляем текстовое сообщение
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: telegramMessage,
      parse_mode: "Markdown",
    });

    // Если есть файл, отправляем его
    if (file) {
      const formData = new FormData();
      formData.append("chat_id", CHAT_ID);
      formData.append("document", await fs.readFile(file.filepath), file.originalFilename);

      await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, formData, {
        headers: formData.getHeaders(),
      });

      // Удаляем временный файл
      await fs.unlink(file.filepath);
    }

    return res.status(200).json({ message: "Сообщение успешно отправлено в Telegram" });
  } catch (error) {
    console.error("Ошибка при отправке в Telegram:", error.response ? error.response.data : error.message);
    return res.status(500).json({ message: "Ошибка при отправке в Telegram" });
  }
}