'use client'
import { Table, Title } from '@mantine/core'
import { cacheTags } from '@trpfrog.net/constants'
import useSWR from 'swr'

import { RevalidateButton } from '../revalidate/RevalidateButton'

import { fetchPostList } from './actions'
import { JSONModal } from './JSONModal'
import { RevalidatePostButton } from './RevalidatePostButton'

export default function BlogPage() {
  // const posts = await fetchPostList()
  const res = useSWR('blog', () => fetchPostList())
  const posts = res.data ?? []

  return (
    <>
      <Title order={2} my="lg">
        Blog
      </Title>
      <Table striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Slug</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {posts.map(post => (
            <Table.Tr key={post.slug}>
              <Table.Td>{post.title}</Table.Td>
              <Table.Td>{post.slug}</Table.Td>
              <Table.Td>{post.date}</Table.Td>
              <Table.Td className="flex flex-wrap gap-2">
                <RevalidatePostButton slug={post.slug} />
                <JSONModal slug={post.slug} />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Title order={2} my="md">
        Operations
      </Title>
      <RevalidateButton tag={cacheTags.entireBlog.tag} color="red">
        Revalidate All
      </RevalidateButton>
    </>
  )
}
