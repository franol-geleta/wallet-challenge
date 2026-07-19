import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'

// Stand-in for a mint: a 0-value transaction to the user's own address.
// The full lifecycle (confirm in wallet -> pending -> confirmed) is identical
// to a real contract write, so the UI states carry over unchanged.
export default function MintDemo() {
  const { address, isConnected } = useAccount()

  const {
    sendTransaction,
    data: hash,
    isPending: isConfirmingInWallet,
    error: sendError,
    reset,
  } = useSendTransaction()

  const {
    isLoading: isMining,
    isSuccess: isMinted,
    error: receiptError,
  } = useWaitForTransactionReceipt({ hash })

  if (!isConnected) return null

  const error = sendError ?? receiptError
  const busy = isConfirmingInWallet || isMining

  return (
    <div className="card">
      <h2>Mint</h2>

      <button
        className="btn btn-primary"
        disabled={busy}
        onClick={() => {
          reset()
          sendTransaction({ to: address, value: 0n })
        }}
      >
        {busy ? (
          <>
            <span className="spinner" /> {isConfirmingInWallet ? 'Waiting…' : 'Minting…'}
          </>
        ) : isMinted ? (
          'Mint again'
        ) : (
          'Mint'
        )}
      </button>

      {isConfirmingInWallet && <p className="notice">Confirm in wallet…</p>}

      {isMining && (
        <p className="notice">
          Transaction pending… <span className="mono">{hash.slice(0, 10)}…</span>
        </p>
      )}

      {isMinted && <p className="success">Minted! 🎉</p>}

      {error && <p className="error">{error.shortMessage ?? error.message}</p>}
    </div>
  )
}
