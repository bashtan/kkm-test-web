import md5 from "md5";

// Пример расчета ключа:
// Email - ваш Email на который выделенны лицензии
// Password - пароль от лицензии
function GetKeySubLicensing(Email, Password) {
  //хеш пароля
  var Hash1 = md5(Password).toUpperCase();

  // солим
  var Hash2 = md5(Hash1 + "Qwerty").toUpperCase();

  // формируем дату в формате "YYYYMMDD" по Москве!
  var now = new Date(); //Текущая дата по Москве!
  var formated_date =
    "" +
    now.getFullYear() +
    (now.getMonth() + 1 < 10 ? "0" : "") +
    (now.getMonth() + 1) +
    (now.getDate() < 10 ? "0" : "") +
    now.getDate();
  //now.getMonth()+1 потому что getMonth() возвращает 0..11 а не 1..12

  //добавляем данные лицензии
  var Hash3 = md5(Hash2 + formated_date).toUpperCase();

  // Имя машины или имя клиента max 100 символов
  // Указывать не обязательно
  // Позволяет быстрее найти серийный номер в личном кабинете
  var Name = "Клиент-1";

  // формируем ключ
  if (Name == "") {
    var Key = Email + "/" + Hash3;
  } else {
    var Key = Name + ":" + Email + "/" + Hash3;
  }

  return Key;
}

export { GetKeySubLicensing };
