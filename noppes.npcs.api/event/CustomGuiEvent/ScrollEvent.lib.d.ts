/// <reference no-default-lib="true"/>
/// <reference path="./CustomGuiEvent.lib.d.ts" />

interface ScrollEvent extends BlockEvent {
    doubleClick: boolean,
    scrollId: number,
    scrollIndex: number,
    selection: string[],
}