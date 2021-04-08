import React from 'react';
import withStyles from 'react-jss';
import QuicklyContent from './components/QuicklyContent';
import { stylesQuicklyLauncher } from './styles';
import { QuicklyIndexProps } from './types';
import useQuickly from './hooks/useQuickly';

const QuicklyIndex = (props: QuicklyIndexProps): React.ReactElement => {
  const { classes } = props;

  const model = useQuickly();
  const { handleQuicklyModalShow } = model;

  return (
    <div>
      <QuicklyContent />
    </div>
  );
};

export default withStyles(stylesQuicklyLauncher)(QuicklyIndex);
