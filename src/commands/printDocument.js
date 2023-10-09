import { ExecuteCommand, guid } from "./kkm";

// ������ �����
export function PrintDocument(NumDevice, IsBarCode) {
  // ���������� ������ �������
  var Data = {
    // ������� �������
    Command: "PrintDocument",
    NumDevice: NumDevice,
    IdCommand: guid(),
    // ������ ����
    CheckStrings: [
      { PrintText: { Text: "������ ������ ����:1" } },
      { PrintText: { Text: "Print_doc:1" } },
    ],
  };
  //���� ��� ��� �� �� ������� ������ � ��
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
  // ����� �������
  ExecuteCommand(Data);
}
