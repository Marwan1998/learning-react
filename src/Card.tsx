interface Props {
    title: string,
}

const Card = ({title}: Props) => {
  return (
    <div className="card">
        <h2>{title}</h2>
    </div>
  )
}

export default Card;