import { analyzeElfTasks } from "$lib/day/5/analytics-service";
import type { Task } from "$lib/models";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";


export const GET: RequestHandler = async ({ fetch }) => {

    const URL = 'https://advent.sveltesociety.dev/data/2023/day-five.json';

    const res = await fetch(URL);
    const data: Task[] = await res.json();
    const analytics = analyzeElfTasks(data);
 

    return json(
        {
            tasks: data,
            lastUpdated: new Date().toISOString(),
            analytics
        }
    )
};