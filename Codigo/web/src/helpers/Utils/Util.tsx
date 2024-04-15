
interface CommandInterface {
    key: string;
    modifier: string
}



export function isKeyPressed(event: KeyboardEvent, commands: CommandInterface[]) {

    return commands.some(command => {
        const { key, modifier } = command;
        if (modifier) {
            return modifier && event.key === key;
        } else {
            return event.key === key;
        }
        
    })
}