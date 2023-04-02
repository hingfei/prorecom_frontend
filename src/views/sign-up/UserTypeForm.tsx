import MuiCard, { CardProps } from '@mui/material/Card'
import { styled, useTheme } from '@mui/material/styles'
import Link from 'next/link'
import { Box, Button, CardContent, Divider, Grid, GridProps, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import React, { useState } from 'react'
import { AccountTieOutline, OfficeBuildingOutline } from 'mdi-material-ui'
import ShowAlert from '../../@core/components/custom-snackbar'

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>

// Styled Grid component
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const StyledGrid = styled(Grid)<GridProps & { selected: boolean }>(({ theme, selected }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease-in-out, border-radius 0.2s ease-in-out',
  borderRadius: selected ? theme.shape.borderRadius : 'none',
  borderWidth: selected ? '1px' : '0px',
  borderStyle: 'solid',
  borderColor: selected ? theme.palette.primary.light : 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  }
}))

const UserTypeForm = ({
  onClick,
  selected,
  setSelected
}: {
  onClick?: (val: number) => void
  selected?: string
  setSelected?: SetStateFunction<'job_seeker' | 'company'>
}) => {
  const theme = useTheme()

  const [open, setOpen] = useState(false)
  const { setValue, getValues } = useFormContext()

  const onSelect = (val: 'job_seeker' | 'company') => {
    setSelected(val)
    setValue('user_type', val)
  }

  // const handleNextClick = () => {
  //   if (!selected) {
  //     setOpen(true)
  //
  //     return
  //   }
  //   onClick && onClick(2)
  // }
  //
  // const handleClose = () => {
  //   setOpen(false)
  // }

  const isFormFilled = () => {
    return getValues('user_type')
  }

  return (
    <>
      <Box sx={{ mb: 6 }}>
        <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
          Journey starts here 🚀
        </Typography>
        <Typography variant='body2'>Join now to seek for your dream projects!</Typography>
        <Typography variant='subtitle1' fontWeight={600} pt={6}>
          Select your role:
        </Typography>
      </Box>
      <Grid container>
        <StyledGrid item md xs={12} selected={selected === 'job_seeker'} onClick={() => onSelect('job_seeker')}>
          <CardContent>
            <AccountTieOutline sx={{ fontSize: '75px' }} />
            <Typography fontWeight={600}>Job Seeker</Typography>
          </CardContent>
        </StyledGrid>
        <Divider orientation='vertical' flexItem />
        <StyledGrid item md xs={12} selected={selected === 'company'} onClick={() => onSelect('company')}>
          <CardContent>
            <OfficeBuildingOutline sx={{ fontSize: '75px' }} />
            <Typography fontWeight={600}>Company</Typography>
          </CardContent>
        </StyledGrid>
      </Grid>
      <Button
        fullWidth
        size='large'
        variant='contained'
        sx={{ marginBottom: 7, marginTop: 5 }}
        onClick={() => onClick(2)}
        disabled={!isFormFilled()}
      >
        Next
      </Button>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Typography variant='body2' sx={{ marginRight: 2 }}>
          Already have an account?
        </Typography>
        <Typography variant='body2'>
          <Link passHref href='/login'>
            <LinkStyled>Sign in instead</LinkStyled>
          </Link>
        </Typography>
      </Box>
      {/*<ShowAlert*/}
      {/*  open={open}*/}
      {/*  onClose={handleClose}*/}
      {/*  message={'Please select a role before proceeding'}*/}
      {/*  alertType={'error'}*/}
      {/*/>*/}
    </>
  )
}

export default UserTypeForm
