import { writable } from 'svelte/store';

// Timer store for tracking elapsed time and streaming status
export const timer = writable({
    elapsedTime: 0,
    isStreaming: false
});

let intervalId: NodeJS.Timeout | null = null;

// Function to start the timer
export function startTimer() {
    if (!intervalId) {
        timer.update(t => {
            t.isStreaming = true;
            t.elapsedTime = 0; // Reset elapsed time
            return t;
        });

        intervalId = setInterval(() => {
            timer.update(t => {
                t.elapsedTime += 1; // Increment the elapsed time every second
                return t;
            });
        }, 1000); // Run every 1 second
    }
}

// Function to stop the timer
export function stopTimer() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        timer.update(t => {
            t.isStreaming = false; // Stop streaming
            return t;
        });
    }
}

// Optional: A function to reset the timer state if needed
export function resetTimer() {
    timer.update(t => {
        t.elapsedTime = 0; // Reset elapsed time
        t.isStreaming = false; // Stop streaming
        return t;
    });
}
