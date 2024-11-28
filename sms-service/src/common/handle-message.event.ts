export class HandleMessageEvent {
    constructor(
      public readonly message: string,
      public readonly recipient: string,
    ) {}
  }