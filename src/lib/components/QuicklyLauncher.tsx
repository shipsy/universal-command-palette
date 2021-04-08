import { Icon } from 'antd';
import React from 'react';
import withStyles from 'react-jss';
import useQuickly from '../hooks/useQuickly';
import { stylesQuicklyLauncher } from '../styles';
import { QuicklyLauncherProps } from '../types';

const QuicklyLauncher = (props: QuicklyLauncherProps): React.ReactElement => {
  const { classes, style } = props;

  const { handleQuicklyModalShow } = useQuickly();

  const renderIcon = () => {
    return (
      <Icon
        type="search"
        style={style}
        className={classes.icon}
        onClick={handleQuicklyModalShow}
      />
    );
  };

  return (
    <>
      {renderIcon()}
    </>
  );
};

export default withStyles(stylesQuicklyLauncher)(QuicklyLauncher);
