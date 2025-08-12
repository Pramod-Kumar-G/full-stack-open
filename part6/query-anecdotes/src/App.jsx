import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, updateAnecdote } from "./requests";
import { useNotificationDispatch } from "./NotificationContext";

const App = () => {
  const notificationDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      const updatedAnecdotes = anecdotes.map((a) =>
        a.id === updatedAnecdote.id ? updatedAnecdote : a,
      );
      queryClient.setQueryData(["anecdotes"], updatedAnecdotes);
      notificationDispatch({
        type: "setNotification",
        payload: `anecdote '${updatedAnecdote.content}' voted`,
      });
      setTimeout(() => {
        notificationDispatch({
          type: "clearNotification",
        });
      }, 3000);
    },
  });

  const handleVote = (anecdote) => {
    const id = anecdote.id;
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    updateAnecdoteMutation.mutate({ id, updatedAnecdote });
  };

  const anecdotes = result.data;
  console.log(result);

  if (result.isPending) {
    return <span>Loading Data...</span>;
  }

  if (result.isError) {
    console.log("Error: ", result.error.message);
    return (
      <span>anecdote service not available due to problems in server</span>
    );
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
