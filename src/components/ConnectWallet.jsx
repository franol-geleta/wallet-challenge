import { useAccount, useConnect, useDisconnect } from 'wagmi'

function shortAddress(address) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`
}

export default function ConnectWallet() {
  const { address, isConnected, isConnecting } = useAccount()
  const { connect, connectors, isPending, error } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div className="card">
        <div className="row">
          <span className="dot dot-green" />
          <span className="address" title={address}>{shortAddress(address)}</span>
        </div>
        <button className="btn btn-secondary" onClick={() => disconnect()}>
          Disconnect
        </button>
      </div>
    )
  }

  const injectedConnector = connectors.find((c) => c.type === 'injected')

  return (
    <div className="card">
      <div className="row">
        <span className="dot dot-gray" />
        <span>Not connected</span>
      </div>
      <button
        className="btn btn-primary"
        disabled={isPending || isConnecting}
        onClick={() => connect({ connector: injectedConnector })}
      >
        {isPending || isConnecting ? (
          <>
            <span className="spinner" /> Connecting…
          </>
        ) : (
          'Connect Wallet'
        )}
      </button>
      {error && <p className="error">{error.shortMessage ?? error.message}</p>}
    </div>
  )
}
