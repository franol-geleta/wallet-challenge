# Wallet Challenge

A small React dApp demonstrating wallet connection management and UI-state
sync during blockchain interactions. Built with **Vite + React + wagmi + viem**.

## Run it

```bash
npm install
npm run dev
```

Open the printed URL in a browser with MetaMask (or any injected wallet)
installed.

## How each requirement is covered

### 1. Wallet connection

- **Connect / disconnect** — `ConnectWallet.jsx` uses wagmi's `useConnect`
  (injected connector, e.g. MetaMask) and `useDisconnect`.
- **UI responds to connection status** — `useAccount` drives the UI: a status
  dot, the shortened address when connected, and a "Not connected" state
  otherwise. Account switches in the wallet update the address automatically.
- **Network change detection** — `NetworkStatus.jsx` reads the active chain
  via `useAccount`/`useChainId` (wagmi subscribes to the wallet's
  `chainChanged` event under the hood). When the chain id changes — whether
  from the in-app switch buttons or from inside MetaMask — a
  "Network changed to …" notice appears. Ethereum, Polygon, and Sepolia are
  configured; switching is offered via `useSwitchChain`, and an unsupported
  network is flagged in red.

### 2. UI-state sync

`MintDemo.jsx` walks a transaction through its full lifecycle. (The "mint" is
a 0-value transaction to your own address so the demo works on any network
without a deployed contract — the UI states are identical to a real contract
write via `useWriteContract`.)

- **"Confirm in wallet" prompt** — while `useSendTransaction` is pending
  (wallet popup open), the UI shows *Confirm in wallet…*.
- **Pending loader** — once the transaction is broadcast,
  `useWaitForTransactionReceipt` reports it as mining; the button shows a
  spinner and *Minting…* along with the transaction hash.
- **Success message** — when the receipt lands, *Minted!* is displayed.
- **Errors** (user rejection, reverts) surface inline in red.

## Structure

```
src/
  wagmi.js                  # chains + injected connector config
  main.jsx                  # WagmiProvider + react-query provider
  App.jsx
  components/
    ConnectWallet.jsx       # connect / disconnect, address display
    NetworkStatus.jsx       # chain display, switch, change detection
    MintDemo.jsx            # tx lifecycle: confirm -> pending -> minted
```

> Tip: use **Sepolia** (test ETH from a faucet) to try the mint flow without
> spending real funds.
