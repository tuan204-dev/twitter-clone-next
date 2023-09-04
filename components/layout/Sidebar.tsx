import React from 'react'
import { BsHouseFill, BsBellFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem'
import {BiLogOut} from 'react-icons/bi'
import SidebarTweetButton from './SidebarTweetButton'

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
  },
  {
    label: 'Profile',
    href: '/users/123',
    icon: FaUser,
  },
]

const Sidebar = () => {
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
            />
          ))}
          <SidebarItem icon={BiLogOut} label='Log out' />
          <SidebarTweetButton/>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
