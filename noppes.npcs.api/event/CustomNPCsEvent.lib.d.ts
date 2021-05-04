/// <reference no-default-lib="true"/>

interface CustomNPCsEvent {
    readonly API: unknown,
    // The following is from FLM events
    getListenerList(): unknown,
    getPhase(): unknown,
    getResult(): unknown,
    hasResult(): boolean,
    isCancelable(): boolean,
    isCanceled(): boolean,
    setCanceled(canceled: boolean): void,
    setPhase(): unknown,
    setResult(): unknown,
    // The following is from Java
    equals(): unknown,
    getClass(): unknown,
    hashCode(): unknown,
    notify(): unknown,
    notifyAll(): unknown,
    toString(): unknown,
    wait(): unknown,
    wait(): unknown,
    wait(): unknown
}