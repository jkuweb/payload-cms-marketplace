import { parseUrlToSearchCriteria } from '@/lib/search-util'
import { SearchParams } from 'next/dist/server/request/search-params'

interface Props {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<SearchParams>
}

export default async function SearchPage({ params, searchParams }: Props) {
  const { slug } = await params
  const queryParams = await searchParams

  const searchCriteria = parseUrlToSearchCriteria(slug, queryParams)

  return <div>{JSON.stringify(searchCriteria, null, 2)}</div>
}
