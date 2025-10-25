import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatActor(name: string) {
  if (name == "teacher_agent") return "Mini Wave Teacher";
  else "Agent";
}

/**
 * Formats an ISO time string into a "time ago" format.
 * @param timeString The ISO 8601 timestamp (e.g., "2025-10-25T12:30:44.488876")
 */
export function formatTime(timeString: string): string {
  const time = new Date(timeString);
  const now = new Date();

  // Get the difference in seconds
  const seconds = Math.floor((now.getTime() - time.getTime()) / 1000);

  // Less than 5 seconds
  if (seconds < 5) {
    return "just now";
  }

  // Less than 1 minute
  if (seconds < 60) {
    return `${seconds} seconds ago`;
  }

  // Less than 1 hour
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }

  // Less than 1 day
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  // Less than 1 month
  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  // Less than 1 year
  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }

  // Years
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}
