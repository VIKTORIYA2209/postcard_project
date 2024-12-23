require('dotenv').config(); // Завантаження змінних з .env

const express = require('express');
const multer = require('multer'); // Для обробки файлів
const nodemailer = require('nodemailer'); // Для надсилання пошти
const path = require('path'); // Додаємо цей рядок

const app = express();
const upload = multer();

app.use(express.static('public')); // Тепер 'public' — коренева папка для статичних файлів
// Маршрут для головної сторінки
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main.html')); // Змінити на ваш шлях до main.html
});

app.post('/send-email', (req, res, next) => {
  console.log('Заголовки запиту:', req.headers);
  console.log('Тіло запиту:', req.body); // Якщо body-parser підключений
  next(); // Передаємо запит до наступного обробника
});

// Парсер form-data
app.post('/send-email', upload.single('pdf'), async (req, res) => {
  const email = req.body.email;
  const pdfFile = req.file; // Отримуємо PDF-файл

  if (!email || !pdfFile) {
    return res.status(400).json({ error: 'Не вистачає email або PDF' });
  }

 
console.log(`Email: ${email}`);
console.log(`PDF отримано: ${pdfFile.originalname}`);


  // Налаштування Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Використовуйте поштовий сервіс, наприклад, Gmail
    auth: {
      user: process.env.EMAIL_USER, // Отримуємо змінну з .env
      pass: process.env.EMAIL_PASS, // Отримуємо змінну з .env
    },
  });

  console.log('USER:', process.env.EMAIL_USER);
  console.log('PASS:', process.env.EMAIL_PASS);
  // Опції листа
  const mailOptions = {
    from: process.env.EMAIL_USER, // Відправник
    to: email, // Отримувач
    subject: 'Лист Святого Миколая', // Тема листа
    text: 'З наступаючими святами! Гарного настрою та мирного неба!', // Текст листа
    attachments: [
      {
        filename: `Привітання_від_Святого_Миколая.pdf`,
        content: pdfFile.buffer, // Вміст файлу
      },
    ],
  };

  // Надсилання листа
  try {
    await transporter.sendMail(mailOptions);
    console.log('Лист успішно відправлено!');
    res.status(200).json({ message: 'Лист успішно відправлено!' });
  } catch (error) {
    console.error('Помилка відправки листа:', error);
    res.status(500).json({ error: 'Помилка відправки листа' });
  }
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Сервер працює на http://localhost:3000');
});


