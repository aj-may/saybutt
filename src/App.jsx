import React from 'react';
import Prank from './Prank';

function App(props) {
  const prankList = props.pranks.map(p => <Prank prank={p} />);

  return (<div>
      <h1>Say Butt</h1>

      {prankList}
    </div>);
}

export default App;
