/* eslint-disable prefer-const */
import { useState } from "react";

interface Props {
    items: string[],
    heading: string,
    onSelectItem: (item: string) => void,
}

function ListGroup({items, heading, onSelectItem}: Readonly<Props>) {
  const getMessage = items.length == 0 && <p>Sorry, there is no data</p>;
  let [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      {getMessage}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={item}
            className={selectedIndex == index ? "list-group-item active" : "list-group-item"}
            onClick={() => {setSelectedIndex(index);onSelectItem(item);}}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
