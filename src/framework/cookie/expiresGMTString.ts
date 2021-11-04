export function expiresGMTString(afterMilli: number) {
    if (afterMilli === null || afterMilli === undefined) return afterMilli;
    return (new Date(Date.now() + afterMilli)).toUTCString();
}