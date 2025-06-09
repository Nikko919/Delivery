<?php

//  токен scrf
session_start();
if (empty($_SESSION['csrf_token'])) {
  $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}






session_start();
// Принудительный редирект на HTTPS
if (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === 'off') {
  $redirect = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
  header('Location: ' . $redirect, true, 301);
  exit();
}


// Укажите ваш email
$to = 'andre.dena.919@mail.ru'; // <-- Замените на свой email

// Получаем данные из формы
$from = $_POST['from'] ?? '';
$to_address = $_POST['to'] ?? '';
$date = $_POST['date'] ?? '';
$time = $_POST['time'] ?? '';
$name = $_POST['name'] ?? '';
$phone = $_POST['phone'] ?? '';

// Опции (чекбоксы)
$loaders = isset($_POST['loaders']) ? 'Да' : 'Нет';
$insurance = isset($_POST['insurance']) ? 'Да' : 'Нет';
$need_help = isset($_POST['need_help']) ? 'Да' : 'Нет';
$policy = isset($_POST['policy']) ? 'Да' : 'Нет';

// Группы чекбоксов (массивы)
$transport_types = isset($_POST['transport_type']) ? implode(', ', $_POST['transport_type']) : 'Не выбрано';
$packing = isset($_POST['packaging']) ? implode(', ', $_POST['packaging']) : 'Не выбрано';

// Машина (radio)
$carType = $_POST['carType'] ?? '';
$type = $weight = $width = $height = '';
if ($carType) {
  list($type, $weight, $width, $height) = explode('|', $carType);
}

// Ограничение по количеству отправок с одного IP (rate limit)
$ip = $_SERVER['REMOTE_ADDR'];
$rate_limit_file = __DIR__ . '/send-rate-limit.log';
$rate_limit_seconds = 60; // 1 минута
$can_send = true;
$rate_data = [];
if (file_exists($rate_limit_file)) {
  $rate_data = json_decode(file_get_contents($rate_limit_file), true) ?: [];
  if (isset($rate_data[$ip]) && (time() - $rate_data[$ip]) < $rate_limit_seconds) {
    $can_send = false;
  }
}
if (!$can_send) {
  echo '<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"><title>Ошибка</title></head><body style="font-family:sans-serif;text-align:center;padding:40px;"><h1 style="color:#c00;">Слишком часто!</h1><p>Пожалуйста, подождите минуту перед повторной отправкой формы.</p><p><a href="javascript:history.back()">Вернуться назад</a></p></body></html>';
  exit();
}
// Обновляем время последней отправки
$rate_data[$ip] = time();
file_put_contents($rate_limit_file, json_encode($rate_data));

// Формируем HTML-письмо
$subject = "Заявка на доставку с сайта";
$message = '<html><head><style>
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #eee; padding: 8px; }
  th { background: #f5f5f5; }
  h2 { color: #2e7d32; }
</style></head><body>';
$message .= '<h2>Новая заявка с сайта</h2>';
$message .= '<table>';
$message .= '<tr><th>Поле</th><th>Значение</th></tr>';
$message .= '<tr><td>Имя</td><td>' . htmlspecialchars($name) . '</td></tr>';
$message .= '<tr><td>Телефон</td><td>' . htmlspecialchars($phone) . '</td></tr>';
$message .= '<tr><td>Откуда</td><td>' . htmlspecialchars($from) . '</td></tr>';
$message .= '<tr><td>Куда</td><td>' . htmlspecialchars($to_address) . '</td></tr>';
$message .= '<tr><td>Дата</td><td>' . htmlspecialchars($date) . '</td></tr>';
$message .= '<tr><td>Время</td><td>' . htmlspecialchars($time) . '</td></tr>';
$message .= '<tr><td>Грузчики</td><td>' . htmlspecialchars($loaders) . '</td></tr>';
$message .= '<tr><td>Страховать груз</td><td>' . htmlspecialchars($insurance) . '</td></tr>';
$message .= '<tr><td>Способ перевозки</td><td>' . htmlspecialchars($transport_types) . '</td></tr>';
$message .= '<tr><td>Упаковка</td><td>' . htmlspecialchars($packing) . '</td></tr>';
$message .= '<tr><td>Нужна помощь с машиной</td><td>' . htmlspecialchars($need_help) . '</td></tr>';
if ($need_help !== 'Да') {
  $message .= '<tr><td>Тип машины</td><td>' . htmlspecialchars($type) . '</td></tr>';
  $message .= '<tr><td>Вес</td><td>' . htmlspecialchars($weight) . '</td></tr>';
  $message .= '<tr><td>Ширина</td><td>' . htmlspecialchars($width) . '</td></tr>';
  $message .= '<tr><td>Высота</td><td>' . htmlspecialchars($height) . '</td></tr>';
}
$message .= '<tr><td>Согласие с политикой</td><td>' . htmlspecialchars($policy) . '</td></tr>';
$message .= '</table>';
$message .= '</body></html>';

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: site@yourdomain.com\r\n";

// Отправляем письмо
$mail_result = mail($to, $subject, $message, $headers);

if (!$mail_result) {
  // Логируем ошибку
  $log_message = date('Y-m-d H:i:s') . " Ошибка отправки письма. IP: " . $_SERVER['REMOTE_ADDR'] . ", Email: $to, Name: $name, Phone: $phone\n";
  file_put_contents(__DIR__ . '/send-error.log', $log_message, FILE_APPEND);
  echo '<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"><title>Ошибка</title></head><body style="font-family:sans-serif;text-align:center;padding:40px;"><h1 style="color:#c00;">Ошибка!</h1><p>Не удалось отправить письмо. Пожалуйста, попробуйте позже или свяжитесь с нами другим способом.</p><p><a href="javascript:history.back()">Вернуться назад</a></p></body></html>';
  exit();
}
// проверка ввода только букв в поле имени
if (
  !preg_match('/^[A-Za-zА-Яа-яЁё\\- ]+$/u', $name) ||
  strpos($name, '|') !== false ||
  strpos($name, '\\') !== false // <-- одна обратная косая черта!
) {
  echo '<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"><title>Ошибка</title></head><body style="font-family:sans-serif;text-align:center;padding:40px;"><h1 style="color:#c00;">Ошибка!</h1><p>Имя может содержать только буквы, пробелы и дефис. Символы | и \\ запрещены.</p><p><a href="javascript:history.back()">Вернуться назад</a></p></body></html>';
  exit();
}
// Показываем сообщение об успехе
?><!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8">
  <title>Заявка отправлена</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f7f7f7;
      text-align: center;
      padding: 60px;
    }

    .success-box {
      background: #fff;
      border-radius: 10px;
      display: inline-block;
      padding: 40px 30px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
    }

    h1 {
      color: #2e7d32;
    }

    p {
      color: #333;
      font-size: 18px;
    }

    a {
      color: #1976d2;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  </style>
</head>

<body>
  <div class="success-box">
    <h1>Спасибо!</h1>
    <p>Ваша заявка успешно отправлена.<br>Наш менеджер свяжется с вами в ближайшее время.</p>
    <p><a href="https://webras.ru/#form-delivery">Вернуться назад</a></p>
  </div>
</body>

</html>
<?php
// Конец скрипта
exit();
?>