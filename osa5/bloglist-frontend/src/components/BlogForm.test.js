
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('creating new blog calls function', () => {
  const blog = {
    title: 'tttt',
    author: 'aaaa',
    url: 'uuuu',
    likes: 1111,
    user: {
      name: 'nnnn',
      username: 'ssss',
      id: 2222,
    }
  }

  const mockHandler = jest.fn()

  const user = {
    username: 'u',
    name: 'n',
    id: '1',
  }

  const component = render(
    <BlogForm blogs={[]} setBlogs={() => 0} mock={mockHandler} user={user} />
  )

  const show = component.container.querySelector('#show')
  fireEvent.click(show)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  fireEvent.change(title, {
    target: { value: 'title' }
  })
  fireEvent.change(author, {
    target: { value: 'author' }
  })
  fireEvent.change(url, {
    target: { value: 'url' }
  })

  const create = component.container.querySelector('#create')
  fireEvent.click(create)
  expect(mockHandler.mock.calls.length).toBe(1)
  expect(mockHandler.mock.calls[0]).toEqual([
    user, 'title', 'author', 'url'
  ])
})