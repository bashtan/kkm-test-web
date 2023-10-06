import "./App.css";

import { useState } from "react";
import { PrintDocument } from "./commands/printDocument";

function App() {
  const [server, setServer] = useState("AddIn");
  const [device, setDevice] = useState(0);
  const [login, setLogin] = useState("User");
  const [password, setPassword] = useState("");
  const [responce, setResponce] = useState("");

  const onChangeServer = (event) => {
    const value = event.target.value;
    setServer(value);
  };

  const onChangeDevice = (event) => {
    const value = event.target.value;
    setDevice(value);
  };

  const onChangeLogin = (event) => {
    const value = event.target.value;
    setLogin(value);
  };

  const onChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const printDocument = () => {
    PrintDocument(device);
  };

  const registerCheck = () => {
    console.log("server", server);
    console.log("device", device);
    console.log("login", login);
    console.log("password", password);

    setResponce("empty");
  };

  const registerCorrectionCheck = () => {};
  const printSlip = () => {};
  const paymentCash = () => {};
  const depositingCash = () => {};
  const openCashDrawer = () => {};
  const openShift = () => {};
  const closeShift = () => {};
  const xReport = () => {};
  const ofdReport = () => {};
  const getDataCheck = () => {};
  const getDataKKT = () => {};
  const executeJSON = () => {};

  return (
    <div className="App">
      <header></header>
      <div className="App-Container">
        <p>
          Выберите сервер:
          <select id="SetServer" onChange={onChangeServer}>
            <option value="AddIn">Через расширение</option>
            <option value="http://localhost:5893/" selected="">
              http://localhost:5893/
            </option>
            <option value="https://localhost:5893/">
              https://localhost:5893/
            </option>
            <option value="http://localhost:5894/">
              http://localhost:5894/
            </option>
            <option value="https://localhost:5894/">
              https://localhost:5894/
            </option>
            <option value="http://localhost:5895/">
              http://localhost:5895/
            </option>
            <option value="https://localhost:5895/">
              https://localhost:5895/
            </option>
            <option value="http://localhost:5896/">
              http://localhost:5896/
            </option>
            <option value="https://localhost:5896/">
              https://localhost:5896/
            </option>
          </select>
        </p>
        <p>
          Номер устройства:
          <select id="SetDevice" onChange={onChangeDevice}>
            <option value={0}>Первое активное: 0</option>
            <option value={1}>Устройство №: 1</option>
            <option value={2}>Устройство №: 2</option>
            <option value={3}>Устройство №: 3</option>
            <option value={4}>Устройство №: 4</option>
            <option value={5}>Устройство №: 5</option>
            <option value={6}>Устройство №: 6</option>
            <option value={7}>Устройство №: 7</option>
            <option value={8}>Устройство №: 8</option>
            <option value={9}>Устройство №: 9</option>
            <option value={10}>Устройство №: 10</option>
            #if DEBUG
            <option value={11}>Устройство №: 11</option>
            <option value={12}>Устройство №: 12</option>
            <option value={13}>Устройство №: 13</option>
            <option value={14}>Устройство №: 14</option>
            <option value={15}>Устройство №: 15</option>
            <option value={16}>Устройство №: 16</option>
            <option value={17}>Устройство №: 17</option>
            <option value={18}>Устройство №: 18</option>
            <option value={19}>Устройство №: 19</option>
            <option value={20}>Устройство №: 20</option>
            #endif
          </select>
        </p>
        <p>
          Логин:
          <input
            type="text"
            name="Login"
            size="10"
            value={login}
            onChange={onChangeLogin}
          />
          Пароль:
          <input
            type="text"
            name="Password"
            size="10"
            value={password}
            onChange={onChangePassword}
          />
        </p>
        <p>
          <button onClick={printDocument}>Печать чека</button>
        </p>
        <p>
          <button onClick={registerCheck}>Печать чека продажи</button>
        </p>
        <p>
          <button onClick={registerCorrectionCheck}>
            Печать чека коррекции
          </button>
        </p>
        <p>
          <button onClick={printSlip}>Печать слип-чека</button>
        </p>
        <p>
          <button onClick={paymentCash}>Инкассация денег из кассы</button>
        </p>
        <p>
          <button onClick={depositingCash}>Внесение денег в кассу</button>
        </p>
        <p>
          <button onClick={openCashDrawer}>Открытие денежного ящика</button>
        </p>
        <p>
          <button onClick={openShift}>Открытие смены</button>
        </p>
        <p>
          <button onClick={closeShift}>Закрытие смены</button>
        </p>
        <p>
          <button onClick={xReport}>Печать Х отчета</button>
        </p>
        <p>
          <button onClick={ofdReport}>
            Печать состояния расчетов и связи с ОФД{" "}
          </button>
        </p>
        <p>
          <button onClick={getDataCheck}>
            Получить данные последнего чека из ФН.{" "}
          </button>
        </p>
        <p>
          <button onClick={getDataKKT}>Получить текущее состояние ККТ. </button>
        </p>
        <p>--------------------------------------------------------</p>
        <p>
          <button onClick="List(0)">Получение списка ККМ</button>
        </p>
        <p>--------------------------------------------------------</p>
        <p>
          <b>Введите текст команды JSON:</b>
        </p>
        <p>
          <textarea id="JSON"></textarea>
        </p>
        <p>
          <button onClick={executeJSON}>Выполнить команду JSON</button>
        </p>
      </div>
      <div>
        <p>Ответ сервера:</p>
        <p>{responce}</p>
      </div>
    </div>
  );
}

export default App;
