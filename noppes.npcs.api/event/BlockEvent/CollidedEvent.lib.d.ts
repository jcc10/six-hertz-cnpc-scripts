/// <reference no-default-lib="true"/>
/// <reference path="./BlockEvent.lib.d.ts" />
/// <reference path="../../entity/Entity.lib.d.ts" />

declare interface CollidedEvent extends BlockEvent {
    entity: Entity
}