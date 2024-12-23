
function playMusic() {
  const music = document.getElementById("background-music");
  music.play();
  document.getElementById("start-music").style.display = "none"; ///прибираємо з видимості кнопку
}  

  // Перемикання сторінок
  function goToPage(pageNumber) {
    document.querySelectorAll('.section').forEach((section, index) => {
      section.classList.toggle('active', index + 1 === pageNumber);
    });
  }

 
// Змінна для зберігання об'єкта PDF
let pdfDocument;

function generatePreview() {

  const nameInput = document.getElementById("name").value.trim();
  const wishesInput = document.getElementById("wishes").value.trim();
  const isGirl = document.getElementById('girlCheckbox').checked;
  const isBoy = document.getElementById('boyCheckbox').checked;

  // Регулярний вираз для перевірки великої літери
  const nameRegex = /^[А-ЯҐЄІЇA-Z][а-яґєіїa-z]+$/;
 // const wishesRegex = /^[а-яґєіїa-z]+/

  // Перевірка поля "Ім'я"
  if (!nameRegex.test(nameInput)) {
    alert("Ім'я повинно починатися з великої літери і не містити цифр або спеціальних символів!");
    return;
  }

  // Перевірка поля "Побажання"
  if (wishesInput === "") {
    alert("Побажай щось від себе, адже поле не може бути порожнім)");
    return;
  }

  /*if (!wishesRegex.test(wishesInput)) {
    alert("Побажання впиши з маленької літери, щоб магія вдалась)");
    return;
  }*/

  if (isGirl && isBoy) {
    alert('Оберіть лише одну опцію: або дівчинка, або хлопчик.');
    return;
  }

  if (!isGirl && !isBoy) {
    alert('Оберіть, для кого формуємо лист: дівчинки чи хлопчика.');
    return;
  }

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  const name = document.getElementById('name').value;
  const wishes = document.getElementById('wishes').value;

 // Вибір картинки і тексту залежно від вибору
const img = new Image();
let greetingText;

if (isGirl) {
  img.src = 'images/27241.jpg'; // Картинка для дівчинки
  greetingText = `
   
    Пише тобі Святий Миколай! Я дуже тішуся з того, що ти не забула
    і довірила мені виконання своїх найпотаємніших новорічних побажань! 

    Зараз мої чарівні помічники готують для хлопчиків і дівчаток 
    довгоочікувані подарунки. 
    Тобі відомо, як багато чемних діточок живе по всьому світові.
    І всі вони дуже чекають на мене.
    
    ${name}, поспішаю порадувати, що твоє ім’я записано
    в моєму особливому списку гарних дівчаток і хлопчиків.
   
    Я знаю, як ти старалася протягом усього року. 
    Не зупиняйся на досягнутому, адже ти дуже талановита і здібна. 
    Я знаю, що в тебе все вийде! 

    Відкрию тобі невеличку таємницю: 
    у новому році на тебе чекають приємні зустрічі і дивовижні сюрпризи, 
    ти зможеш відвідати цікаві місця і багато чого навчитися.

    Дуже сподіваюся, що тобі сподобається мій подарунок!
    Хочу побажати тобі: ${wishes}
    Обіймаю тебе міцно! 
    Будь чемною, бережи себе і слухайся старших!

    Пам’ятай про те, що твоя сім’я і я дуже любимо тебе!
    
    З Новим роком! З Різдвом!
    З любов’ю, твій Святий Миколай!🎅
  `;
} else if (isBoy) {
  img.src = 'images/95713.jpg'; // Картинка для хлопчика
  greetingText = `
   
    Пише тобі Святий Миколай! Я дуже тішуся з того, що ти не забув
    і довірив мені виконання своїх найпотаємніших новорічних побажань! 

    Зараз мої чарівні помічники готують для хлопчиків і дівчаток 
    довгоочікувані подарунки. 
    Тобі відомо, як багато чемних діточок живе по всьому світові.
    І всі вони дуже чекають на мене.

    ${name}, поспішаю порадувати, що твоє ім’я записано
    в моєму особливому списку гарних дівчаток і хлопчиків.
   
    Я знаю, як ти старався протягом усього року. 
    Не зупиняйся на досягнутому, адже ти дуже талановитий і здібний. 
    Я знаю, що в тебе все вийде! 

    Відкрию тобі невеличку таємницю: 
    у новому році на тебе чекають приємні зустрічі і дивовижні сюрпризи, 
    ти зможеш відвідати цікаві місця і багато чого навчитися.

    Дуже сподіваюся, що тобі сподобається мій подарунок!
    Хочу побажати тобі: ${wishes}
    Обіймаю тебе міцно! 
    Будь чемним, бережи себе і слухайся старших!

    Пам’ятай про те, що твоя сім’я і я дуже любимо тебе!
    
    З Новим роком! З Різдвом!
    З любов’ю, твій Святий Миколай!🎅
  `;
}


img.onload = function () {
  // Додаємо фон
  pdf.addImage(img, 'JPEG', 0, 0, 210, 297); // Розмір A4

 // Додаємо текст до PDF
 const pageWidth = pdf.internal.pageSize.getWidth(); // Отримуємо ширину сторінки
 const text = `Вітаю тебе ${name}!`;

  pdf.setFont('Roboto-Regular');
  pdf.setFontSize(16);
  pdf.text(text, pageWidth / 2, 30, { align: "center" }); // Центруємо текст по горизонталі
  pdf.setFontSize(12);
  pdf.text(greetingText,30, 30, { align: "left" });

    // Зберігаємо PDF у змінну
    pdfDocument = pdf;

// Генеруємо PDF як Blob
const pdfBlob = pdf.output("blob");

// Створюємо URL для перегляду у iframe
const blobUrl = URL.createObjectURL(pdfBlob);
document.getElementById("pdfPreview").src = blobUrl;
    goToPage(3);
  };

  img.onerror = function () {
    alert("Не вдалося завантажити зображення. Перевірте шлях до файлу!");
  };
}

// Завантаження збереженого PDF
function downloadPDF() {
  if (pdfDocument) {
    pdfDocument.save("лист.pdf");
  } else {
    alert("Спершу згенеруйте PDF!");
  }
}

///функція снігу

let snowEnabled = false; // Стан снігопаду: false - вимкнений

function toggleSnow() {
  const snowButton = document.getElementById('snowButton'); // Знаходимо кнопку
  const snowContainer = document.getElementById('snow-container'); // Знаходимо контейнер для сніжинок

  if (!snowEnabled) {
    // Якщо сніг вимкнений, запускаємо
    snowEnabled = true; // Міняємо стан
    snowButton.textContent = 'Вимкнути сніг ❄️'; // Змінюємо текст кнопки
    startSnow(); // Викликаємо функцію для старту снігопаду
  } else {
    // Якщо сніг увімкнений, зупиняємо
    snowEnabled = false; // Міняємо стан
    snowButton.textContent = 'Запустити сніг ❄️'; // Змінюємо текст кнопки
    snowContainer.innerHTML = ''; // Очищаємо контейнер сніжинок
  }
}

function startSnow() {
  const snowContainer = document.getElementById('snow-container');  //контейнер для всіх сніжинок
  const snowflakeCount = 50; // Кількість сніжинок на екрані

  // Очищаємо контейнер від попередніх сніжинок (на випадок повторного запуску)
  snowContainer.innerHTML = '';

  for (let i = 0; i < snowflakeCount; i++) {
    const snowflake = document.createElement('div'); //створюємо новий HTML-елемент <div>, який представляє одну сніжинку.
    snowflake.classList.add('snowflake'); //додаємо класс snowflake
    snowflake.innerHTML = '❄️'; //змінюємо вміст на сніжинку

    // Випадкове розташування та розмір
    snowflake.style.left = `${Math.random() * 100}vw`; //розташовує сніжинку випадковим чином по горизонталі.
    snowflake.style.animationDuration = `${7 + Math.random() * 5}s`; // Випадкова швидкість падіння, s - секунди
    snowflake.style.fontSize = `${10 + Math.random() * 20}px`; // Випадковий розмір

    snowContainer.appendChild(snowflake);//додаємо створений елемент сніжинки до контейнера 
  }
}

// Прив'язуємо подію до кнопки
document.getElementById('snowButton').addEventListener('click', toggleSnow);
