import useUser from '@/hooks/useUser'
import { useRouter } from 'next/router'
import Image from 'next/image'
import React, { useCallback } from 'react'

interface AvatarProps {
  userId: string
  isLarge?: boolean
  hasBorder?: boolean
}

const Avatar: React.FC<AvatarProps> = ({ userId, hasBorder, isLarge }) => {
  const router = useRouter()
  const { data: fetchedUser } = useUser(userId)

  const onClick = useCallback(
    (e: any) => {
      e.stopPropagation()

      const url = `/users/${userId}`

      router.push(url)
    },
    [router, userId]
  )

  return (
    <div
      className={`
        ${hasBorder ? 'border-4 border-black' : ''}
        ${isLarge ? 'w-32' : 'w-12'}
        ${isLarge ? 'h-32' : 'h-12'}
        rounded-full
        transition
        relative
        cursor-pointer
        hover:brightness-90
      `}
    >
      <Image
        fill
        style={{ objectFit: 'cover', borderRadius: '100%' }}
        alt="Avatar"
        onClick={onClick}
        sizes="full"
        src={fetchedUser?.profileImage || '/images/placeholder.png'}
      />
    </div>
  )
}

export default Avatar
