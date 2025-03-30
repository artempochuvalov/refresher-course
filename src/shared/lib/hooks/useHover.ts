import { useCallback, useState } from 'react';

type UseHoverResult = [boolean, { onMouseEnter: () => void, onMouseLeave: () => void }]
export function useHover(): UseHoverResult {
    const [isHovered, setIsHovered] = useState(false);

    const onMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);

    const onMouseLeave = useCallback(() => {
        setIsHovered(false);
    }, []);

    return [isHovered, { onMouseEnter, onMouseLeave }];
}
