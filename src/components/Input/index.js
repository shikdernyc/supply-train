import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MUInput from '@material-ui/core/Input';
// @material-ui/icons
import Clear from '@material-ui/icons/Clear';
import Check from '@material-ui/icons/Check';
// core components
import styles from 'assets/jss/material-dashboard-react/components/customInputStyle';

const useStyles = makeStyles(styles);

export default function Input(props) {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    error,
    fullWidth,
    success,
    ...inputProps
  } = props;

  const labelClasses = classNames({
    [` ${classes.labelRootError}`]: error,
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined,
  });

  const formControlClassNames = `${classNames({
    [classes.formControl]: true,
  })} ${
    (formControlProps && formControlProps.className)
      ? formControlProps.className
      : ''
  }`;

  const fcProps = {
    ...formControlProps,
    className: formControlClassNames,
    fullWidth,
  };

  return (
    <FormControl {...fcProps}>
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <MUInput
        classes={{
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,
        }}
        id={id}
        {...inputProps}
      />
      {error ? (
        <Clear className={`${classes.feedback} ${classes.labelRootError}`} />
      ) : null}
      {success ? (
        <Check className={`${classes.feedback} ${classes.labelRootSuccess}`} />
      ) : null}
    </FormControl>
  );
}

Input.defaultPropTypes = {
  fullWidth: false,
  formControlProps: {

  },
};

Input.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
  fullWidth: PropTypes.bool,
};
