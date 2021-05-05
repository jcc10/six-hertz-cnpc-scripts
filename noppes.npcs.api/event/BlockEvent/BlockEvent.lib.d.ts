/// <reference no-default-lib="true"/>
/// <reference path="../CustomNPCsEvent.lib.d.ts" />
/// <reference path="../../block/Block.lib.d.ts" />

declare interface BlockEvent extends CustomNPCsEvent {
    block: Block,
}