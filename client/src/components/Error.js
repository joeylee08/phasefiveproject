import { useNavigate } from 'react-router-dom'

const Error = () => {
  const navigate = useNavigate()
  setTimeout(() => navigate('/'), 800)
  return (
    <h1>Whoops...</h1>
  )
}

export default Error