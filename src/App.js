import CurrencyComponent from './components/CurrencyComponent';
import money from './image/money.png'
import {useEffect, useState} from 'react'

function App() {

  const [currencyChoice,setCurrencyChoice] = useState([])

  const [fromCurrency,setFromCurrency] = useState('USD')
  const [toCurrency,setToCurrency] = useState('THB')

  const [amount,setAmount] = useState(1)
  const [exchangeRate,setExchangeRate] = useState(0)

  const [checkFromCurrency,setCheckFromCurrency] = useState(true)

  let fromAmount,toAmount

  if(checkFromCurrency){
    fromAmount = amount
    toAmount = (fromAmount*exchangeRate).toFixed(2)
  }else{
    toAmount = amount
    fromAmount = (toAmount/exchangeRate).toFixed(2)
  }

  function amountFrom(e){
    setAmount(e.target.value)
    setCheckFromCurrency(true)
  }

  function amountTo(e){
    setAmount(e.target.value)
    setCheckFromCurrency(false)
  }

  useEffect(()=>{
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      setCurrencyChoice(Object.keys(data.rates))
      setExchangeRate(data.rates[toCurrency])
    })
  },[fromCurrency,toCurrency])

  return (
    <div>
      <img src={money} alt='logo' />
      <h1>แอปแปลงสกุลเงิน</h1>
      <div className='contanier'>
        <CurrencyComponent 
        currencyChoice={currencyChoice} 
        selectedCurrency={fromCurrency}
        changeCurrency={(e)=>setFromCurrency(e.target.value)}
        amount={fromAmount}
        changeAmount={amountFrom}
        />
        <div className='equal'>
          =
        </div>
        <CurrencyComponent 
        currencyChoice={currencyChoice} 
        selectedCurrency={toCurrency}
        changeCurrency={(e)=>setToCurrency(e.target.value)}
        amount={toAmount}
        changeAmount={amountTo}
        />
      </div>
      
    </div>
  );
}

export default App;
