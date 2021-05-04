/// <reference no-default-lib="true"/>
/// <reference path="../CustomNPCsEvent.lib.d.ts" />
/// <reference path="../../gui/CustomGui.lib.d.ts" />
/// <reference path="../../entity/Player.lib.d.ts" />

interface CustomGuiEvent extends CustomNPCsEvent {
    gui: CustomGui,
    player: Player
}