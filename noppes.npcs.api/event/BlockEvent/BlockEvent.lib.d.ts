/// <reference no-default-lib="true"/>
/// <reference path="../CustomNPCsEvent.lib.d.ts" />
/// <reference path="../../block/Block.lib.d.ts" />

interface BlockEvent extends CustomNPCsEvent {
    block: Block,
}