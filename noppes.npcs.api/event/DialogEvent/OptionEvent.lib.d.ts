/// <reference no-default-lib="true"/>
/// <reference path="./DialogEvent.lib.d.ts" />
/// <reference path="../../handler/data/DialogOption.lib.d.ts" />

declare interface OptionEvent extends DialogEvent {
    option: DialogOption
}