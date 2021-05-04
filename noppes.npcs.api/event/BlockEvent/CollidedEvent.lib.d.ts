/// <reference no-default-lib="true"/>
/// <reference path="./BlockEvent.lib.d.ts" />
/// <reference path="../../entity/Entity.lib.d.ts" />

interface CollidedEvent extends BlockEvent {
    entity: Entity
}