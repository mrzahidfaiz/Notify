export class createMessageEvent {
  constructor(
    public readonly recipient: string,
    public readonly message: string,
  ) {}

  toString() {
    return JSON.stringify({
      recipient: this.recipient,
      message: this.message,
    });
  }
}
