import { useParams } from "react-router-dom";

const UserBlogs = ({ users }) => {
  const id = useParams().id;
  const user = users.find((u) => u.id === id);
  if (!user) return null;
  return (
    <div>
      <h2>{user.name}</h2>
      <h4>Added Blogs</h4>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserBlogs;
