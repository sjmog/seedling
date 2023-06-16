import React, { useState, useContext } from 'react'
import AppContext from 'contexts/AppContext'
import { Avatar, Label, Hint, Button } from 'components/shared'
import useCloudinaryWidget from 'hooks/useCloudinaryWidget'
import { put } from 'api'
import useFlash from 'hooks/useFlash'

const AvatarUploader = (props) => {
  const { apiUrl, formToken, currentUser } = useContext(AppContext)

  const [avatar, setAvatar] = useState(currentUser.avatar)

  const { showFlash } = useFlash()

  const onUpload = (error, result) => {
    if(error) {
      alert(error)
      return
    }

    if(result?.event === 'success') {
      const body = {
        user: {
          avatar: result.info.secure_url
        }
      }

      put(`${ apiUrl }/users/${currentUser.id}`, { formToken, body }, (user) => {
        setAvatar(user.avatar)
        showFlash('Avatar updated', 'Your avatar was successfully updated.', { type: 'success' })
      })
    }
  }

  const { showUploader } = useCloudinaryWidget(onUpload, {
    multiple: false,
    cropping: true,
    showSkipCropButton: false,
    croppingAspectRatio: 1,
    resourceType: 'image',
    maxFileSize: 2 * 1024 * 1024
  })

  return(
    <div className={`AvatarUploader ${props.className}`}>
      <Label className="mb-1 ml-1 sr-only">Avatar</Label>
      <div className="flex items-center">
        <input type="hidden" name="avatar" value={avatar} />
        <Avatar size="xl" avatar={avatar} className="mr-2" />

        <Button
         variant="secondary"
         size="sm"
         onClick={() => showUploader()}>
          { avatar ? 'Change your avatar' : 'Add a profile picture' }
        </Button>
      </div>
    </div>
  )
}

AvatarUploader.defaultProps = {
  className: ''
}

export default AvatarUploader
