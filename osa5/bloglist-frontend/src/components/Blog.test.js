import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'tttt',
    author: 'aaaa',
    url: 'uuuu',
    likes: 1111,
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'tttt'
  )

  expect(component.container).toHaveTextContent(
    'aaaa'
  )

  expect(component.container).not.toHaveTextContent(
    'uuuu'
  )

  expect(component.container).not.toHaveTextContent(
    '1111'
  )
})