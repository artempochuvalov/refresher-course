export type ScrollPositionSchema = {
    scrollPositions: Record<string, number>,
};

export type SetScrollPositionPayload = {
    route: string,
    position: number,
};
