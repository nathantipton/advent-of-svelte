import { EMPTY_ELF_ANALYTICS, type Aggregations, type ElfAnalytics, type ElfKpis, type Leaderboard, type Task } from "$lib/models";

export const analyzeElfTasks = (tasks: Task[]): ElfAnalytics => {
    const dashboardModel = EMPTY_ELF_ANALYTICS;

    dashboardModel.aggregations = getAggregations(tasks);
    dashboardModel.elfKpis = getElfKpis(tasks);
    dashboardModel.fastestCreatedToyLeaderboard = getLeaderboard(dashboardModel.elfKpis, "averageMinutesPerToy", { precision: 2, direction: "asc" });
    dashboardModel.fastestWrappedPresentLeaderboard = getLeaderboard(dashboardModel.elfKpis, "averageMinutesPerPresent", { precision: 2, direction: "asc" });
    dashboardModel.mostCreatedToysLeaderboard = getLeaderboard(dashboardModel.elfKpis, "totalCreatedToys", { direction: "desc" });
    dashboardModel.mostWrappedPresentsLeaderboard = getLeaderboard(dashboardModel.elfKpis, "totalWrappedPresents", { direction: "desc" });

    return dashboardModel;
};


const getAggregations = (tasks: Task[]): Aggregations => {

    const createdToyTasks = tasks.filter(task => task.task === "CREATED_TOY");
    const wrappedPresentTasks = tasks.filter(task => task.task === "WRAPPED_PRESENT");

    const totalTasks = tasks.length;
    const totalMinutes = tasks.reduce((acc, task) => acc + task.minutesTaken, 0);
    const totalCreatedToys = createdToyTasks.length;
    const totalWrappedPresents = wrappedPresentTasks.length;
    const averageMinutesPerToy = totalCreatedToys > 0 ? totalMinutes / totalCreatedToys : 0;
    const averageMinutesPerPresent = totalWrappedPresents > 0 ? totalMinutes / totalWrappedPresents : 0;
    const averageMinutesPerTask = totalTasks > 0 ? totalMinutes / totalTasks : 0;

    return {
        totalTasks,
        totalMinutes,
        totalCreatedToys,
        totalWrappedPresents,
        averageMinutesPerToy,
        averageMinutesPerPresent,
        averageMinutesPerTask
    };
}

const getElfKpis = (tasks: Task[]): ElfKpis => {

    const elfs = tasks.map(task => task.elf);
    const uniqueElfs = [...new Set(elfs)];
    const elfKpis: { [key: string]: Aggregations } = {}

    uniqueElfs.forEach(elf => {
        const elfTasks = tasks.filter(task => task.elf === elf);
        elfKpis[elf] = getAggregations(elfTasks);
    });

    return elfKpis;
}

const getLeaderboard = (elfKpis: ElfKpis, property: keyof (Aggregations), options?: { precision?: number | null, direction?: 'asc' | 'desc', limit?: number }): Leaderboard => {
    const { precision, direction, limit } = {
        direction: 'desc',
        limit: 10,
        precision: null,
        ...options
    }

    const leaderboard: Leaderboard = [];

    Object.keys(elfKpis).forEach(elf => {
        const elfKpi = elfKpis[elf];
        leaderboard.push({ elf, value: (elfKpi[property]) });
    });

    if (precision) {
        leaderboard.forEach(entry => {
            entry.value = Number(entry.value.toFixed(precision));
        });
    }

    leaderboard.sort((a, b) => direction === 'asc' ? a.value - b.value : b.value - a.value);

    return leaderboard.slice(0, limit);
}
