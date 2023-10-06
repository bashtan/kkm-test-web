// Общая функция вызова API Unit-server-а
// Будет использоватся во всех примерах
var UrlServer = ""; // HTTP адрес сервера торгового оборудования, если пусто то локальный вызов
var User = ""; // Пользователь доступа к серверу торгового оборудования
var Password = ""; // Пароль доступа к серверу торгового оборудования

export function ExecuteCommand(
  Data, // Данные команды
  FunSuccess, // Функция выполняемая при успешном соединении
  FunError, // Функция выполняемая при ошибке соединения
  timeout
) {
  // Проверка стоит ли расширение, и если стоит то отправка через расширение
  // Для активации скрипта расширения ваша страница должна содержать в теге "head" строку:
  // <script>var KkmServerAddIn = {};</script>
  try {
    if (window.KkmServer !== undefined) {
      // Если данные - строка JSON конвентируем в объект
      if (typeof Data == "string") Data = JSON.parse(Data);
      // Выполняем команду через расширение
      window.KkmServer.Execute(ExecuteSuccess, Data);
      //Возврат - вызов по Http не нужен
      return;
    }
  } catch (err) {
    console.log("Error execute", err);
  }
  // Если нет расширения - далее отправляем команду по http

  // Если не указана функция обработки ответа - назначаем функцию по умолчанию
  if (FunSuccess === undefined) {
    FunSuccess = ExecuteSuccess;
  }
  if (FunError === undefined) {
    FunError = ErrorSuccess;
  }
  if (timeout === undefined) {
    timeout = 60000; //Минута - некоторые драйверы при работе выполняют интерактивные действия с пользователем - тогда увеличте тайм-аут.
  }

  // Устанавливаем таймаут чуть больше чем в команде
  try {
    if (Data.Timeout !== undefined && Data.Timeout > 60) {
      timeout = (Data.Timeout + 20) * 1000;
    }
  } catch (ex) {
    console.log("Error set timeout", ex);
  }

  // Отправляем данные по HTTP протоколу
  // var Url =
  //   UrlServer +
  //   (UrlServer == ""
  //     ? window.location.protocol + "//" + window.location.host + "/"
  //     : "/") +
  //   "Execute";
  // var HeaderAuthorization =
  //   User !== "" || Password !== ""
  //     ? "Basic " + btoa(User + ":" + Password)
  //     : "";
  // var IsRerror = false;
  // const response = fetch(Url, {
  //   method: "POST", // *GET, POST, PUT, DELETE, etc.
  //   mode: "cors", // no-cors, *cors, same-origin
  //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //   //credentials: 'same-origin', // include, *same-origin, omit
  //   headers: {
  //     "Content-Type": "application/json; charset=UTF-8",
  //     Authorization: HeaderAuthorization,
  //   },
  //   redirect: "follow", // manual, *follow, error
  //   referrerPolicy: "no-referrer", // no-referrer, *client
  //   body: JSon,
  // })
  //   .catch((Exception) => {
  //     IsRerror = true;
  //     FunError("Ошибка: " + Exception.message);
  //   })
  //   .then((response) => {
  //     if (IsRerror == false) {
  //       response
  //         .json()
  //         .catch((Exception) => {
  //           IsRerror = true;
  //           FunSuccess("Ошибка: " + Exception.message);
  //         })
  //         .then((resultJson) => {
  //           if (IsRerror == false) {
  //             FunSuccess(resultJson);
  //           }
  //         });
  //     }
  //   });
}

// Функция вызываемая после обработки команды - обработка возвращаемых данных
// Здесь можно посмотреть как получить возвращаемые данные
export function ExecuteSuccess(Rezult) {
  let MessageStatus = "";
  let MessageError = "";
  //----------------------------------------------------------------------
  // ОБЩЕЕ
  //----------------------------------------------------------------------
  if (Rezult.Status === 0) {
    MessageStatus = "Ok";
  } else if (Rezult.Status === 1) {
    MessageStatus = "Выполняется";
  } else if (Rezult.Status === 2) {
    MessageStatus = "Ошибка!";
  } else if (Rezult.Status === 3) {
    MessageStatus = "Данные не найдены!";
  }
  // Текст ошибки
  MessageError = Rezult.Error;

  //----------------------------------------------------------------------
  // Фискальные регистраторы
  //----------------------------------------------------------------------
  // Номер чека
  var MessageCheckNumber = Rezult.CheckNumber;
  // Номер смены
  var MessageSessionNumber = Rezult.SessionNumber;
  // Количество символов в строке
  var MessageLineLength = Rezult.LineLength;
  // Сумма наличных в ККМ
  var MessageAmount = Rezult.Amount;

  return {
    MessageStatus,
    MessageError,
    MessageCheckNumber,
    MessageSessionNumber,
    MessageLineLength,
    MessageAmount,
  };
}

// Функция вызываемая при ошибке передачи данных
export function ErrorSuccess(TextError) {
  return "Ошибка передачи данных по HTTP протоколу: " + TextError;
}

// Герерация GUID
export function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}
