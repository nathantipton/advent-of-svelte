type MorseCodePlayerListener = (isPlaying: boolean) => void;

export class MorseCodePlayer {
    private audioContext: AudioContext | null = null;
    private dotLength: number; // Length of a dot in milliseconds
    private timeouts: number[] = [];
    private listeners: MorseCodePlayerListener[] = [];
    private isPlaying: boolean = false;

    constructor(dotLength = 200) {
        this.dotLength = dotLength; // Adjust this for speed
    }

    private initAudioContext(): void {
        if (!this.audioContext) {
            this.audioContext = new AudioContext();
        }
    }

    // Method to add a listener
    public onStateChange(listener: MorseCodePlayerListener): void {
        this.listeners.push(listener);
    }

    // Method to notify all listeners
    private notifyStateChange(isPlaying: boolean): void {
        this.listeners.forEach(listener => listener(isPlaying));
    }


    public play(morseCode: string): void {
        this.initAudioContext();
        if (!this.audioContext) return;

        this.isPlaying = true;
        this.notifyStateChange(this.isPlaying);
        let timeOffset = 0; // Time offset for the next tone

        for (const [index, symbol] of morseCode.split('').entries()) {
            const timeoutId = setTimeout(() => {
                this.playTone(symbol);
            }, timeOffset);

            this.timeouts.push(timeoutId);

            switch (symbol) {
                case '.':
                    timeOffset += this.dotLength;
                    break;
                case '-':
                    timeOffset += 3 * this.dotLength;
                    break;
                case ' ':
                    timeOffset += 3 * this.dotLength; // Pause between letters
                    break;
                case '/':
                    timeOffset += 7 * this.dotLength; // Pause between words
                    break;
                default:
                    timeOffset += this.dotLength; // Pause between symbols
                    break;
            }

            // Add an additional pause after each symbol
            timeOffset += this.dotLength;

            if (index === morseCode.length - 1) {
                this.timeouts.push(setTimeout(() => {
                    this.isPlaying = false;
                    this.notifyStateChange(this.isPlaying);
                }, timeOffset));
            }
        }
    }

    public stop(): void {
        this.timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
        this.timeouts = []; // Clear the array of timeout IDs
        this.isPlaying = false;
        this.notifyStateChange(this.isPlaying);
    }

    private playTone(symbol: string): void {
        if (!this.audioContext) return;
        if (symbol === '.' || symbol === '-') {
            const oscillator = this.audioContext.createOscillator();
            oscillator.frequency.value = 440; // Standard A note
            oscillator.type = "sine"; // Smooth tone
            oscillator.connect(this.audioContext.destination);
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + (symbol === '.' ? this.dotLength : 3 * this.dotLength) / 1000);
        }
    }
}