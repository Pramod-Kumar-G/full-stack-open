const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  const sumOfLikes = blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
  return sumOfLikes;
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  return blogs.reduce((favBlog, blog) => {
    return favBlog.likes > blog.likes ? favBlog : blog
  })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const authors = blogs.map(blog => blog.author)

  let mostBlogAuthor = { author: authors[0], blogs: 1 }
  let max = 0

  authors.forEach(author => {

    let blogCount = authors.filter(a => a === author).length

    if (blogCount > max) {
      mostBlogAuthor = { author, blogs: blogCount }
      max = blogCount
    }
  });
  return mostBlogAuthor

}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let authors = []
  blogs.forEach(blog => {
    if (!authors.includes(blog.author)) {
      authors.push(blog.author)
    }
  });

  let mostLikesAuthor = {
    author: blogs[0].author,
    likes: blogs[0].likes
  }
  authors.forEach(author => {
    let currentAuthorBlogs = blogs.filter(blog => blog.author === author)
    let currentAuthorTotalLikes = currentAuthorBlogs.reduce((sum, blog) => sum + blog.likes, 0)
    if (mostLikesAuthor.likes < currentAuthorTotalLikes) {
      mostLikesAuthor = { author, likes: currentAuthorTotalLikes }
    }
  })
  return mostLikesAuthor
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
