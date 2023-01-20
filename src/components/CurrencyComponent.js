import './CurrencyComponent.css'

function CurrencyComponent(props){

    const {changeCurrency,selectedCurrency,currencyChoice,amount,changeAmount} = props

    return(
        <div className='currency'>
            <select value={selectedCurrency} onChange={changeCurrency}>
                {currencyChoice.map((data)=>
                    <option key={data} value={data}>{data}</option>
                )}
            </select>
            <input type='number' value={amount} onChange={changeAmount}/>
        </div>
    )
}

export default CurrencyComponent