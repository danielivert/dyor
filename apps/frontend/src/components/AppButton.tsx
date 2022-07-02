import { Button, ButtonProps } from 'ui'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

type Props = ButtonProps & {
  needsAccount?: boolean
}

const getText = ({ loading, children }: { loading?: boolean; children: string }): string => {
  if (loading) {
    return 'Loading...'
  }

  return children
}

const AppButton: React.FC<Props> = ({
  loading,
  needsAccount = false,
  onClick,
  children,
  ...props
}) => {
  const { address } = useAccount()
  const [text, setText] = useState('Loading...')

  useEffect(() => {
    setText(
      getText({
        loading,
        children: children as string,
      })
    )
  }, [needsAccount, loading, address, children])

  const onClickWrapper = (): void => {
    if (onClick) {
      onClick()
    }
  }

  if (needsAccount && !address) {
    return <ConnectButton />
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Button onClick={onClickWrapper} loading={loading} {...props}>
      {text}
    </Button>
  )
}

export default AppButton
