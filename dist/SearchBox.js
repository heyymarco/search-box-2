'use client';
// react:
import { 
// react:
default as React, 
// hooks:
useState, useRef, useEffect, } from 'react';
// reusable-ui core:
import { 
// react helper hooks:
useEvent, 
// an accessibility management system:
AccessibilityProvider, 
// basic variants of UI:
useBasicVariantProps, } from '@reusable-ui/core'; // a set of reusable-ui packages which are responsible for building any component
// reusable-ui components:
import { 
// simple-components:
ButtonIcon, Input, 
// layout-components:
ListItem, 
// menu-components:
DropdownListButton, Group, } from '@reusable-ui/components'; // a set of official Reusable-UI components
// handlers:
const handleCancelFormSubmit = (event) => {
    event.preventDefault();
};
export const SearchBox = (props) => {
    // rest props:
    const { 
    // configs:
    options = [], defaultOption = '', 
    // handlers:
    onSubmit, ...restGroupProps } = props;
    // basic variant props:
    const basicVariantProps = useBasicVariantProps(props);
    // states:
    const [isBusy, setIsBusy] = useState(false);
    const [search, setSearch] = useState('');
    const [option, setOption] = useState(defaultOption);
    // handlers:
    const handleSearch = useEvent(async () => {
        setIsBusy(true);
        try {
            await onSubmit?.({
                search,
                option,
            });
        }
        finally {
            setIsBusy(false);
        } // try
    });
    // effects:
    // restore focus after search completed:
    const inputRef = useRef(null);
    useEffect(() => {
        // conditions:
        if (isBusy)
            return; // ignore if busy
        // actions:
        inputRef.current?.focus();
    }, [isBusy]);
    // jsx:
    return (React.createElement(AccessibilityProvider
    // states:
    , { 
        // states:
        enabled: !isBusy },
        React.createElement(Group
        // other props:
        , { ...restGroupProps, 
            // semantics:
            tag: 'form', 
            // handlers:
            onSubmit: handleCancelFormSubmit },
            React.createElement(Input
            // refs:
            , { 
                // refs:
                elmRef: inputRef, 
                // classes:
                className: 'fluid', 
                // values:
                value: search, onChange: ({ target: { value } }) => setSearch(value), 
                // formats:
                type: 'search' }),
            React.createElement(ButtonIcon
            // appearances:
            , { 
                // appearances:
                icon: 'search', 
                // classes:
                className: 'solid', 
                // behaviors:
                type: 'submit', 
                // handlers:
                onClick: handleSearch }, "Search"),
            !!options.length && React.createElement(DropdownListButton
            // variants:
            , { ...basicVariantProps, 
                // classes:
                className: 'solid', 
                // floatable:
                floatingPlacement: 'bottom-end' }, options.map((opt, index) => React.createElement(ListItem
            // identifiers:
            , { 
                // identifiers:
                key: index, 
                // states:
                active: option === opt, 
                // handlers:
                onClick: () => setOption(opt) }, opt))))));
};
