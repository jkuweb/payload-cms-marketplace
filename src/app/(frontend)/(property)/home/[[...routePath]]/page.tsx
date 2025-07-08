interface Props {
  routePath: string
}

export default async function PropertyDetailPage(params: Props) {
  const { routePath } = await params
  return (
    <>
      <h1>Property Detail Page</h1>
      <div>{JSON.stringify(routePath, null, 2)}</div>
    </>
  )
}
