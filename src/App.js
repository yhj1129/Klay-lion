import logo from './logo.svg';
import './App.css';
import Caver from 'caver-js';

const COUNT_CONTRACT_ADDRESS = '0xF61871180F975c1A692Cd0ADabAc99a26d65e2F9';
const ACCESS_KEY_ID = "KASK5DUSM88M186XQ668GO3X";
const SECRET_ACCESS_KEY = "cilW994OT_qTFXVMrmY4KnJFZQnHVujMhZTFo7Bq";
const COUNT_ABI = '[ { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]';

const CHAIN_ID = '1001'; //main 8217 test 1001
const option = {
  header:[
    { 
      name: "Authorization",
      value: "Basic " + Buffer.from(ACCESS_KEY_ID + ":" + SECRET_ACCESS_KEY).toString("base64")
    },
    {name: "x-chain-id", value:CHAIN_ID}
  ]

}
const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn",option));
const CountContract = new caver.contract(JSON.parse(COUNT_ABI), COUNT_CONTRACT_ADDRESS);

const readCount = async () => {
  const _count = await CountContract.methods.count().call();
  console.log(_count);
}

const getBalance = (address) => {
  return caver.rpc.klay.getBalance(address).then((responce) => {
    const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(responce));
    console.log('BALANCE: ${balance}');
    return balance;
  })
}
//1. 스마트컨트랙트 배포 후 주소 가져오기
//2. caver.js를 이용해서 스마트 컨트랙트 연동
//3. 가져온 스마트 컨트랙트 결과 웹에 표현하기
function App() {
  readCount();
  getBalance('0xb22a661db02fe0e2bfa1a0daf4ead1414b8f3122');
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
