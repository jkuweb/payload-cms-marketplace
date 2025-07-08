import { Payload } from 'payload'

export const seedUsers = async (payload: Payload) => {
  await payload.create({
    collection: 'users',
    data: {
      email: 'joseba@gmail.com',
      password: 'rascaspas',
    },
  })
}
