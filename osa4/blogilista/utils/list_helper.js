const dummy = (blogs) => {
    return 1
}

const totalLikes = blogs => {
    return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = blogs => {
    if (blogs.length == 0) {
        return undefined
    }

    const favorite = blogs.reduce((favorite, blog) => favorite.likes > blog.likes ? favorite : blog, blogs[0])
    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes,
    }
}

const mostBlogs = blogs => {
    if (blogs.length === 0) {
        return undefined
    }

    authors = {}
    blogs.map(blog => {
        if (authors[blog.author] === undefined) {
            authors[blog.author] = {
                author: blog.author,
                blogs: 0,
            }
        }
        authors[blog.author].blogs++
    })
    return Object.values(authors).reduce((author, nextAuthor) => {
        if (author === undefined) {
            return nextAuthor
        }
        return author[1] > nextAuthor[1] ? author : nextAuthor
    }, undefined)
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}