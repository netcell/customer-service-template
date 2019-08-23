import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import format from "string-template";
import _ from 'lodash';

import "./styles.css";
import { db } from "./database";

const useInputText = () => {
  const [value, setValue] = useState("");
  
  const onChange = (evt) => {
      setValue(evt.target.value)
  }

  return [value, onChange];
}

const useSelect = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  
  const onChange = (evt) => {
      setValue(evt.target.value)
  }

  return [value, onChange];
}

function App() {

  const [gameName, onChangeGameName] = useInputText();
  const [userName, onChangeUserName] = useInputText();
  const [stars, onChangeStars] = useSelect(5);
  const types = _.keys(db[stars]);
  const [type, onChangeType] = useSelect(types[0]);

  useEffect(() => {
    onChangeType({
      target: {
        value: types[0]
      }
    });
  }, [stars])

  const template = _.sample(db[stars][type]);
  const result = format(
    template,
    {
      userName,
      gameName
    }
  )

  return (
    <div className="App">
      <h1>Customer Service Template</h1>
      <form>
        <p>
          <label>
            Game Name:
            <input
              type="text"
              value={gameName}
              onChange={onChangeGameName}
            />
          </label>
        </p>
        <p>
          <label>
            User Name:
            <input
              type="text"
              value={userName}
              onChange={onChangeUserName}
            />
          </label>
        </p>
        <p>
          <label>
            Stars:
            <select value={stars} onChange={onChangeStars}>
              <option value={5}>5</option>
              <option value={4}>4</option>
              <option value={3}>3</option>
              <option value={2}>2</option>
              <option value={1}>1</option>
            </select>
          </label>
        </p>
        <p>
          <label>
            Type:
            <select value={type} onChange={onChangeType}>
            {types.map(type => <option value={type}>{type}</option>)}
            </select>
          </label>
        </p>
      </form>
      <p>
        {result}
      </p>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
