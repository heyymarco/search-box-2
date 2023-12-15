/// <reference types="react" />
import { GroupProps } from '@reusable-ui/components';
import type { SearchBoxSubmitEventHandler } from './types';
export interface SearchBoxProps extends Omit<GroupProps, 'onSubmit'> {
    options?: string[];
    defaultOption?: string;
    onSubmit?: SearchBoxSubmitEventHandler;
}
export declare const SearchBox: (props: SearchBoxProps) => JSX.Element | null;
