/**
 * Get data from local storage by its name
 * @param {string} itemName
 */
export const load = (itemName) => {
  try {
    const serializedData = localStorage.getItem(itemName);
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (err) {
    return undefined;
  }
};

/**
 * Saves data to local storage by given name
 * @param {string} itemName
 * @param {Object} state
 */
export const save = (itemName, state) => {
  try {
    const serializedData = JSON.stringify(state);
    localStorage.setItem(itemName, serializedData);
  } catch (err) {
    // Ignore write errors.
  }
};
