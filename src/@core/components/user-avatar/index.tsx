import { Box, Button, ButtonProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import { ImageEditOutline } from 'mdi-material-ui'
import Spinner from '../spinner'

// ** Custom Button component for image input
const ImageInputButton = (props: ButtonProps<'label'>) => {
  return <Button {...props} component='label' />
}

// ** Styling for the UserAvatar component
// This section includes styled components for the Avatar, ImageBackdrop, ImageSrc, and Image
// These styles create an overlay effect on the Avatar when hovered, and allow users to upload a profile picture.

// ** Styled component for the ImageButton
const ImageButton = styled(ImageInputButton)(({ theme }) => ({
  position: 'relative',
  height: '150px',
  [theme.breakpoints.down('sm')]: {
    width: '100% !important',
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

// ** Styled component for the ImageSrc (displaying the profile picture)
const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center'
})

// ** Styled component for the ImageBackdrop (overlay effect)
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

// ** Styled component for the Image (overlay logo)
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

// ** UserAvatar component
// This component renders an Avatar with the user's profile picture or a default avatar.
// If in view-only mode, it displays the Avatar without any upload functionality.
// If not in view-only mode, it allows users to upload their profile picture by clicking the Avatar and selecting an image.
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
