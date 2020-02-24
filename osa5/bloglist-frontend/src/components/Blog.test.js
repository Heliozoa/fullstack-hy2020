import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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

test('renders all content on detail click', () => {
  const blog = {
    title: 'tttt',
    author: 'aaaa',
    url: 'uuuu',
    likes: 1111,
    user: {
      name: 'nnnn',
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'tttt'
  )
  expect(component.container).toHaveTextContent(
    'aaaa'
  )
  expect(component.container).toHaveTextContent(
    'uuuu'
  )
  expect(component.container).toHaveTextContent(
    '1111'
  )
})

test('renders all content on detail click', () => {
  const blog = {
    title: 'tttt',
    author: 'aaaa',
    url: 'uuuu',
    likes: 1111,
    user: {
      name: 'nnnn',
    }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} mock={mockHandler} />
  )

  const view = component.getByText('view')
  fireEvent.click(view)

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(2)
})