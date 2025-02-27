
/**
 * Formats a distance in kilometers to a human-readable string.
 */
export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }
  return `${Math.round(distance)} km`;
}

/**
 * Formats a price to a human-readable string with the given currency.
 */
export function formatPrice(price: number, currency: string = '€'): string {
  return `${price} ${currency}`;
}

/**
 * Formats a date to a human-readable string.
 */
export function formatDate(date: string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Formats a time to a human-readable string.
 */
export function formatTime(time: string): string {
  return time;
}
