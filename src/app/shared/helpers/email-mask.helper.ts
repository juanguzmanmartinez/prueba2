export function emailMasking(email) {
    return email.replace(/^(...)(.*)(@.*)$/,
        (_, a, b, c) => a + b.replace(/./g, '*') + c);
}
