import React, { useState, useCallback } from 'react';
import type { AppProps } from './types';

const ZCalculator: React.FC<AppProps> = ({ className }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = useCallback((digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  }, [display, waitingForOperand]);

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  }, [display, waitingForOperand]);

  const clear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const toggleSign = useCallback(() => {
    setDisplay(String(-parseFloat(display)));
  }, [display]);

  const inputPercent = useCallback(() => {
    setDisplay(String(parseFloat(display) / 100));
  }, [display]);

  const performOperation = useCallback((nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let result: number;

      switch (operation) {
        case '+': result = currentValue + inputValue; break;
        case '-': result = currentValue - inputValue; break;
        case '×': result = currentValue * inputValue; break;
        case '÷': result = currentValue / inputValue; break;
        default: result = inputValue;
      }

      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  }, [display, operation, previousValue]);

  const calculate = useCallback(() => {
    if (!operation || previousValue === null) return;

    const inputValue = parseFloat(display);
    let result: number;

    switch (operation) {
      case '+': result = previousValue + inputValue; break;
      case '-': result = previousValue - inputValue; break;
      case '×': result = previousValue * inputValue; break;
      case '÷': result = previousValue / inputValue; break;
      default: return;
    }

    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  }, [display, operation, previousValue]);

  const buttonBase = "flex items-center justify-center text-2xl font-light rounded-full transition-all active:scale-95";
  const numberBtn = `${buttonBase} bg-[#505050] hover:bg-[#6a6a6a] text-white`;
  const operatorBtn = `${buttonBase} bg-[#ff9f0a] hover:bg-[#ffb340] text-white`;
  const functionBtn = `${buttonBase} bg-[#a5a5a5] hover:bg-[#c5c5c5] text-black`;

  const formatDisplay = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    return value.length > 9 ? num.toExponential(4) : value;
  };

  return (
    <div className={`flex flex-col h-full bg-[#1c1c1c] select-none ${className || ''}`}>
      <div className="flex-shrink-0 h-24 flex items-end justify-end px-6 pb-2">
        <span className="text-white text-5xl font-light truncate">
          {formatDisplay(display)}
        </span>
      </div>

      <div className="flex-1 grid grid-cols-4 gap-[1px] p-[1px]">
        <button className={functionBtn} onClick={clear}>{previousValue ? 'C' : 'AC'}</button>
        <button className={functionBtn} onClick={toggleSign}>±</button>
        <button className={functionBtn} onClick={inputPercent}>%</button>
        <button className={`${operatorBtn} ${operation === '÷' && waitingForOperand ? 'bg-white text-[#ff9f0a]' : ''}`} onClick={() => performOperation('÷')}>÷</button>

        <button className={numberBtn} onClick={() => inputDigit('7')}>7</button>
        <button className={numberBtn} onClick={() => inputDigit('8')}>8</button>
        <button className={numberBtn} onClick={() => inputDigit('9')}>9</button>
        <button className={`${operatorBtn} ${operation === '×' && waitingForOperand ? 'bg-white text-[#ff9f0a]' : ''}`} onClick={() => performOperation('×')}>×</button>

        <button className={numberBtn} onClick={() => inputDigit('4')}>4</button>
        <button className={numberBtn} onClick={() => inputDigit('5')}>5</button>
        <button className={numberBtn} onClick={() => inputDigit('6')}>6</button>
        <button className={`${operatorBtn} ${operation === '-' && waitingForOperand ? 'bg-white text-[#ff9f0a]' : ''}`} onClick={() => performOperation('-')}>−</button>

        <button className={numberBtn} onClick={() => inputDigit('1')}>1</button>
        <button className={numberBtn} onClick={() => inputDigit('2')}>2</button>
        <button className={numberBtn} onClick={() => inputDigit('3')}>3</button>
        <button className={`${operatorBtn} ${operation === '+' && waitingForOperand ? 'bg-white text-[#ff9f0a]' : ''}`} onClick={() => performOperation('+')}>+</button>

        <button className={`${numberBtn} col-span-2`} onClick={() => inputDigit('0')}>0</button>
        <button className={numberBtn} onClick={inputDecimal}>.</button>
        <button className={operatorBtn} onClick={calculate}>=</button>
      </div>
    </div>
  );
};

export default ZCalculator;
