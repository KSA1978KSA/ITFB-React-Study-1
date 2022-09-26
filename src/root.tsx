import React, {useState, useEffect, useLayoutEffect} from 'react';
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
    callBack1(newVal:string, callBack2:React.Dispatch<React.SetStateAction<string>>) : any,
    callBack2:React.Dispatch<React.SetStateAction<string>>
};
function HistoryElement ({values, callBack1, callBack2} : propHistoryElement) {

    

    useEffect(() => {
        console.log ("HistoryElement useEffect");
      }, [values,  callBack1, callBack2]
    );

    useLayoutEffect(() => {
        console.log ("HistoryElement useLayoutEffect");        
      }
    );

	return (
        <div className='HistoryElement'
        onClick={()=>(            
            callBack1(values, callBack2)
        )
        }
        >  
            {
                Array.from(values).map ((element, index) => {
                    console.log("Draw HistoryElement");
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


    
let inputValueCallBack_link:React.Dispatch<React.SetStateAction<string>>;  
let test_func_link: () => void;
let getCurrentVal_link: () => string;




let inputValue_global:string = "";
//--- делаем CallBack добавления значения из истории в текущую строку
function addHistoryVal (val:string, inputValueCallBack:React.Dispatch<React.SetStateAction<string>>):void {
    inputValueCallBack(inputValue_global + val);
};

function Root () {

    
    

    function test_func () {
        console.log ("test_func");
    }

    if (!!test_func_link) {        
        if (test_func_link===test_func) {
            console.log ("Ссылка на test_func не меняется...");
        }
        else {
            console.log ("Ссылка на test_func изменилась...");
        }
    }

    test_func_link = test_func;


    
    //---- Хук для ввода данных
    const [inputValue, inputValueCallBack] = useState("");
    inputValue_global = inputValue;

    if (!!inputValueCallBack_link) {        
        if (inputValueCallBack_link===inputValueCallBack) {
            console.log ("Ссылка на inputValueCallBack не меняется...");
        }
        else {
            console.log ("Ссылка на inputValueCallBack изменилась...");
        }
    }

    inputValueCallBack_link = inputValueCallBack;

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
                                    callBack1 = {addHistoryVal}
                                    callBack2 = {inputValueCallBack}                                    
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