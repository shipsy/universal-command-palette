/**
 * https://github.com/bvaughn/react-window/issues/557
 */
import React from 'react';
const { Spring } = require('react-spring/renderprops') ;
import { List } from 'react-virtualized';

export default function SpringedList() {
  const data = [...Array(100)].map((_, i) => ({ name: i }));
  const lineHeight = 53;
  const length = data.length;
  const limit = 5;
  const { page, onPageUp, onPageDown } = usePages(length, limit);

  function row({ key, index, style }) {
    const item = data[index];
    return (
      <div key={key} style={{ ...style, background: '#eee', border: '1px solid white' }}>
        {item.name}
      </div>
    );
  }
  return (
    <div>
      <div style={{ height: lineHeight * limit, flexGrow: 1 }}>
        <Spring from={{ top: 0 }} to={{ top: lineHeight * (page.from - 1) }}>
          {(props) => (
            <List
              height={lineHeight * limit}
              rowCount={data.length}
              rowHeight={lineHeight}
              width={1}
              rowRenderer={row}
              containerStyle={{
                width: '100%',
                maxWidth: '100%',
              }}
              style={{
                width: '100%',
                overflow: 'hidden',
              }}
              scrollTop={props.top}
            />
          )}
        </Spring>
      </div>
      <Pagination length={length} page={page} onPageUp={onPageUp} onPageDown={onPageDown} />
    </div>
  );
}

const Pagination = ({ length, page, onPageUp, onPageDown }) => (
  <div>
    <button onClick={onPageDown} disabled={page.from === 1}>
      prev
    </button>
    <span>
      {page.from} - {page.to} on {length}
    </span>

    <button onClick={onPageUp} disabled={page.to >= length}>
      next
    </button>
  </div>
);

function usePages(length, limit = 5) {
  const [page, setPage] = React.useState(0);
  const onPageReset = React.useCallback(() => setPage(0), []);

  const onPageUp = React.useCallback(() => {
    if ((page + 1) * limit < length) {
      setPage(page + 1);
    }
  }, [page, length, limit]);

  const onPageDown = React.useCallback(() => {
    if (page > 0) {
      setPage(page - 1);
    }
  }, [page]);

  return {
    page: {
      from: page * limit + 1,
      to: Math.min((page + 1) * limit),
      length,
    },
    onPageReset,
    onPageUp,
    onPageDown,
  };
}
