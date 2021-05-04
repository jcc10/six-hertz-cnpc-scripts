/// <reference no-default-lib="true"/>
/// <reference path="./DialogEvent.lib.d.ts" />
/// <reference path="../../handler/data/DialogOption.lib.d.ts" />

interface OptionEvent extends DialogEvent {
    option: DialogOption
}