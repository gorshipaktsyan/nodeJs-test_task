import EventEmitter from 'event-emitter';
import _ from 'lodash';

export default class Storage {
    
    constructor() {
        this.ee = new EventEmitter;
        this.data = {};
    }
    
    subscribe(event, handler) {
        this.ee.on(event, handler);
    }
    
    unSubscribe(event, handler) {
        this.ee.off(event, handler);
    }
    
    set(property, value) {
        _.set(this.data, property, value);
        this.ee.emit('change', { property, value });
        this.ee.emit('change-' + property, { property, value });
    }
    
    get(property) {
        return _.get(this.data, property);
    }
    
}