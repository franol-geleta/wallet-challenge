import ConnectWallet from './components/ConnectWallet'
import NetworkStatus from './components/NetworkStatus'
import MintDemo from './components/MintDemo'

export default function App() {
  return (
    <main className="container">
      <h1>Wallet Challenge</h1>
      <p className="subtitle">Wallet connection &amp; UI-state sync demo</p>
      <ConnectWallet />
      <NetworkStatus />
      <MintDemo />
    </main>
  )
}
