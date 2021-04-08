import { Form } from 'antd';
import React from 'react';
import withStyles from 'react-jss';
import { quicklyContext } from '../hooks/useQuickly';
import useModel from '../model';
import { stylesQuicklyProvider } from '../styles';
import { QuicklyProviderProps } from '../types';
import QuicklyModal from './QuicklyModal';

const QuicklyProvider = (props: QuicklyProviderProps): React.ReactElement => {
  const { classes, children } = props;
  const model = useModel(props);
  const { isQuicklyModalVisible } = model;

  const renderModals = () => {
    return <>{isQuicklyModalVisible ? <QuicklyModal model={model} /> : null}</>;
  };

  return (
    <quicklyContext.Provider value={model}>
      <>
        {renderModals()}
        {children}
      </>
    </quicklyContext.Provider>
  );
};

const QuicklyProviderWithForm = Form.create()(QuicklyProvider);
const QuicklyProviderStyled = withStyles(stylesQuicklyProvider)(QuicklyProviderWithForm);
export default QuicklyProviderStyled;
