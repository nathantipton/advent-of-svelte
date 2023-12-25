import type { ElfNamesDTO } from "$lib/models";

export function findBestMatchingElfName(userName: string, elfNames: ElfNamesDTO): string {
    const userLetterCount = countLetters(userName);
    let bestFirstName = '';
    let bestLastName = '';
    let highestFirstNameScore = 0;
    let highestLastNameScore = 0;

    for (const firstName of elfNames.firstNames) {
        const score = scoreElfName(firstName, userLetterCount);
        if (score > highestFirstNameScore) {
            highestFirstNameScore = score;
            bestFirstName = firstName;
        }
    }

    for (const lastName of elfNames.lastNames) {
        const score = scoreElfName(lastName, userLetterCount);
        if (score > highestLastNameScore) {
            highestLastNameScore = score;
            bestLastName = lastName;
        }
    }

    return `${bestFirstName} ${bestLastName}`;
}


function countLetters(name: string): Map<string, number> {
    const letterCount = new Map<string, number>();
    for (const letter of name.toLowerCase()) {
        if (letter >= 'a' && letter <= 'z') {
            letterCount.set(letter, (letterCount.get(letter) || 0) + 1);
        }
    }
    return letterCount;
}

function scoreElfName(name: string, letterCount: Map<string, number>): number {
    let score = 0;
    for (const letter of name.toLowerCase()) {
        if (letterCount.has(letter)) {
            score += letterCount.get(letter) || 0;
        }
    }
    return score;
}