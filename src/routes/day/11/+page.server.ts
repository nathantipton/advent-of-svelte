import { findBestMatchingElfName } from "$lib/day/11/elf-name-generator";
import type { ElfNamesDTO } from "$lib/models";
import type { Actions } from "./$types";

const ELF_NAMES_URL = 'https://advent.sveltesociety.dev/data/2023/day-eleven.json';

export const actions: Actions = {
    'generate': async ({ request, fetch }) => {
        const formData = await request.formData();
        const name = formData.get('name');

        const elfNames: ElfNamesDTO = await fetch(ELF_NAMES_URL).then(r => r.json());

        const userElfName = findBestMatchingElfName(name as string, elfNames);

        return {
            elfName: userElfName
        };
    }
}

