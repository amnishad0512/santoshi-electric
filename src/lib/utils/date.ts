/**
 * Formats a date string to DD-MM-YYYY format
 * @param dateString - The date string to format
 * @returns Formatted date string in DD-MM-YYYY format
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } catch (error) {
    return 'Invalid Date';
  }
};

/**
 * Formats a date string to a more readable format
 * @param dateString - The date string to format
 * @returns Formatted date string in a readable format
 */
export const formatDateReadable = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    return 'Invalid Date';
  }
};

/**
 * Formats a date string to include time
 * @param dateString - The date string to format
 * @returns Formatted date string with time
 */
export const formatDateTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  } catch (error) {
    return 'Invalid Date';
  }
}; 