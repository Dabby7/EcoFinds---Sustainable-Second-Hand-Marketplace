// Currency conversion utility

// Current USD to INR conversion rate (as of implementation)
// This would ideally come from an API in a production environment
const USD_TO_INR_RATE = 83.5;

/**
 * Converts USD amount to INR
 * @param usdAmount - Amount in USD
 * @returns Amount in INR
 */
export const convertUSDtoINR = (usdAmount: number): number => {
  return usdAmount * USD_TO_INR_RATE;
};

/**
 * Formats a price in INR with the ₹ symbol and proper formatting
 * @param amount - Amount in INR
 * @returns Formatted INR price string
 */
export const formatINR = (amount: number): string => {
  return `₹${amount.toFixed(2)}`;
};

/**
 * Formats a price in USD with the $ symbol
 * @param amount - Amount in USD
 * @returns Formatted USD price string
 */
export const formatUSD = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};