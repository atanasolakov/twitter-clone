import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from  'react-icons/fa';
import SidebarLogo from "@/components/Layout/SidebarLogo";
import SidebarItem from "@/components/Layout/SidebarItem";
import {BiLogOut} from "react-icons/bi";
import SideBarTweetButton from "@/components/Layout/SideBarTweetButton";
import useCurrentUser from "@/hooks/useCurrentUser";
import {signOut} from "next-auth/react";

const Sidebar = () => {
    const { data : currentUser } = useCurrentUser();
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
          href:  `/users/${currentUser?.id}`,
          icon: FaUser,
          auth: true,
        }
    ]
    return (
        <div className={"col-span-1 h-full pr-4 md:pr-6"}>
            <div className={"flex flex-col items-end"}>
              <div className={'space-y-2 lg:w-[230px]'}>
                  <SidebarLogo />
                  {items.map((item) => (
                      <SidebarItem
                          key={item.href}
                          href={item.href}
                          icon={item.icon}
                          label={item.label}
                          auth={item?.auth}
                      />
                  ))}

                  {currentUser && <SidebarItem onClick={() => signOut()} icon={BiLogOut} label="Logout" />}
                  <SideBarTweetButton />
              </div>
            </div>
        </div>
    )
}

export default Sidebar