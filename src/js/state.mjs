// Shared state module for tracking the currently selected client ID
export let selectedClientId = null;

/**
 * Updates the currently selected client ID.
 * @param {string|null} id - The client ID to set, or null to clear selection
 */
export function setSelectedClientId(id) {
  selectedClientId = id;
}