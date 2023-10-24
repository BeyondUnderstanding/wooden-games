/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';

export const useMergeState = <A>(
    init: A
): [A, (chenge: Partial<A>) => void] => {
    const [state, setStete] = useState(init);
    const setChenges = (chenge: Partial<A>) => {
        setStete((a) => ({
            ...a,
            ...chenge,
        }));
    };
    return [state, setChenges];
};
