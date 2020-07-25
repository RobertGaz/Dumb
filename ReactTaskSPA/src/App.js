import React, { useState } from "react";
import Document from "./Document";
import Menu from "./Menu";

import userlogo from "./img/user.png";
import TreeMenu from "react-simple-tree-menu";
import "../node_modules/react-simple-tree-menu/dist/main.css";

function App() {
  const treeData = [
    {
      key: "1",
      label: "Документы",
      nodes: [
        {
          key: "11",
          label: "Договора",
          nodes: [
            {
              key: "111",
              label: "Договор 1",
              textId: 1,
            },
            {
              key: "112",
              label: "Договор 2",
              textId: 2,
            },
            {
              key: "113",
              label: "Договор 3",
              textId: 3,
            },
          ],
        },
        {
          key: "12",
          label: "Декларации",
          nodes: [
            {
              key: "121",
              label: "Декларация 1",
              textId: 4,
            },
            {
              key: "122",
              label: "Декларация 2",
              textId: 5,
            },
            {
              key: "123",
              label: "Декларация 3",
              textId: 6,
            },
          ],
        },
      ],
    },
    {
      key: "2",
      label: "Переписка",
      nodes: [
        {
          key: "21",
          label: "Партнёры",
          nodes: [
            {
              key: "211",
              label: "Письмо 1",
              textId: 7,
            },
            {
              key: "212",
              label: "Письмо 2",
              textId: 8,
            },
            {
              key: "213",
              label: "Письмо 3",
              textId: 9,
            },
          ],
        },
        {
          key: "22",
          label: "ФНС",
          nodes: [
            {
              key: "221",
              label: "Извещение 1",
              textId: 10,
            },
            {
              key: "222",
              label: "Извещение 2",
              textId: 11,
            },
            {
              key: "223",
              label: "Извещение 3",
              textId: 12,
            },
          ],
        },
      ],
    },
  ];

  const actions = [
    { key: 0, label: "Открыть" },
    { key: 1, label: "Сохранить" },
  ];

  let [current, setCurrent] = useState({
    path: "",
    docSelected: null,
    docOpened: null,
    texts: [
      { id: 1, text: "qwertyuiop" },
      { id: 2, text: "qwertyuiop2" },
      { id: 3, text: "qwertyuiop3" },
      { id: 4, text: "qwertyuiop" },
      { id: 5, text: "qwertyuiop" },
      { id: 6, text: "qwertyuiop" },
      { id: 7, text: "qwertyuiop" },
      { id: 8, text: "qwertyuiop" },
      { id: 9, text: "qwertyuiop" },
      { id: 10, text: "qwertyuiop" },
      { id: 11, text: "qwertyuiop" },
      { id: 12, text: "qwertyuiop" },
    ],
  });

  function select(key, label, props) {
    setCurrent({
      path: key,
      docSelected: key.length === 8 ? { id: props.textId, name: label } : null,
      docOpened: current.docOpened,
      texts: current.texts,
    });

    console.log(current);
  }

  function act(key) {
    // открытие текста
    if (key === 0 && current.docSelected) {
      setCurrent({
        path: current.path,
        docSelected: current.docSelected,
        docOpened: {
          id: current.docSelected.id,
          name: current.docSelected.name,
          text: current.texts[current.docSelected.id - 1].text,
        },
        texts: current.texts,
      });

      if (document.getElementById("docForm")) {
        document.getElementById("docForm").value =
          current.texts[current.docSelected.id - 1].text;
      }
    }
    // сохранение текста
    else if (key === 1 && current.docOpened) {
      let curTexts = current.texts;
      curTexts[current.docOpened.id - 1].text = document.getElementById(
        "docForm"
      ).value;
      setCurrent({
        path: current.path,
        docSelected: current.docSelected,
        docOpened: {
          id: current.docOpened.id,
          name: current.docOpened.name,
          text: curTexts[current.docOpened.id - 1].text,
        },
        texts: curTexts,
      });
    }
    console.log(current);
  }

  let today = new Date();
  let date =
    today.getDate() +
    "/" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "/" +
    today.getFullYear();

  return (
    <div className="wrapper">
        <div className="appname">Тестовое приложение</div>
        <div className="user">
          <img src={userlogo} alt="user" width="30" height="30" />
        </div>

        <div className="menu">
          <ul>
            <li>
              {" "}
              Действия
              <Menu items={actions} onChg={act} />
            </li>
          </ul>
        </div>

      <nav>
          <TreeMenu
            data={treeData}
            disableKeyboard={true}
            hasSearch={false}
            onClickItem={({ key, label, ...props }) => {
              select(key, label, props);
            }}
            // initialOpenNodes={["1", "11", "12"]}
          ></TreeMenu>
        </nav>
        <article>
          <Document doc={current.docOpened} />
        </article>

      
          <div className="curDocName">
            {current.docOpened ? current.docOpened.name : ""}
          </div>
          <div className="curDate">{date}</div>
      
    </div>
  );
}

export default App;
