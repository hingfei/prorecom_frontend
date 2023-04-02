export const getFormInputValues = (allValues: any) => {
  const clonedValues = { ...allValues };
  for (var value in allValues) {
    if (clonedValues[value] === null || clonedValues[value] === undefined || clonedValues[value] === '') {
      delete clonedValues[value];
    }

    if (typeof clonedValues[value] === 'object' && clonedValues[value]?.value) {
      clonedValues[value] = clonedValues[value]?.value;
    }
  }

  return clonedValues;
};
