import React, { useState, useEffect } from 'react'

export default function CurrencyConverter() {

    const [baseCurrency, setBaseCurrency] = useState("USD");
    const [convertCurrency, setConvertedCurrency] = useState("IND");
    const [baseAmount, setBaseAmount] = useState(10);
    const rates = [];
    const currencies = [];

    useEffect(() =>
    {
        callAPI(baseCurrency);
    },[])

    function changeBaseCurrency(e)
    {
        setBaseCurrency(e.target.value);
        callAPI(e.target.value);
    }

    function changeConvertToCurrency(e)
    {
        setConvertedCurrency(e.target.value);
        callAPI(e.target.value);
    }

    function changeBaseAmount(e)
    {
        baseAmount(e.target.value);
    }

    function callAPI(base) 
    {
        const api = `https://api.exchangeratesapi.io/latest?base=${base}`;
        fetch(api).then(result =>{
            console.log(result);
            return result.json();
        }
           ).then(data=>
            {
                console.log( data['rates']);
                rates = data['rates'],
                currencies = Object.keys(data['rates']).sort()
               
            });
    }

   const  getConvertedCurrency = (baseAmount,convertCurrency,rates) =>
    {
        return Number.parseFloat(baseAmount * rates[convertCurrency]).toFixed(3);

    }
    const result = getConvertedCurrency(baseAmount, convertCurrency, rates);
    

    const currencyOtpions = currencies.map(currency =>
        <option key={currency} value={currency}> {currency} </option>      
      );
    return (
        <div>
            <div>
                <select
                    value ={baseCurrency}
                    onChange={changeBaseCurrency}>
                    {currencyOtpions}
                    <option>{baseCurrency}</option>
                    </select>

                <input
                    type={Number}
                    id="base-Amount"
                    defaultValue={setBaseAmount}
                    onChange={changeBaseAmount}
                />
              
            </div>

           <div >
            <select value={convertCurrency} onChange={changeConvertToCurrency}>
                {currencyOtpions}
            </select>
            <input
                id="result-text"
                value = {result}
               
            />
           </div>
        </div>
    );
}
