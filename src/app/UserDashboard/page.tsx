import UserDash from '@/Components/UserDash/UserDash'
import React from 'react'
import { allData } from '../../../public/data'

const page = () => {
  return (
    <UserDash usersData={allData}/>
  )
}

export default page