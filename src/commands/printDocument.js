import { ExecuteCommand, guid } from "./kkm";

// Печать чеков
export function PrintDocument(NumDevice, IsBarCode) {
  // Подготовка данных команды
  var Data = {
    // Команда серверу
    Command: "PrintDocument",
    NumDevice: NumDevice,
    IdCommand: guid(),
    // Строки чека
    CheckStrings: [
      { PrintText: { Text: "Пример печати поля:1" } },
      { PrintText: { Text: "Print_doc:1" } },
    ],
  };
  //Если чек без ШК то удаляем строку с ШК
  if (IsBarCode === false) {
    //Data.Cash = 100;
    for (var i = 0; i < Data.CheckStrings.length; i++) {
      if (
        Data.CheckStrings[i] !== undefined &&
        Data.CheckStrings[i].BarCode !== undefined
      ) {
        Data.CheckStrings[i].BarCode = null;
      }
    }
  }
  // Вызов команды
  ExecuteCommand(Data);
}
