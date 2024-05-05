export const logger = {
    info: (message: string) => {
        console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
    },
    error: (error: Error | string) => {
        console.error(`[ERROR] ${new Date().toISOString()} - ${error instanceof Error ? error.message : error}`);
    },
};
