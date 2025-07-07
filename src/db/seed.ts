import { getPayload } from 'payload'
import config from '../payload.config'
import { seedLocations } from './seeders/locations'
import seedFeatures from './seeders/features'
async function seed() {
  console.log('Seeding database...')

  const payload = await getPayload({ config })

  // clear all collections
  await payload.delete({
    collection: 'properties',
    where: {},
  })

  await payload.delete({
    collection: 'locations',
    where: {},
  })

  await payload.delete({
    collection: 'features',
    where: {},
  })

  console.log('Clearing zipcodes collection first...')

  await seedLocations(payload)
  await seedFeatures(payload)
}

seed()
  .then(() => {
    console.log('Database seeded successfully')
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
