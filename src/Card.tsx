import {useEffect, useState} from 'react';

interface Props {
    title: string,
}

const Card = ({title}: Props) => {
  const [hasLiked, setHasLiked] = useState(false);

  const [count, setCount] = useState(0);

  useEffect(() => {
    const likeState = hasLiked ? 'liked' : 'disliked';

    console.log(`${title} has been ${likeState}`);
  }, [hasLiked, title]);

  
  function handleOnClick(){
    setHasLiked(!hasLiked);
    // setCount((prevState) => prevState + 1);
    console.log(count);
  }

  return (
    <div className="card" onClick={() => setCount((prevState) => prevState+1)}>
        <h2>{title}</h2>
        {count || null}
        <button type='button' className='btn btn-sm btn-primary' onClick={handleOnClick}>
          {hasLiked ? '❤️' : '🤍'}
        </button>
    </div>
  )
}

export default Card;