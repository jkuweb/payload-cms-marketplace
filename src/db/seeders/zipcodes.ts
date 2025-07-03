import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import csv from 'csv-parser'
import { Payload } from 'payload'
import { Zipcode } from '../../payload-types'

// type RawData = Omit<Location, "id" | "updatedAt" | "createdAt"> & {
//   code: string
// }

export async function seedZipcodes(payload: Payload) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const csvFilePath = path.resolve(__dirname, './zip_codes.csv')

  const zipCodes: any[] = []

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data: any) => {
        zipCodes.push({
          code: Number(data.code),
          city: data.city,
          state_abbr: data.state_abbr,
          state_name: 'Tennessee',
          country: data.country,
          latitude: Number(data.latitude),
          longitude: Number(data.longitude),
          est_population: Number(data.est_population),
        })
      })
      .on('end', () => {
        console.log(`Found ${zipCodes.length} zip codes`)
        resolve()
      })
      .on('error', (error: Error) => {
        console.error('Error reading CSV file:', error)
        reject(error)
      })
  })
  for (const zipCode of zipCodes) {
    await payload.create({
      collection: 'zipcodes',
      data: zipCode,
    })
  }
}
