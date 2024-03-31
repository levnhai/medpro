import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { FaUserDoctor } from 'react-icons/fa6';

export const SidebarData = [
  {
    title: 'Trang chủ',
    path: '/system',
    icon: <FaIcons.FaHome />,
  },
  {
    title: 'Người dùng',
    path: '/system/user-manage',
    icon: <FaIcons.FaRegUser />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'quản lý người dùng',
      },
      {
        title: 'quản lý người dùng 1',
      },
    ],
  },
  {
    title: 'Bệnh viện',
    path: '/system/hospital-manage',
    icon: <FaIcons.FaClinicMedical />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'quản lý bệnh viện',
      },
    ],
  },
  {
    title: 'Bác sỹ',
    path: '/system/docter-manage',
    icon: <FaUserDoctor />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },

  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
];
