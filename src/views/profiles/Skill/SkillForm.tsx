import { Box, Button, ButtonProps, Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { closeDrawerState, useAppDispatch, useAppSelector } from '../../../store'
import { SelectInput } from '../../../@core/components/custom-inputs'
import { genderSelect } from '../../../constants'
import { SkillType, useSkillListingQuery } from '../../../graphql/api'
import { useEffect, useState } from 'react'
import DropdownSkeleton from '../../../@core/components/skeleton/DropdownSkeleton'

const SkillForm = ({ isEdit, ...props }: ButtonProps & { isEdit?: boolean }) => {
  const [skillList, setSkillList] = useState<Array<SkillType>>([])
  const dispatch = useAppDispatch()
  const { isOpen } = useAppSelector(state => state.drawer)
  const { control, getValues } = useFormContext()

  const onCancel = () => {
    dispatch(closeDrawerState())
  }

  const { data, loading } = useSkillListingQuery({
    fetchPolicy: 'no-cache'
  })

  useEffect(() => {
    const skills = getValues('skills')
    if (skills) {
      setSkillList(skills)
    }
  }, [isOpen])

  return (
    <>
      {loading ? (
        <DropdownSkeleton />
      ) : skillList ? (
        skillList.map((skill, index) => (
          <Grid item mt={6} mb={2} key={index} display={'flex'} columnGap={4}>
            <SelectInput
              controllerProps={{
                control,
                name: `skills[${index}].value`
              }}
              selectProps={{ label: `Skill ${index + 1}` }}
              selectData={data?.skillListing?.map(item => ({
                label: item?.skillName,
                value: item?.skillId
              }))}
              onChangeCallback={newValue => {
                console.log(newValue)
                setSkillList(prevState => {
                  const newState = [...prevState]
                  newState[index].skillName = newValue.value

                  return newState
                })
              }}
            />
            <Button
              variant='contained'
              size='small'
              onClick={() => setSkillList(prevState => [...prevState.slice(0, index), ...prevState.slice(index + 1)])}
            >
              Remove
            </Button>
          </Grid>
        ))
      ) : (
        ''
      )}

      <Box display='flex' justifyContent='center' py={10}>
        <Button
          variant='contained'
          sx={{
            mr: 2
          }}
          {...props}
        >
          {isEdit ? 'Save' : 'Add'}
        </Button>
        <Button onClick={onCancel} color='secondary' variant='outlined'>
          Cancel
        </Button>
      </Box>
    </>
  )
}

export default SkillForm
