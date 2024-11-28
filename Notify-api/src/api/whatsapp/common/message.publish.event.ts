export class PublishMessageEvent {
  constructor(
    private recipient: string,
    private message: string,
  ) {}

  toString() {
    return JSON.stringify({
      recipient: this.recipient,
      message: this.message,
    });
  }
}
