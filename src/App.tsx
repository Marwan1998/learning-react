import './App.css'
import ListGroup from './ListGroup'
import Button from './Button'
import Alert from './Alert';
import { useState } from 'react';

function App() {
  const items = ["Tripoli", "Bengazi", "Misrata", "Garaboli", "Alghomes"];
  const msg = 'You should check in on some of those fields below.';
  const handelSelectItem = (item: string) => console.log(item)
  // const handelBtnClick = () => console.log('clicked');

  const [alertVisible, setAlertVisible] = useState(false);

  return (
    <div>
      {alertVisible && <Alert msg={msg} onClose={() => setAlertVisible(false)}/>}

      <ListGroup items={items} heading='Cities' onSelectItem={handelSelectItem}/>

      <Button 
        text='Click me!'
        onClickBtn={() => setAlertVisible(true)}
        btnColor='danger'
      />

    </div>
  )
}

export default App
