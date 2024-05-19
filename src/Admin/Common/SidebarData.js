import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { FaUserDoctor } from 'react-icons/fa6';
import { GrSchedules } from 'react-icons/gr';

export const AdminData = [
  {
    id: 1,
    title: 'Trang chủ',
    path: '/system',
    icon: <FaIcons.FaHome />,
  },
  {
    id: 2,
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
    id: 3,
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
    id: 4,
    title: 'Bác sỹ',
    path: '/system/docter-manage',
    icon: <FaUserDoctor />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Thông tin chi tiết',
        path: '/system/docter-infor',
      },
    ],
  },
  {
    id: 5,
    title: 'Quản lý khám bệnh',
    path: '/docter/manage-schedule',
    icon: <GrSchedules />,
  },
  {
    id: 6,
    title: 'Support',
    // path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
];
export const Docterdata = [
  {
    title: 'Quản lý khám bệnh',
    path: '/docter/manage-schedule',
    icon: <GrSchedules />,
  },
];
