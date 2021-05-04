/// <reference no-default-lib="true"/>
/// <reference path="./BlockEvent.lib.d.ts" />

interface EntityFallenUponEvent extends BlockEvent {
    distanceFallen: number,
    entity: Entity
}