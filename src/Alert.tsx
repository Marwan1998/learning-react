
interface Props {
    msg: string,
    onClose: () => void,
};

const Alert = ({msg, onClose}: Props) => {
  return (
    <div className="alert alert-warning alert-dismissible fade show" role="alert">
       {msg}
      <button type="button" className="close" onClick={onClose} data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}

export default Alert