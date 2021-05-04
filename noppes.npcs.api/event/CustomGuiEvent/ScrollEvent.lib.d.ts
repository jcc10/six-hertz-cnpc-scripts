/// <reference no-default-lib="true"/>
/// <reference path="./CustomGuiEvent.lib.d.ts" />

interface ScrollEvent extends CustomGuiEvent {
    doubleClick: boolean,
    scrollId: number,
    scrollIndex: number,
    selection: string[],
}