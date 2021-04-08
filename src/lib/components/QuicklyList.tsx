import { Spin } from 'antd';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import withStyles from 'react-jss';
import { FixedSizeGrid as Grid } from 'react-window';
import useQuickly from '../hooks/useQuickly';
import { stylesQuicklyList } from '../styles';
import { QuicklyListProps } from '../types';
// const { Spring } = require('react-spring/renderprops') ;

const QuicklyList = (props: QuicklyListProps): React.ReactElement => {
  const { classes } = props;
  const {
    listOptions,
    highlightedIdx,
    // setHighlightIdx,
    outerListRef,
    innerListRef,
    handleListScroll,
    listHeight,
    rowHeight,
    handleOptionHover,
    handleOptionClick,
    loading,
  } = useQuickly();

  // const renderMenuOption = ({ item, isOnRoot, section }) => {
  //   if (!item) return null;
  //   return item.route ? (
  //     <Link
  //       to={{
  //         pathname: item.route,
  //         state: {
  //           rootTitle: item.rootTitle,
  //         },
  //       }}
  //     >
  //       {isOnRoot ? `${section.title ? `${section.title} / ` : ''}${item.rootTitle}` : item.sectionTitle}
  //     </Link>
  //   ) : isOnRoot ? (
  //     `${section.title} / ${item.rootTitle}`
  //   ) : (
  //     item.sectionTitle
  //   );
  // };

  const Cell = ({ columnIndex, rowIndex, style, isScrolling }) => {
    const option = listOptions?.[rowIndex];
    const isHighlighted = highlightedIdx === rowIndex;
    const className = `${classes.option} ${isHighlighted ? classes.optionHighlighted : ''}`;
    return (
      <div style={{
        cursor: 'pointer',
        ...style
      }} className={className}
      onMouseEnter={() => handleOptionHover(rowIndex)}
      onClick={() => handleOptionClick(rowIndex)}>
        {ReactHtmlParser(option?.htmlToRender, {
      transform: (node, index) => {
        // console.log({ node });
        // if(node.type === 'tag' && node.name === 'icon') {
        //   return <antd.Icon type="loading" style={{ fontSize: '20px', marginLeft: '10px' }} spin />;
        // }
        return undefined; // node is rendered, as is, if we return undefined
      },
    })}
      </div>
    );
  };

  const renderList = () => {
    return (
      // <Spring from={{ top: 100 }} to={{ top: 500 }}>
      //     {(props) => (
            <Grid
              outerRef={outerListRef}
              innerRef={innerListRef}
              height={listHeight}
              rowCount={listOptions?.length}
              rowHeight={rowHeight}
              columnCount={1}
              columnWidth={1156}
              width={1156}
              onScroll={handleListScroll}
            >
              {Cell}
            </Grid>
      //       )}
      // </Spring>
    );
  };

  const renderSpin = () => {
    return (
        <div className={classes.spin}>
          <Spin size="large" />
        </div>
      );
  };

  return (
    <div>
      {loading ? renderSpin() : renderList()}
      {/* <SpringedList /> */}
    </div>
  );
};

export default withStyles(stylesQuicklyList)(QuicklyList);
