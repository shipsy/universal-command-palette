import { Icon, Modal } from 'antd';
import React from 'react';
import withStyles from 'react-jss';
import { stylesQuicklyModal } from '../styles';
import { QuicklyModalProps } from '../types';
import useQuickly from '../hooks/useQuickly';
import QuicklyContent from './QuicklyContent';

const QuicklyModal = (props: QuicklyModalProps): React.ReactElement => {
  const { classes } = props;

  const model = useQuickly();
  const { isQuicklyModalVisible, handleQuicklyModalClose } = model;

  const renderCloseIcon = () => {
    return (
      <div className={classes.rightAlign}>
        <Icon
          type="close-circle"
          theme="filled"
          className={classes.closeButton}
          onClick={() => handleQuicklyModalClose()}
        />
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={classes.mainDiv}>
        <QuicklyContent />
      </div>
    );
  };

  return (
    <Modal
      className={classes.modalClass}
      width={1200}
      destroyOnClose
      onCancel={() => handleQuicklyModalClose()}
      closable={false}
      visible={isQuicklyModalVisible}
      footer={null}
      maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
    >
      {/* {renderCloseIcon()} */}
      {renderContent()}
    </Modal>
  );
};

export default withStyles(stylesQuicklyModal)(QuicklyModal);
