interface CommandInterface {
  key: string;
  modifier: string;
}

export function isKeyPressed(
  event: KeyboardEvent,
  commands: CommandInterface[]
) {
  return commands.some((command) => {
    const { key, modifier } = command;
    if (modifier) {
      return modifier && event.key === key;
    } else {
      return event.key === key;
    }
  });
}

export function getInitials(name: string): string {
  const nameArray: string[] = name.split(" ");
  let initials: string = "";

  for (let i = 0; i < nameArray.length && i < 2; i++) {
    if (nameArray[i]) {
      initials += nameArray[i].charAt(0).toUpperCase();
    }
  }

  return initials;
}

console.log('getInitials("Lara Lima")', getInitials("Lara Lima"));
