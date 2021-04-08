import { Tag } from 'antd';
import React from 'react';
import withStyles from 'react-jss';
import useQuickly from '../hooks/useQuickly';
import { stylesQuicklyBreadcrumb } from '../styles';
import { QuicklyBreadcrumbProps } from '../types';

const QuicklyBreadcrumb = (props: QuicklyBreadcrumbProps): React.ReactElement => {
  const { classes } = props;

  const model = useQuickly();
  const { queryStack, handleBreadcrumbClick, handleBreadcrumbClose } = model;

  const renderTag = (child: string, idx: number, isLast: boolean) => {
    return <Tag color={isLast ? "#096dd9" : "black"} className={classes.tag}
      onClick={() => handleBreadcrumbClick(idx)}
      closable
      onClose={() => handleBreadcrumbClose(idx)}>
        {child}
      </Tag>;
  };

  return <div className={classes.container}>
    {queryStack?.map((qr, idx) => renderTag(qr?.humanReadableId, idx, queryStack.length - 1 === idx))}
  </div>;
};

export default withStyles(stylesQuicklyBreadcrumb)(QuicklyBreadcrumb);
