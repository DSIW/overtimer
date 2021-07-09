import Dexie from 'dexie';
import TimeLog from '../domain/TimeLog';

export default class IndexDb extends Dexie {
    timeLogs: Dexie.Table<TimeLog, Date>;

    constructor () {
        super("OvertimerDatabase");
        this.version(1).stores({
            timeLogs: '&startTime,endTime',
        });
        this.timeLogs = this.table("timeLogs");
    }
}
