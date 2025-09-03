import { useState } from "react";

const BlogForm = ({ handleCreate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (e) => {
    e.preventDefault();
    const blog = { title, author, url };
    handleCreate(blog);
  };
  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <div>
          <div>
            title:
            <input
              type="text"
              name="title"
              placeholder="enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              name="author"
              placeholder="enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              name="url"
              placeholder="enter url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
