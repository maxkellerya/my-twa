import './App.css'
import { TonConnectButton } from '@tonconnect/ui-react'
import { useCounterContract } from './hooks/useCounterContract'
import { useTonConnect } from './hooks/useTonConnect';
import WebApp from '@twa-dev/sdk'

WebApp.showAlert('Hey there!');
function App() {
  const { connected } = useTonConnect();
  const { contract_address, counter, sendIncrement } = useCounterContract();
  const showAlert = () => {
    WebApp.showAlert("Hey where!!!!!");
  };

  return (
    <>
      <div><TonConnectButton /></div>
      <div className="Card">
        <b>{WebApp.platform}</b>
        <b>Contract Address</b>
        <div>{contract_address}</div>
      </div>
      <div className="Card">
        <b>Counter</b>
        <div>{counter ?? "Loading..."}</div>
      </div>
      {connected && (<a className={`Button ${counter ? 'Active' : 'Disabled'}`} onClick={() => { sendIncrement(); }}>Increment</a>)}
      <a onClick={() => { showAlert(); }}>Show alert</a>
    </>
  )
}

export default App
