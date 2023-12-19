export class MorseCodeTranslator {

    constructor() {
        this.charToMorse = this.charToMorse.bind(this);
        this.morseToChar = this.morseToChar.bind(this);
    }

    private readonly morseChars: { [key: string]: string } = {
        a: ".-",
        b: "-...",
        c: "-.-.",
        d: "-..",
        e: ".",
        f: "..-.",
        g: "--.",
        h: "....",
        i: "..",
        j: ".---",
        k: "-.-",
        l: ".-..",
        m: "--",
        n: "-.",
        o: "---",
        p: ".--.",
        q: "--.-",
        r: ".-.",
        s: "...",
        t: "-",
        u: "..-",
        v: "...-",
        w: ".--",
        x: "-..-",
        y: "-.--",
        z: "--..",
        1: ".----",
        2: "..---",
        3: "...--",
        4: "....-",
        5: ".....",
        6: "-....",
        7: "--...",
        8: "---..",
        9: "----.",
        0: "-----",
        " ": "/"
    };

    private charToMorse(char: string): string {

        const lowerChar = char.toLowerCase();
        const morseChar = this.morseChars[lowerChar];

        return morseChar ? morseChar : "";
    }

    private morseToChar(morse: string): string {

        const char = Object.keys(this.morseChars).find(key => this.morseChars[key] === morse);

        return char ? char : "";
    }

    public textToMorse(text: string): string {

        const morse = text.toLowerCase().split("").map(this.charToMorse).join(" ");

        return morse;
    }

    public morseToText(morse: string): string {

        const text = morse.split(" ").map(this.morseToChar).join("");

        return text;
    }
}
