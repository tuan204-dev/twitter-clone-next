import React, { use, useState } from 'react'
import Header from '@/components/Header'
import { useRouter } from 'next/router'
import useUser from '@/hooks/useUser'
import { ClipLoader } from 'react-spinners'
import UserHero from '@/components/users/UserHero'
import UserBio from '@/components/users/UserBio'

const UserView = () => {
  const [isLoading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const { userId } = router.query

  const { data: fetchedUser } = useUser(userId as string)

  if (!fetchedUser || isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    )
  }

  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
    </>
  )
}

export default UserView
