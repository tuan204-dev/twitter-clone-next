import { NextApiRequest } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@/libs/prismadb'

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req })

  console.log('session', session?.user?.email)

  if (!session?.user?.email) {
    throw new Error('Not signed in')
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  return { currentUser }
}

export default serverAuth