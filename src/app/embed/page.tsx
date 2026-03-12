import EmbedClient from '@/components/EmbedClient'
import { getSession } from '@/lib/getSession'
import React from 'react'

async function Page() {
  const session = await getSession()

  if (!session?.user?.id) {
    return <div>Unauthorized</div>
  }

  return <EmbedClient ownerId={session.user.id} />
}

export default Page