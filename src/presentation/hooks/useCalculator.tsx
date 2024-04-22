import { useEffect, useRef, useState } from "react";

enum Operator {
  add = '+',
  subtrac = '-',
  multiply = 'X',
  divide = '÷'
}

export const useCalculator = () => {

  const [formula, setFormula] = useState('');

  const [number, setNumber] = useState('0');

  const [previusNumber, setPreviusNumber] = useState('0');

  const lastOperation = useRef<Operator>();

  useEffect(() => {
    if (lastOperation.current) {
      const firstFormulaPart = formula.split(' ').at(0);
      setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
    } else {
      setFormula(number)
    }
  }, [number]);

  useEffect(() => {
    const subResult = calculateSubResult();
    setPreviusNumber(`${subResult}`)
  }, [formula])

  const clean = () => {
    setNumber('0');
    setPreviusNumber('0');
    lastOperation.current = undefined;
    setFormula('');
  }

  const deleteOperation = () => {

    let currentSign = '';
    let temporalNumber = number;

    if (number.includes('-')) {
      currentSign = '-';
      temporalNumber = number.substring(1);
    }

    if (temporalNumber.length > 1) {
      return setNumber(currentSign + temporalNumber.slice(0, -1))
    }

    setNumber('0')

  }

  const toggleSing = () => {
    if (number.includes('-')) {
      return setNumber(number.replace('-', ''));
    };

    setNumber('-' + number)
  }

  const buildNumber = (numberString: string) => {

    if (number.includes('.') && numberString === '.') return;

    if (number.startsWith('0') || number.startsWith('-0')) {

      //punto decimal
      if (numberString === '.') {
        return setNumber(number + numberString);
      }

      //evaluar si es otro 0 y no hay punto
      if (numberString === '0' && number.includes('.')) {
        return setNumber(number + numberString);
      }

      //Evaluar si es diferente de 0 no hay punto decimal y es el primer numero
      if (numberString !== '0' && !number.includes('.')) {
        return setNumber(numberString)
      }

      // evitar el 00000
      if (numberString === '0' && !number.includes('.')) {
        return;
      }

      return setNumber(number + numberString);


    }

    setNumber(number + numberString)
  }

  const setLastNumber = () => {
    calculateResult();
    if (number.endsWith('.')) {
      setPreviusNumber(number.slice(0, 1))
    } else {
      setPreviusNumber(number)
    }

    setNumber('0')
  }

  const divideOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.divide;
  }

  const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multiply;
  }

  const subtractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.subtrac;
  }

  const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.add;
  }

  const calculateResult = () => {

    const result = calculateSubResult();
    setFormula(`${result}`);
    lastOperation.current = undefined;
    setPreviusNumber('0');

  }

  const calculateSubResult = (): number => {

    const [firstValue, operator, secondValue] = formula.split(' ');

    const num1 = Number(firstValue);
    const num2 = Number(secondValue);

    if( isNaN(num2) ) return num1;

    switch (lastOperation.current) {
      case Operator.add:
        return num1 + num2;

      case Operator.subtrac:
        return num1 - num2;

      case Operator.multiply:
        return num1 * num2;

      case Operator.divide:
        return num1 / num2;

      default:
        throw new Error('Operation not implemented')
    }

  }


  return {
    // properties
    number,
    previusNumber,
    formula,
    //methods
    buildNumber,
    clean,
    deleteOperation,
    toggleSing,
    divideOperation,
    multiplyOperation,
    subtractOperation,
    addOperation,
    calculateResult,
  }

}
