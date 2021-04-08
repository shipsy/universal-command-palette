import React from 'react';
import { QuicklyProviderProps, OptionService, Option } from '../types';
import { isLowerCase } from '../utils';

const DELAY = 200; // ms
const DEFAULT_ROW_HEIGHT = 50;
const DEFAULT_LIST_HEIGHT = 350;
const useOptions = (props: QuicklyProviderProps) => {
  const [query, setQuery] = React.useState('');
  const [queryStack, setQueryStack] = React.useState([] as Option[]);
  const [services, setServices] = React.useState([] as OptionService[]);
  const [data, setData] = React.useState([] as ReturnType<typeof getMenuOptions>);
  const [isLocalSearch, setIsLocalSearch] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const refs = React.useRef({ serviceCallTimeout: undefined as NodeJS.Timeout | undefined});
  const [rowHeight, setRowHeight] = React.useState(DEFAULT_ROW_HEIGHT);
  const [listHeight, setListHeight] = React.useState(DEFAULT_LIST_HEIGHT);

  React.useEffect(() => {
    search();
  }, [query]);

  React.useEffect(() => {
    search(true);
  }, [queryStack, queryStack.length]);

  const search = (forceCallService: boolean = false) => {
    if (!queryStack.length) {
      setData(getMenuOptions());
    } else {
      if (!isLocalSearch || forceCallService) {
        if(refs.current.serviceCallTimeout) {
          clearTimeout(refs.current.serviceCallTimeout);
          refs.current.serviceCallTimeout = undefined;
        }
        refs.current.serviceCallTimeout = setTimeout(callService, DELAY);
      }
    }
  };

  const callService = async () => {
    const service = services.find(serv => serv.humanReadableId?.toLowerCase() === queryStack?.[0]?.humanReadableId?.toLowerCase());
    if (service) {
      setLoading(true);
      // console.log({ queryStack });
      const passedQueryStack: Option[] = [...queryStack, { humanReadableId: query || '', htmlToRender: query || '' }];
      const options = await service?.callback(passedQueryStack);
      options?.options && setData(options?.options);
      setIsLocalSearch(options?.enableLocalSearch || false);
      const newQueryStack = [...options.queryStack];
      if (options.queryStack.length - 1 !== queryStack.length || options.queryStack.slice(0, options.queryStack.length - 1).find((el, idx) => queryStack[idx]?.humanReadableId !== el?.humanReadableId)) {
        setQueryStack(newQueryStack);
      }
      setRowHeight(options.rowHeight || DEFAULT_ROW_HEIGHT);
      setListHeight(options.listHeight || DEFAULT_LIST_HEIGHT);
      setLoading(false);
    }
  };

  const getMenuOptions = (): Option[] => {
    return services.map(serv => ({
      // htmlToRender: serv.htmlToRender,
      // humanReadableId: serv.humanReadableId,
      // searchableText: serv.searchableText,
      ...serv
    }));
  };

  const registerOptionsServices = (args: OptionService[]) => {
    const newServices = [] as OptionService[];
    args.forEach(arg => {
      if (!arg.humanReadableId || !isLowerCase(arg.humanReadableId)) {
        throw new Error(`Improper keyword '${arg.humanReadableId}' Option Service!`);
      }
      if (services.findIndex(serv => serv.humanReadableId?.toLowerCase() === arg.humanReadableId?.toLowerCase()) > -1) {
        throw new Error(`Option Service for keyword ${arg.humanReadableId} is already registered!`);
      }
      newServices.push(arg)
    });
    setServices([...services, ...newServices]);
  };

  const unregisterOptionsServices = (queryWords: string[]) => {
    const newServices = [...services];
    queryWords.forEach(queryWord => {
      const idx = newServices.findIndex(serv => serv.humanReadableId?.toLowerCase() === queryWord?.toLowerCase());
      newServices.splice(idx, 1);
    });
    setServices(newServices);
  };

  const getFilteredOptions = () => {
    if (!isLocalSearch || !query || typeof query !== 'string') return data;
    return data.filter(option => option.searchableText?.toLowerCase().includes(query.toLowerCase()))
  };

  return {
    data: getFilteredOptions(),
    setQuery,
    queryStack,
    setQueryStack,
    registerOptionsServices,
    unregisterOptionsServices,
    loading,
    rowHeight,
    listHeight,
  };
};

export default useOptions;