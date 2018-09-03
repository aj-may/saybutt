import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Copyable from './Copyable.js';

const titleCase = value =>
  typeof value === 'string' ?
    value.substring(0,1).toUpperCase() + value.substring(1) : value;

const getBaseUrl = () => {
  const { hostname, port } = window.location;
  return !port || port === 80 || port === 443 ?
    `${hostname}` : `${hostname}:${port}`;
}

const Prank = ({ name, description }) => (
  <Card>
    <CardContent>
      <Typography gutterBottom variant="headline" component="h2">
        {titleCase(name)}
      </Typography>
      <Typography component="p">
        {description}
      </Typography>

      <Copyable slug={name}>{`curl -L ${getBaseUrl()}/${name} | sh`}</Copyable>
    </CardContent>
  </Card>);

export default Prank;
