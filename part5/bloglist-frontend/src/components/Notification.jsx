const Notification = ({ notification }) => {
  return (
    <div style={{ background: '#eee', padding: '10px', marginBottom: '10px', borderRadius: '6px', border: `4px solid ${notification.type === 'error' ? 'red' : 'green'}`, color: `${notification.type === 'error' ? 'red' : 'green'}` }}>{notification.message}</div>
  )
}

export default Notification
