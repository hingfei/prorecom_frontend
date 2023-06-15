import React from 'react'
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { setDrawerState, useAppDispatch } from '../../../store'
import { SkillType } from '../../../graphql/api'
import { RhombusMedium } from 'mdi-material-ui'
import { DrawerType } from '../../../constants'

const SkillSection = ({
  skills,
  seekerId,
  viewOnly
}: {
  skills: Array<SkillType> | undefined
  seekerId: string | undefined
  viewOnly: boolean
}) => {
  const dispatch = useAppDispatch()

  return (
    <Box mb={5}>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={3}>
        <Typography variant={'h5'} fontWeight={700}>
          Skill
        </Typography>
        {!viewOnly && (
          <Button
            variant={'contained'}
            onClick={() =>
              dispatch(
                setDrawerState({
                  isOpen: true,
                  type: DrawerType.editSkillForm,
                  content: seekerId
                })
              )
            }
          >
            Edit
          </Button>
        )}
      </Box>
      {skills && skills.length > 0 ? (
        <List>
          {skills.map(skill => {
            return (
              <ListItem key={skill.skillId}>
                <ListItemIcon>
                  <RhombusMedium />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant={'body1'} fontWeight={500}>
                      {skill.skillName}
                    </Typography>
                  }
                />
              </ListItem>
            )
          })}
        </List>
      ) : (
        <Typography variant={'body2'}>No information is provided</Typography>
      )}
    </Box>
  )
}

export default SkillSection
