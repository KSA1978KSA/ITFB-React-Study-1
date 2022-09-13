import React, {useState} from 'react';
import "./styles.css";





//--- Компонент под цифры
type propBox = {
    symbol: string
};

function Box ({symbol} : propBox) {

	return (
		<div className='Box'>{symbol}</div>
	)
}


//--- Компонент под список цифр
type propHistoryElement = {
    values: string,
    currentVal: string,
    callBack(newVal:string) : any
};
function HistoryElement ({values, currentVal, callBack} : propHistoryElement) {

	return (
        <div className='HistoryElement'
        onClick={()=>(            
            callBack(currentVal + values)
        )
        }
        >  
            {
                Array.from(values).map ((element, index) => {
                    return (             
                        <Box 
                            key={index}
                            symbol={element}
                            />            
                    )
                })             
            }
        </div>      
	)    
}


    
      

  

function Root () {

    
    //---- Хук для ввода данных
    const [inputValue, inputValueCallBack] = useState("");

    //---- Хук для результата данных
    const [resultValue, resultValueCallBack] = useState("");

    //---- Хук для истории результатов
    let arrHistory:string[] = [];
    const [historyValue, historyValueCallBack] = useState(arrHistory);


    //--- функция-обработчик события нажатия кнопки на клавиатуре под DIV    
    function onKeyPressed(event : React.KeyboardEvent<HTMLDivElement>) {

        if ([
                "Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Digit0",
                "Numpad1","Numpad2","Numpad3", "Numpad4","Numpad5", "Numpad6","Numpad7", "Numpad8","Numpad9", "Numpad0"
            ].includes(event.code)) {
            inputValueCallBack(inputValue + event.code.replace(/[^0-9]/g,""));
        }

        switch (event.code) {
            case "NumpadDivide":
                inputValueCallBack(inputValue + "/");
                break;

            case "NumpadMultiply":
                inputValueCallBack(inputValue + "*");
                break;

            case "NumpadSubtract":
                inputValueCallBack(inputValue + "-");
                break;

            case "NumpadAdd":
                inputValueCallBack(inputValue + "+");
                break;
            
            case "Backspace":
                inputValueCallBack(inputValue.slice(0,inputValue.length-1));
                break;

            case "Enter":
                calcRes();
                break;

            case "NumpadEnter":
                calcRes();
                break;

        }

        console.log(event.code);
    }



    //--- функция расчета результата
    function calcRes() {
        try {  
            if (!!inputValue===false) {
                resultValueCallBack("ошибка");//--- устанавливаем результат
                return;
            }
            let res = Math.round(Number(eval(inputValue)));              
            resultValueCallBack(String(res));//--- устанавливаем результат
            inputValueCallBack("");//--- сбрасываем расчет 

            let historyValueNew = [...historyValue];
            historyValueNew.push (String(res));
            historyValueCallBack(historyValueNew);
        } catch {
            resultValueCallBack("ошибка");//--- устанавливаем результат
        }
    }


    
    return (
        <div className='Root'
            onKeyDown={onKeyPressed} //--- 
            tabIndex={0} 
            /*  Атрибут tabindex определяет последовательность 
                перехода между ссылками при нажатии на кнопку.
                Если не задать tabIndex=0 то событие не будет возникать в данном div
            */
        >
            <div className='MainPanel'> 
                <div className='MainPanel__Result'>
                    <div className='Panel_Container'>
                        <div className='Panel_Container_Container'>
                        {
                            Array.from(resultValue).map ((element, index) => {
                                return (
                                <Box 
                                    key={index}
                                    symbol={element}
                                    />
                                )
                            })
                        }
                        </div>
                    </div>
                </div>

                <div className='MainPanel__MathExpr'>                    
                    <div className='Panel_Container'>
                        <div className='Panel_Container_Container'>
                        {
                            Array.from(inputValue).map ((element, index) => {
                                return (
                                <Box 
                                    key={index}
                                    symbol={element}
                                    />
                                )
                            })
                        }
                        </div>
                    </div>
                </div>

                <div className='MainPanel__Calculation'>
                    <div className='ButtonWrapper'>
                        <button className='ButtonCalc'
                                onClick={calcRes}
                            >Посчитать</button>
                    </div>
                </div>
            </div>

            <div className='HistoryPanel'>
                <div className='Panel_Container'>
                    <div className='Panel_Container_Container'>
                        <div className='HistoryElement_Wrapper'>

                        {
                        historyValue.map ((element, index) => {
                            return (
                                <HistoryElement 
                                    key={index}
                                    values = {element}
                                    currentVal = {inputValue}
                                    callBack = {inputValueCallBack}
                                /> 
                            )
                            })                                                   
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export {Root};