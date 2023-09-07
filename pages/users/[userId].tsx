import React, { use, useRef, useState } from 'react'
import Header from '@/components/Header'
import { useRouter } from 'next/router'
import useUser from '@/hooks/useUser'
import { ClipLoader } from 'react-spinners'
import UserHero from '@/components/users/UserHero'
import UserBio from '@/components/users/UserBio'
import PostFeed from '@/components/posts/PostFeed'
import useComponentSize from '@/hooks/useElementSize'

const UserView = () => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const headerRef = useRef<HTMLDivElement>(null)

  const { height } = useComponentSize(headerRef)

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
    <div className="h-full flex flex-col relative">
      <div ref={headerRef} className="absolute top-0 right-0 left-0 z-10 bg-black">
        <Header showBackArrow label={fetchedUser?.name} />
        <UserHero userId={userId as string} />
        <UserBio userId={userId as string} />
      </div>
      <div
        style={{ paddingTop: height }}
        className={`h-screen overflow-hidden overflow-y-auto scrollbar-hide`}
      >
        <PostFeed userId={userId as string} />
      </div>
    </div>
  )
}

export default UserView
