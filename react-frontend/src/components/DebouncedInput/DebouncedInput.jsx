import React, {
    Fragment,
    useCallback,
    useMemo,
    memo,
    cloneElement,
} from "react";

import debounce from "lodash.debounce";

const defaultWait = 750;

const DebouncedInput = ({
    onChange,
    wait = defaultWait,
    input,
    defaultValue,
}) => {
    const debouncedSearch = useMemo(
        () =>
            debounce((value) => {
                onChange(value);
            }, wait),
        [onChange, wait]
    );

    const handleChange = useCallback(
        (event) => {
            debouncedSearch(event.target.value);
        },
        [debouncedSearch]
    );

    // --> = <Input onChange={handleChange} />
    // use to modify the input element
    return (
        <Fragment>
            {cloneElement(input, {
                onChange: handleChange,
                defaultValue,
            })}
        </Fragment>
    );
};

export default memo(DebouncedInput);
