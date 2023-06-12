import { eduLevelSelect } from "../../constants";

export const convertEducLevel = (level: number | undefined | null) => {
  const result = eduLevelSelect.find(item => item.value === level)
  if (result) {
    return result.label
  }

  return '-'
}
