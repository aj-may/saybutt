import React from 'react';

function Prank(props) {
  return (<div>
      <h2>{props.prank.name}</h2>
      <p>{props.prank.description}</p>
      <pre>{props.prank.curl}</pre>
    </div>);
}

export default Prank;
