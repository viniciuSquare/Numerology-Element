import { FormEvent, useState } from "react";

import "./App.css";
import { ElementProps, NameElementCalculator } from "./elements/script";

function App() {
  const elementsService = new NameElementCalculator();

  const [name, setName] = useState<string>("");
  const [element, setElement] = useState<ElementProps | null>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    findNameElement(name);
  }
  function findNameElement(name: string) {
    setElement(elementsService.getElementFromCompleteName(name));
  }

  return (
    <>
      <div className="card">
        <div>
          <h1>Find your element</h1>
          <div className="flex elements">
            {elementsService.elements.map((element, index) => {
              return (
                <div className="element-wrapper flex" key={index}>
                  <span>{element.icon}</span>
                  <span>{element.name}</span>
                </div>
              );
            })}
          </div>
        </div>
        <form action="submit" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type your complete name..."
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setElement(null);
            }}
          />
          <button onClick={() => findNameElement(name)}>Check Element</button>
        </form>
      </div>
      <div className="result-element">
        {element && <DisplayElement element={element} name={name} />}
      </div>
    </>
  );
}

export default App;

function DisplayElement(props: { element: ElementProps; name: string }) {
  const { name, element } = props;

  return (
    <div className="result">
      <h2>There's your element</h2>
      <div className="result-card">
        <span>{name}</span>
        <div className="flex">
          <span>{element.name}</span>
          <span>{element.icon}</span>
        </div>
      </div>
    </div>
  );
}
