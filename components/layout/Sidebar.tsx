import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut } from 'next-auth/react'
import { BiLogOut } from 'react-icons/bi'
import { BsBellFill, BsHouseFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import SidebarItem from './SidebarItem'
import SidebarLogo from './SidebarLogo'
import SidebarTweetButton from './SidebarTweetButton'

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser()
  console.log(currentUser)

  const items = [
    {
      label: 'Home',
      href: '/',
      icon: BsHouseFill,
    },
    {
      label: 'Notifications',
      href: '/notifications',
      icon: BsBellFill,
      auth: true,
    },
    {
      label: 'Profile',
      href: `/users/${currentUser?.id}`,
      icon: FaUser,
      auth: true,
    },
  ]

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-center">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              label={item.label}
              href={item.href}
              icon={item.icon}
              auth={item?.auth}
            />
          ))}
          {currentUser && (
            <SidebarItem icon={BiLogOut} label="Log out" onClick={signOut} />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
