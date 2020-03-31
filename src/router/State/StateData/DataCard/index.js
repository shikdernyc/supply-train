import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card, { CardHeader, CardIcon, CardFooter } from 'components/Card';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

const useStyles = makeStyles({
  ...styles,
  cardFooter: {
    display: 'flex', justifyContent: 'flex-end', width: '100%', height: '80px',
  },
  cardInput: { '& .input': { marginRight: '10px' } },
});

const AnimatedText = ({ children }) => {
  const [animating, setAnimating] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [message, setMessage] = useState(children);
  useEffect(() => {
    if (initialRender) setInitialRender(false);
    if (!initialRender) {
      setAnimating(true);
      const timer = setTimeout(() => {
        setMessage(children);
        setAnimating(false);
      }, [1000]);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [children]);

  return <span className={animating ? 'text-change-fade' : ''}>{message}</span>;
};

export default function ({
  title, data, Icon, Input, Button, color,
}) {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader color={color} stats icon>
        <CardIcon color={color}>{Icon}</CardIcon>
        <p className={classes.cardCategory}>
          {title}
        </p>

        <h3 className={classes.cardTitle}>
          <AnimatedText>
            {data}
          </AnimatedText>
        </h3>
      </CardHeader>
      <CardFooter stats>
        <div className={classes.cardFooter}>
          <div className={classes.cardInput}>
            <span className="input">{Input}</span>
            {Button}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
