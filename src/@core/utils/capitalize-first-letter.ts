export const capitalizeFirstLetter = (str: string | null | undefined) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
