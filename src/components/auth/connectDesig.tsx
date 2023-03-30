import { Button } from 'antd'
import { useWallet } from 'hooks/useWallet'

const ButtonLoginDesig = () => {
  const { pubKey, login } = useWallet()

  if (!!pubKey) {
    return <Button>{pubKey}</Button>
  }
  return (
    <Button onClick={login} type="primary">
      Login Desig
    </Button>
  )
}

export default ButtonLoginDesig
