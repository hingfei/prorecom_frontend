import { Skeleton } from '@mui/material'

/**
 * Function to generate skeleton columns for a table based on the provided columns array.
 *
 * @param {Array} columns - The array of table columns.
 * @returns {Array} An array of skeleton columns with renderCell function that displays a Skeleton element.
 */
const generateSkeletonColumns = (columns: any) => {
  return columns.map((item: any) => {
    return {
      ...item,
      renderCell: () => {
        return <Skeleton width={'50%'} height={30} />
      }
    }
  })
}

export default generateSkeletonColumns
