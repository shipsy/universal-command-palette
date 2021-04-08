// Color Palette: https://coolors.co/000000-14213d-fca311-e5e5e5-ffffff
export const stylesQuicklyModal = (theme) => ({
  parentDiv: {
    padding: '12px 24px 30px 24px',
    width: '100%',
  },
  mainDiv: {
    // border: '1px solid #D9D9D9',
    // borderRadius: '4px',
    width: '100%',
  },
  modalClass: {
    minWidth: '1200px',
    width: '100%',
    top: '7%',
    '& .ant-modal-content': {
      borderRadius: '8px',
    },
    '& .ant-modal-body': {
      padding: '12px 12px 20px 12px',
      background: '#252525',
      borderRadius: '8px',
    },
    opacity: 0.7,
  },
  rightAlign: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  closeButton: {
    color: '#666666',
    cursor: 'pointer',
  },
});

export const stylesQuicklyLauncher = (theme) => ({
  icon: {
    marginRight: '20px',
    fontSize: '20px',
    cursor: 'pointer',
  },
});

export const stylesQuicklyContent = (theme) => ({
  footer: {
    height: '45px',
    color: '#595959',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: '15px'
  },
  logo: {
    marginRight: '10px',
    height: '90%',
  },
  protip: {
    color: '#9c9c9c',
    marginBottom: '10px',
    marginLeft: '30px',
  }
});

export const stylesQuicklySearchBox = (theme) => ({
  input: {
    // padding: '0px 30px',
    fontSize: '25px',
    '&.ant-input, &.ant-input:focus, &.ant-input:hover': {
      background: '#e5e5e51f',
      color: 'white',
      border: 'none',
      padding: '30px',
      boxShadow: 'unset',
    },
    '&.ant-form-item': {
      // marginBottom: '0px',
    }
  }
});

export const stylesQuicklyIndex = (theme) => ({});

export const stylesQuicklyProvider = (theme) => ({});

export const stylesQuicklyList = (theme) => ({
  option: {
    padding: '10px 30px',
    fontSize: '25px',
    color: 'white',
    // border: '1px solid #0000001f',
    '& a': {
      color: 'white',
    },
  },
  optionHighlighted: {
    background: '#fca3117a',
  },
  spin: {
    // height: "100%",
    // width: "100%",
    textAlign: "center",
    margin: '150px 0px',
    // top: "30%",
    // zIndex: 1000,
    // position: "absolute",
  }
});

export const stylesQuicklyBreadcrumb = (theme) => ({
  tag: {
    marginRight: '20px',
    marginBottom: '12px',
    fontSize: '18px',
    // flexGrow: 0,
    // flexShrink: 0,
    // flexBasis: 'calc(50% - 10px)', /* separate properties for IE11 upport */
  },
  container: {
    display: 'flex',
    // flexFlow: 'row wrap',
    flexWrap: 'wrap',
    padding: '0px 30px',
    marginBottom: '10px',
  },
});
