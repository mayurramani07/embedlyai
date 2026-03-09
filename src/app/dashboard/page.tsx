import DashboardClient from '@/components/DashboardClient'
import { getSession } from '@/lib/getSession'
import React from 'react'

async function page() {
  const session = await getSession()

  if (!session?.user?.id) {
    return <div>User not authenticated</div>
  }

  return (
    <div>
      <DashboardClient ownerId={session.user.id}/>
    </div>
  )
}

export default page