import React from 'react';
import withStyles from 'react-jss';
import useQuickly from '../hooks/useQuickly';
import { stylesQuicklyContent } from '../styles';
import { QuicklyContentProps } from '../types';
import QuicklyBreadcrumb from './QuicklyBreadcrumb';
import QuicklyList from './QuicklyList';
import QuicklySearchBox from './QuicklySearchBox';

const QuicklyContent = (props: QuicklyContentProps): React.ReactElement => {
  const { classes } = props;
  const {
    listOptions,
    loading,
  } = useQuickly();

  const renderProtip = () => {
    return <div className={classes.protip}>
      {loading ? '...' : listOptions.length} results
    </div>
  };

  const renderFooter = () => {
    return <div className={classes.footer}>
      Universal Command Palette
    </div>;
  };

  return (
    <div
      style={{
        padding: '5px 10px',
      }}
    >
      <QuicklyBreadcrumb />
      <QuicklySearchBox />
      {renderProtip()}
      <QuicklyList />
      {renderFooter()}
    </div>
  );
};

export default withStyles(stylesQuicklyContent)(QuicklyContent);
