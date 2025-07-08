import {useNavigate} from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="content-center">
      <h2 className="content-center">404 | Not Found</h2>
      <br />
      <button
        type="button"
        onClick={() => navigate("/")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        Back To Home
      </button>
    </div>
  );
};

export default NotFound;
