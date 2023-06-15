import { Box, Button, ButtonProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import { ImageEditOutline } from 'mdi-material-ui'
import Spinner from '../spinner'

const ImageInputButton = (props: ButtonProps<'label'>) => {
  return <Button {...props} component='label' />
}

//start of styling for logo and overlay
const ImageButton = styled(ImageInputButton)(({ theme }) => ({
  position: 'relative',
  height: '150px',
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 120
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.4
    },
    '& .MuiImageMarked-root': {
      opacity: 0.8
    }
  }
}))

//styling for image/logo/profilepicture
const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center'
})

//styling for opacity effect
const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0,
  transition: theme.transitions.create('opacity')
}))

//styling for overlay logo (here the cameraIcon)
const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opactiy: 0,
  color: theme.palette.common.white
}))

const UserAvatar = ({
  viewOnly,
  userId,
  imageUrl,
  uploadProfilePic,
  loading
}: {
  viewOnly: boolean
  userId: any
  imageUrl: string
  uploadProfilePic: any
  loading: boolean
}) => {
  const onSubmit = (file: FileList | null) => {
    if (file == null) {
      return
    }
    uploadProfilePic({
      variables: {
        userId: parseInt(userId),
        profilePic: file[0]
      }
    })
  }

  return loading ? (
    <Spinner />
  ) : viewOnly ? (
    <Avatar
      alt='avatar'
      sx={{
        height: { xs: 120, sm: 150 },
        width: { xs: 120, sm: 150 }
      }}
    >
      <Box
        component='img'
        sx={{
          height: '100%',
          width: '100%',
          objectFit: 'cover'
        }}
        src={imageUrl ? `/images/profile-pics/${imageUrl}` : '/images/avatars/1.png'}
        alt='avatar'
      />
    </Avatar>
  ) : (
    <Avatar
      sx={{
        height: 'auto',
        width: { xs: 120, sm: 150 },
        backgroundColor: 'transparent'
      }}
    >
      <ImageButton
        focusRipple
        key={'random'}
        style={{
          width: '100%'
        }}
      >
        <ImageSrc
          style={{
            backgroundImage: `url(${imageUrl ? `/images/profile-pics/${imageUrl}` : '/images/avatars/1.png'})`
          }}
        />
        <ImageBackdrop className='MuiImageBackdrop-root' />
        <Image>
          <ImageEditOutline
            className='MuiImageMarked-root'
            fontSize='large'
            sx={{
              color: 'white',
              opacity: 0
            }}
          />
        </Image>
        <input type='file' accept='image/*' hidden onChange={e => onSubmit(e.target.files)} />
      </ImageButton>
    </Avatar>
  )
}

export default UserAvatar
