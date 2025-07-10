export async function capitalizeFirstLetter(text: string): Promise<string> {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
