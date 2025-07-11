import csv from 'csv-parser'
import fs from 'fs'
import path, { dirname } from 'path'
import { Payload } from 'payload'
import { fileURLToPath } from 'url'

export async function seedLocations(payload: Payload) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const csvFilePath = path.resolve(__dirname, './zip_codes.csv')
  console.log(csvFilePath)

  const locations: any[] = []

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data: any) => {
        // Filter by target counties
        locations.push({
          zip: data.zip,
          city: data.city,
          state_abbr: data.state_abbr,
          state_name: 'Tennessee',
          county: data.county,
          latitude: Number(data.latitude),
          longitude: Number(data.longitude),
          est_population: Number(data.est_population),
        })
      })
      .on('end', () => {
        console.log(locations[0])
        console.log(`Found ${locations.length} zip codes in target counties`)
        resolve()
      })
      .on('error', (error: Error) => {
        console.error('Error reading CSV file:', error)
        reject(error)
      })
  })

  for (const location of locations) {
    await payload.create({
      collection: 'locations',
      data: location,
    })
  }
}
