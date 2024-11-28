export class HandleMessageEvent {
    constructor(
        public readonly  recipient: string,
        public readonly  message: string
    ){}
}