import React, {useState} from 'react';
import "./styles.css";


function Root () {

    return (
        <div className='root'>
            <div className='mainPanel'>
                <div className='mainPanel__Result'>
                    <div className='Panel_Container'>

                    </div>
                </div>

                <div className='mainPanel__MathExpr'>
                    <div className='Panel_Container'>

                    </div>
                </div>

                <div className='mainPanel__Calculation'>
                    <div className='buttonWrapper'>
                        <button className='buttonCalc'
                                onClick={() => {
                                    console.log ("!buttonCalc!");                  
                                }   
                            }
                            >Посчитать</button>
                    </div>
                </div>
            </div>

            <div className='historyPanel'>
                <div className='Panel_Container'>
                
                </div>
            </div>
        </div>
    )
}



export {Root};