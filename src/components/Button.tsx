import { useNavigate } from "react-router-dom"

const Button = () => {

  const navigate = useNavigate();

  return (
    <div>
        <button type='button' onClick={() => navigate('/')} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer'>Click me</button>
    </div>
  )
}

export default Button