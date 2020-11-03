import IEvent from "./event";

export default class OvertimeEvent implements IEvent {
    important = true
    event = 'OVERTIME'
}