/**
 * Function to get form input values by removing any null, undefined, or empty string properties from the input object.
 * If a property is an object with a 'value' field (commonly used in form libraries like MUI TextField), the 'value' field is extracted as the property value.
 *
 * @param {Object} allValues - The input object containing form values.
 * @returns {Object} A new object with cleaned form input values.
 */
export const getFormInputValues = (allValues: any): any => {
  const clonedValues = { ...allValues }

  for (var value in allValues) {
    // Check if the property value is null, undefined, or an empty string, and delete it from the cloned object.
    if (clonedValues[value] === null || clonedValues[value] === undefined || clonedValues[value] === '') {
      delete clonedValues[value]
    }

    // Check if the property value is an object and has a 'value' field
    // If so, extract the 'value' field as the new property value in the cloned object.
    if (typeof clonedValues[value] === 'object' && clonedValues[value]?.value) {
      clonedValues[value] = clonedValues[value]?.value
    }
  }

  return clonedValues
}
