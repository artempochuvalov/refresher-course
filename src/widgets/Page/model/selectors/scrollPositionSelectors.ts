import { createSelector } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';

export const getScrollPosition = (state: StateSchema) => state.scrollPosition.scrollPositions;
export const getScrollPositionByRoute = createSelector(
    getScrollPosition,
    (_: StateSchema, route: string) => route,
    (scrollPositions, route) => scrollPositions[route] ?? 0
);
