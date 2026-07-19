import { useEffect, useRef, useState } from 'react'
import { useAccount, useChainId, useSwitchChain } from 'wagmi'

export default function NetworkStatus() {
  const { isConnected, chain } = useAccount()
  const chainId = useChainId()
  const { chains, switchChain, isPending, error } = useSwitchChain()

  // Detect network changes: remember the previous chain id and show a
  // notice whenever it differs from the current one.
  const prevChainId = useRef(chainId)
  const [notice, setNotice] = useState(null)

  useEffect(() => {
    if (prevChainId.current !== chainId) {
      const name = chains.find((c) => c.id === chainId)?.name ?? `chain ${chainId}`
      setNotice(`Network changed to ${name}`)
      prevChainId.current = chainId
      const t = setTimeout(() => setNotice(null), 4000)
      return () => clearTimeout(t)
    }
  }, [chainId, chains])

  if (!isConnected) return null

  const unsupported = !chain

  return (
    <div className="card">
      <div className="row">
        <span className={`dot ${unsupported ? 'dot-red' : 'dot-green'}`} />
        <span>{unsupported ? `Unsupported network (id ${chainId})` : chain.name}</span>
      </div>
      <div className="row wrap">
        {chains.map((c) => (
          <button
            key={c.id}
            className={`btn btn-chip ${c.id === chainId ? 'active' : ''}`}
            disabled={isPending || c.id === chainId}
            onClick={() => switchChain({ chainId: c.id })}
          >
            {c.name}
          </button>
        ))}
        {isPending && <span className="spinner" />}
      </div>
      {notice && <p className="notice">{notice}</p>}
      {error && <p className="error">{error.shortMessage ?? error.message}</p>}
    </div>
  )
}
