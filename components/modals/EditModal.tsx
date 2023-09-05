import useCurrentUser from '@/hooks/useCurrentUser'
import useEditModal from '@/hooks/useEditModal'
import useUser from '@/hooks/useUser'
import axios from 'axios'
import React, { use, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import Modal from '../Modal'
import Input from '../Input'

const EditModal = () => {
  const { data: currentUser } = useCurrentUser()

  const { mutate: mutateFetchedUser } = useUser(currentUser?.id as string)

  const editModal = useEditModal()

  const [profileImage, setProfileImage] = useState<string>('')
  const [coverImage, setCoverImage] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [bio, setBio] = useState<string>('')

  useEffect(() => {
    setProfileImage(currentUser?.profileImage || '')
    setCoverImage(currentUser?.coverImage || '')
    setName(currentUser?.name || '')
    setUsername(currentUser?.username || '')
    setBio(currentUser?.bio || '')
  }, [
    currentUser?.profileImage,
    currentUser?.coverImage,
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
  ])

  const [isLoading, setLoading] = useState<boolean>(false)

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true)

      await axios.patch('/api/edit', {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      })

      mutateFetchedUser()

      toast.success('Profile updated successfully')
      setLoading(false)

      editModal.onClose()
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }, [name, username, bio, profileImage, coverImage, mutateFetchedUser, editModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />

      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />

      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  )

  return (
    <Modal
      onSubmit={onSubmit}
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      onClose={editModal.onClose}
      actionLabel="Save"
      body={bodyContent}
    />
  )
}

export default EditModal
