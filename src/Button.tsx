
interface Props {
    text: string,
    btnColor?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark',
    onClickBtn: () => void,
}

const Button = ({text, btnColor = 'primary', onClickBtn}: Props) => {
  return (
    <div className="p-3">
        <button className={'btn btn-' + btnColor + ' '} onClick={onClickBtn}>{text}</button>
    </div>
  )
}

export default Button