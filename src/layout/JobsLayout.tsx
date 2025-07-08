import { Outlet } from 'react-router-dom'

const JobsLayout = () => {
  return (
    <div>
        <h2>Jobs Layout Opening</h2>
        <p>List all data</p>

        <Outlet />

    </div>
  )
}

export default JobsLayout