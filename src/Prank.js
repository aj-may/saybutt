import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Copyable from './Copyable.js';

const titleCase = value =>
  typeof value === 'string' ?
    value.substring(0,1).toUpperCase() + value.substring(1) : value;

const getBaseUrl = () => {
  const { protocol, hostname, port } = window.location;
  return !port || port === 80 || port === 443 ?
    `${protocol}//${hostname}` : `${protocol}//${hostname}:${port}`;
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

      <Copyable>{`curl ${getBaseUrl()}/${name} | sh`}</Copyable>
    </CardContent>
    <CardActions>
      <Button color="primary">
        View
      </Button>
      <Button color="primary">
        Share
      </Button>
    </CardActions>
  </Card>);

export default Prank;
