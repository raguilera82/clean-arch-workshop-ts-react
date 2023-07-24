export class BaseBloc<T> {
  private subscribers: ((state: T) => void)[] = [];
  protected state: T = {} as T;
  private persistKey: string;

  constructor(persistKey: string) {
    this.persistKey = persistKey;
    this.loadPersistedState();

    window.addEventListener("beforeunload", () => {
      this.savePersistedState();
    });
  }

  private loadPersistedState() {
    const persistedState = localStorage.getItem(this.persistKey);
    if (persistedState) {
      this.state = JSON.parse(persistedState) as T;
      localStorage.removeItem(this.persistKey);
    }
  }

  private savePersistedState() {
    localStorage.setItem(this.persistKey, JSON.stringify(this.state));
  }

  subscribe(callback: (state: T) => void) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback: (state: T) => void) {
    const index = this.subscribers.indexOf(callback);
    if (index !== -1) {
      this.subscribers.splice(index, 1);
    }
  }

  protected notifySubscribers() {
    this.subscribers.forEach((callback) => {
      callback(this.state);
    });
  }

  setState(newState: Partial<T>) {
    this.state = { ...this.state, ...newState };
    this.notifySubscribers();
  }

  getState(): T {
    return this.state;
  }
}
