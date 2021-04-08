import { Input } from 'antd';
import React from 'react';
import withStyles from 'react-jss';
import { stylesQuicklySearchBox } from '../styles';
import { QuicklySearchBoxProps } from '../types';
import useQuickly from '../hooks/useQuickly';

const QuicklySearchBox = (props: QuicklySearchBoxProps): React.ReactElement => {
  const { classes } = props;

  const model = useQuickly();
  const { fieldSearchBox } = model;

  const renderInput = () => {
    return fieldSearchBox?.decorator(
      <Input autoFocus className={classes.input} spellCheck={false} />
    );
  };

  return <div>{renderInput()}</div>;
};

export default withStyles(stylesQuicklySearchBox)(QuicklySearchBox);
