class Mediator {
    constructor() {
        this.subscribers = {};
    }
    subscribe(eventType, callback) {
        if (!this.subscribers[eventType]) {
            this.subscribers[eventType] = [];
        }
        this.subscribers[eventType].push(callback);
    }
    unsubscribe(eventType, callback) {
        if (!this.subscribers[eventType]) {
            return;
        }
        this.subscribers[eventType] = this.subscribers[eventType].filter(
            (callbacks) => {
                return callbacks !== callback;
            }
        );
    }

    emit(eventType, args) {
        if (this.subscribers[eventType]) {
            this.subscribers[eventType].forEach((fn) => fn(args));
        }
    }
}

const mediator = new Mediator();
export default mediator;
