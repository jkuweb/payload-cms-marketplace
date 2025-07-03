import { getPayload } from 'payload'
import { seedZipcodes } from './seeders/zipcodes'
import config from '../payload.config'

async function seed() {
  const payload = await getPayload({ config })

  // clear all collections
  await payload.delete({
    collection: 'zipcodes',
    where: {},
  })

  console.log('Clearing zipcodes collection first...')

  await seedZipcodes(payload)
}

seed()
  .then(() => {
    console.log('Database seed successfully')
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
