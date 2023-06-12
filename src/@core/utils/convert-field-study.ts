import { fieldStudySelect } from "../../constants";

export const convertFieldofStudy = (field: number | undefined | null) => {
  const result = fieldStudySelect.find(item => item.value === field)
  if (result) {
    return result.label
  }

  return '-'
}
