// basic auth logout button
import { Button } from '@mantine/core'

export function Logout() {
  return (
    <form action="/api/auth/logout" method="get">
      <Button type="submit">Logout</Button>
    </form>
  )
}
