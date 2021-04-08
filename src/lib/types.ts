import { FormComponentProps } from 'antd/lib/form';
import { ReactChild, ReactChildren, ReactHTML } from 'react';
import useModel from './model';
import {
  stylesQuicklyLauncher,
  stylesQuicklyModal,
  stylesQuicklySearchBox,
  stylesQuicklyContent,
  stylesQuicklyIndex,
  stylesQuicklyProvider,
  stylesQuicklyList,
  stylesQuicklyBreadcrumb,
} from './styles';

interface StylesProps<T> {
  classes: {
    [X in keyof T]: string;
  };
  theme: Record<string, string>;
}

export type Model = ReturnType<typeof useModel>;

export interface QuicklyIndexProps extends StylesProps<ReturnType<typeof stylesQuicklyIndex>> {}

export interface QuicklyLauncherProps
  extends StylesProps<ReturnType<typeof stylesQuicklyLauncher>> {
  style?: React.CSSProperties;
}

export interface QuicklySearchBoxProps
  extends StylesProps<ReturnType<typeof stylesQuicklySearchBox>> {}

export interface QuicklyBreadcrumbProps
  extends StylesProps<ReturnType<typeof stylesQuicklyBreadcrumb>> {}

export interface QuicklyListProps
  extends StylesProps<ReturnType<typeof stylesQuicklyList>> {}

export interface QuicklyModalProps extends StylesProps<ReturnType<typeof stylesQuicklyModal>> {}

export interface QuicklyContentProps extends StylesProps<ReturnType<typeof stylesQuicklyContent>> {}

export interface QuicklyProviderProps
  extends StylesProps<ReturnType<typeof stylesQuicklyProvider>>,
    FormComponentProps<any> {
  children?: ReactChild | ReactChildren;
  hotkey?: string;

  dashboards: any;
  sidebarSectionsToShow: any;
  partsToShow: any;
  type : any;
  permissionsModule: any;
}

export interface Option {
  humanReadableId: string;
  searchableText?: string;
  htmlToRender: string;
  // hasChildren?: boolean;
  extraData?: any;
}

export interface OptionService extends Option {
  callback: (queryStack: Option[]) => Promise<{
    queryStack: Option[];
    options: Option[];
    enableLocalSearch?: boolean; // We will search locally using 'text' prop.
    rowHeight?: number;
    listHeight?: number;
  }>
}
