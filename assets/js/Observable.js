
class Observable {
    constructor() {
        this.observers = [];
    }

    subscribe(ob) {
        this.observers.push(ob);
    }

    unsubscribe(ob) {
        this.observers = this.observers.filter(observer => observer !== ob);
    }

    notify(data) {
        console.log("Notify à tous les observers")
        this.observers.forEach((observer) => observer.update(data));
    }

}

export default Observable;