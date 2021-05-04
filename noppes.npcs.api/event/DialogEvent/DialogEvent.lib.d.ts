/// <reference no-default-lib="true"/>
/// <reference path="../NpcEvent/NpcEvent.lib.d.ts" />
/// <reference path="../../handler/data/Dialog.lib.d.ts" />
/// <reference path="../../entity/Player.lib.d.ts" />

interface DialogEvent extends NpcEvent {
    dialog: Dialog,
    player: Player
}