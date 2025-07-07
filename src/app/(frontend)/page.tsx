import { Button } from '@/components/ui/button'
import './styles.css'

export default async function HomePage() {
  return (
    <>
      <h1 className="text-3xl font-bold underline bg-amber-500"> Hello world! </h1>
      <Button variant="outline">Button</Button>
    </>
  )
}
