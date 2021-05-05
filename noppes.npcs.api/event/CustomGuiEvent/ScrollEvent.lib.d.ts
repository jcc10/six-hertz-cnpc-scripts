/// <reference no-default-lib="true"/>
/// <reference path="./CustomGuiEvent.lib.d.ts" />

declare interface ScrollEvent extends CustomGuiEvent {
    doubleClick: boolean,
    scrollId: number,
    scrollIndex: number,
    selection: string[],
}