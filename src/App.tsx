import './App.css'
import { TonConnectButton } from '@tonconnect/ui-react'
import { useCounterContract } from './hooks/useCounterContract'
import { useTonConnect } from './hooks/useTonConnect';

function App() {
  const { connected } = useTonConnect();

  const { contract_address, counter, sendIncrement } = useCounterContract();
  return (
    <>
      <TonConnectButton />
      <div className="Card">
        <b>Contract Address</b>
        <div>{contract_address}</div>
      </div>
      <div className="Card">
        <b>Counter</b>
        <div>{counter ?? "Loading..."}</div>
      </div>
      {connected && (<a className={`Button ${counter ? 'Active' : 'Disabled'}`} onClick={() => { sendIncrement(); }}>Increment</a>)}
      
    </>
  )
}

export default App
