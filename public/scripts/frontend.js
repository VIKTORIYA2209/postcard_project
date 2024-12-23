function sendPDFToEmail() {
    if (!pdfDocument) {
      alert('Спершу згенеруйте PDF!');
      return;
    }
  
    const email = prompt('Введіть вашу електронну адресу:');
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      alert('Введіть коректну електронну адресу!');
      return;
    }
  
    // Генеруємо PDF як Blob
    const pdfBlob = pdfDocument.output('blob');
    const formData = new FormData();
    formData.append('pdf', pdfBlob, 'лист.pdf');
    formData.append('email', email);
  
    const PORT = process.env.PORT || 3000;
    // Відправка на сервер
    fetch('http://localhost:PORT/send-email', { // Додано повний шлях
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert('Ваш лист успішно відправлено!');
        } else {
          alert('Помилка відправки. Спробуйте ще раз.');
        }
      })
      .catch((error) => {
        console.error('Помилка:', error);
        alert('Не вдалося відправити лист.');
      });
  }
  
  document.getElementById('sendEmailButton').addEventListener('click', sendPDFToEmail);
  