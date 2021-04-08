import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Key } from 'ts-keycode-enum';
import useSound from 'use-sound';
import useAnimation from './hooks/useAnimation';
import useField from './hooks/useField';
import { useGenericState } from './hooks/useGenericState';
import useKeypress from './hooks/useKeypress';
import useOptions from './hooks/useOptions';
import useTimeout from './hooks/useTimeout';
import { OptionService, QuicklyProviderProps } from './types';

const useModel = (props: QuicklyProviderProps) => {
  /** ----------------------------------------------------------- */
  /** ---------------------- State & Props ---------------------- */
  /** ----------------------------------------------------------- */
  const {
    form,
    hotkey,
    dashboards,
    sidebarSectionsToShow,
    partsToShow,
    type,
    permissionsModule,
  } = props;
  const initialState = {
    // highlightedIdx: 0,
    // scrollOffset: 0,
    isQuicklyModalVisible: false,
  };

  /** ----------------------------------------------------------- */
  /** -------------------------- Hooks -------------------------- */
  /** ----------------------------------------------------------- */
  const [state, setState] = useGenericState(initialState);
  const [highlightedIdx, setHighlightedIdx] = React.useState(0);
  const [scrollOffset, setScrollOffset] = React.useState(0);
  const options = useOptions(props);
  // tekken 3 sounds | https://infojunctionhindii.blogspot.com/2018/01/tekken-3-sound-effects.html
  const [playEnter, { stop: stopEnter }] = useSound('/sounds/SLUS_004_00043.wav', { volume: 0.1 });
  const [playNav, { stop: stopNav }] = useSound('/sounds/SLUS_004_00044.wav', { volume: 0.1 });

  const { isQuicklyModalVisible } = state;

  const handleHotKeyPress = () => {
    handleQuicklyModalShow();
  };

  const handleUpPress = () => {
    // playNav();
    if (isUpPressed) {
      navigateUp();
      scheduleNavigation('UP');
    } else {
      clearScheduledNavigation();
    }
  };

  const handleDownPress = () => {
    // playNav();
    if (isDownPressed) {
      navigateDown();
      scheduleNavigation('DOWN');
    } else {
      clearScheduledNavigation();
    }
  };

  /**
   * Supported keys doc: https://github.com/jaywcjlove/hotkeys#user-content-supported-keys
   */
  useHotkeys(hotkey || `ctrl+shift+k`, handleHotKeyPress);
  // useHotkeys('up', handleUpPress);
  // useHotkeys('down', handleDownPress);
  const isDownPressed = useKeypress([Key.DownArrow]);
  const isUpPressed = useKeypress([Key.UpArrow]);
  const isEnterPressed = useKeypress([Key.Enter]);
  const isTabPressed = useKeypress([Key.Tab]);
  const isBackspacePressed = useKeypress([Key.Backspace]);
  const isEscapePressed = useKeypress([Key.Escape]);
  const delayedNavigation = useTimeout();
  const periodicNavigation = useTimeout();

  const fieldSearchBox = useField({
    form,
    key: 'searchBox',
    placeholder: '', // 'Start typing...',
    disabled: false,
    visible: true,
  });

  const outerListRef = React.useRef<HTMLElement | undefined>(undefined);
  const innerListRef = React.useRef<any>(undefined);
  // const animation = useSpring({scrollOffset: state.scrollOffset, from: { scrollOffset: 100 }});
  // const [animationProps, setScrollOffset, stopScroll] = useSpring(() => ({ scrollOffset: 0 }));
  const animation = useAnimation();

  /** ----------------------------------------------------------- */
  /** ------------------------- Variables ----------------------- */
  /** ----------------------------------------------------------- */
  // const { highlightedIdx, scrollOffset } = state;
  const { rowHeight, listHeight } = options;
  const maxHeight =
    (innerListRef.current && innerListRef.current.style.height.replace('px', '')) || listHeight;
  const minHeight = 0.1;
  /**
   * Initial wait time before triggering automated scroll on key down.
   * A value lower than 100 causes performance issues.
   */
  const INTERVAL = 100;
  const THRESHOLD = 200;
  const query = fieldSearchBox.value;

  /** ----------------------------------------------------------- */
  /** -------------------------- Effects ------------------------ */
  /** ----------------------------------------------------------- */
  React.useEffect(() => {
    // registerOptionServices();
  }, []);

  React.useEffect(() => {
    // TODO
  }, [isTabPressed]);

  React.useEffect(() => {
    if (isBackspacePressed) {
      handlePressBackspace();
    }
  }, [isBackspacePressed]);

  React.useEffect(() => {
    handleUpPress();
  }, [isUpPressed]);

  React.useEffect(() => {
    handleDownPress();
  }, [isDownPressed]);

  React.useEffect(() => {
    if(isEnterPressed) {
      // playEnter();
      handlePressEnter(highlightedIdx);
    }
  }, [isEnterPressed]);

  React.useEffect(() => {
    outerListRef?.current?.scrollTo({
      left: 0,
      behavior: 'auto',
      top: scrollOffset,
    });
  }, [scrollOffset]);

  React.useEffect(() => {
    setScrollOffset(getScroll(highlightedIdx).scrollTo);
  }, [highlightedIdx]);

  React.useEffect(() => {
    options.setQuery(query);
    setHighlightedIdx(0);
  }, [query, options.queryStack.length]);

  /** ----------------------------------------------------------- */
  /** -------------------------- Functions ---------------------- */
  /** ----------------------------------------------------------- */

  const handleQuicklyModalShow = () => {
    setState({ isQuicklyModalVisible: true });
  };

  const handleQuicklyModalClose = () => {
    setState({ isQuicklyModalVisible: false });
  };

  // const setHighlightIdx = (idx: number) => {
  //   setState({ highlightedIdx: idx });
  // };

  const handleListScroll = ({ scrollOffset }) => {
    // setState({ scrollOffset: outerListRef?.current?.scrollTop });
  };

  const getScroll = (highlightedIdx: number) => {
    const {
      scrollTop = 0,
      offsetHeight = 0,
    } = outerListRef?.current || {};
    let firstVisibleIdx = Math.ceil(((scrollTop - rowHeight) / rowHeight));
    if (!(firstVisibleIdx >= 1)) firstVisibleIdx = 0;
    const lasttVisibleIdx = Math.ceil((((scrollTop + offsetHeight) - rowHeight) / rowHeight));
    const visibleIndices = lasttVisibleIdx - firstVisibleIdx - 1;
    let scrollTo = scrollTop;
    if (highlightedIdx > lasttVisibleIdx) {
      scrollTo = (rowHeight * (highlightedIdx - visibleIndices));
    } else if (firstVisibleIdx >= highlightedIdx) {
      scrollTo = (rowHeight * (highlightedIdx));
    }
    return {
      scrollTo,
    };
  };

  const navigateUp = () => {
    if(highlightedIdx) {
      setHighlightedIdx(highlightedIdx => {
        return highlightedIdx ? highlightedIdx - 1 : highlightedIdx;
      });
    }
  };

  const navigateDown = () => {
    if(highlightedIdx < options.data.length - 1) {
      setHighlightedIdx(highlightedIdx => {
        return highlightedIdx < options.data.length - 1 ? highlightedIdx + 1 : highlightedIdx;
      });
    }
  };
  
  const scheduleNavigation = (direction: 'UP' | 'DOWN') => {
    delayedNavigation.set({
      callback: () => periodicNavigation.set({
        callback: () => {
          if(direction === 'UP') {
            navigateUp();
          }
          if(direction === 'DOWN') {
            navigateDown();
          }
        },
        timeout: INTERVAL,
        repeated: true,
      }),
      timeout: THRESHOLD,
    })
  };

  const clearScheduledNavigation = () => {
    delayedNavigation.clear();
    periodicNavigation.clear();
  };

  const handleOptionHover = (idx: number) => {
    setHighlightedIdx(idx);
  };

  const handleOptionClick = (idx: number) => {
    handlePressEnter(idx);
  };

  const handlePressEnter = (idx: number) => {
    if(options.loading) return;

    const option = options.data[idx];
    if (option ?.humanReadableId /*&& option ?.hasChildren*/) {
      fieldSearchBox.setValue('');
      options.queryStack.push(option);
      // const newQueryStack = [...options.queryStack, option.humanReadableId];
      // options.setQueryStack(newQueryStack);
    }
    options.setQueryStack([...options.queryStack]);
  };

  const handlePressBackspace = () => {
    if(!query && options.queryStack?.length) {
      const lastQuery = options.queryStack.splice(options.queryStack?.length - 1, 1);
      // fieldSearchBox.setValue(lastQuery); // TODO: needed?
      fieldSearchBox.setValue('');
      const newQueryStack = [...options.queryStack];
      options.setQueryStack(newQueryStack);
    }
  };

  const handleBreadcrumbClick = (idx: number) => {
    const newQueryStack = [...options.queryStack.slice(0, idx + 1)];
    options.setQueryStack(newQueryStack);
  };

  const handleBreadcrumbClose = (idx: number) => {
    handleBreadcrumbClick(idx - 1);
  };

  const registerOptionServices = (services: OptionService[]) => {
    options.registerOptionsServices(services);
  };

  /** ----------------------------------------------------------- */
  /** -------------------------- Shorthands --------------------- */
  /** ----------------------------------------------------------- */
  // .filter((val, idx) => idx < 10);

  /** ----------------------------------------------------------- */
  /** ----------------------- Returned Value -------------------- */
  /** ----------------------------------------------------------- */
  return {
    // modals,
    isQuicklyModalVisible,
    handleQuicklyModalShow,
    handleQuicklyModalClose,
    listOptions: options.data,
    fieldSearchBox,
    // highlightedIdx: getScrollState().highlightedIdx,
    highlightedIdx,
    handleOptionHover,
    handleOptionClick,
    // scrollOffset,
    // setHighlightIdx,
    handleListScroll,
    outerListRef,
    innerListRef,
    listHeight,
    rowHeight,
    queryStack: options.queryStack,
    query,
    registerOptionServices,
    handleBreadcrumbClick,
    handleBreadcrumbClose,
    loading: options.loading,
  };
};

export default useModel;
