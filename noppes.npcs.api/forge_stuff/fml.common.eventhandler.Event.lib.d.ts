/// <reference no-default-lib="true"/>
/// <reference path="../java_stuff/java.lang.Object.lib.d.ts" />

interface ForgeEvent extends JavaObject {
    // The following is from FLM events
    getListenerList(): unknown,
    getPhase(): unknown,
    getResult(): unknown,
    hasResult(): boolean,
    isCancelable(): boolean,
    isCanceled(): boolean,
    setCanceled(cancel: boolean): void,
    setPhase(value: unknown): void,
    setResult(value: unknown): unknown,
}