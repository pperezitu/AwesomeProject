import { useEffect, useRef, useState } from 'react';


enum Operator {
    add = '+',
    subtract = '-',
    multiply = '*',
    divide = '÷'
}

export const useCalculator = () => {

    const [formula, setFormula] = useState('');

    const [number, setNumber] = useState('0');
    const [prevNumber, setPrevnumber] = useState('0');

    const lastOperations = useRef<Operator>();

    useEffect(() => {
        if(lastOperations.current) {
            const firstFormulaPart = formula.split(' ').at(0); 
            setFormula(`${firstFormulaPart} ${lastOperations.current} ${number}`)
        } else {
            setFormula(number);
        }
    }, [number]);

    useEffect(() => {
        const subResult = calculateSubResult();
        setPrevnumber(`${subResult}`);
    }, [number]);

    const clean = () => {
        setNumber('0');
        setPrevnumber('0');
        lastOperations.current = undefined;
        setFormula('');
    }

    // Borrar el último número
    const deleteOperation = () => {
        let currentSign = '';
        let temporalNumber = number;

        if (number.includes('-')) {
            currentSign = '-';
            temporalNumber = number.substring(1); // 88
        }

        if (temporalNumber.length > 1) {
            return setNumber(currentSign + temporalNumber.slice(0, -1)); // 
        }

        setNumber('0');
    }

    const toogleSing = () => {
        if (number.includes('-')) {
            return setNumber(number.replace('-', ''))
        }
        setNumber('-' + number);
    }

    const buildNumber = (numberString: string) => {
        if (number.includes('.') && numberString === '.') return;

        if (number.startsWith('0') || number.startsWith('-0')) {

            // punto decimal
            if (numberString === '.') {
                return setNumber(number + numberString);
            }

            // evaluar si es otro cero y no hay punto
            if (numberString === '0' && number.includes('.')) {
                return setNumber(number + numberString);
            }

            // evaluar si es diferente de cero, no hay punto y es el primer numero
            if (numberString !== '0' && !number.includes('.')) {
                return setNumber(numberString)
            }

            // evitar el 00000
            if (numberString === '0' && !number.includes('.')) {
                return;
            }

            return setNumber(number + numberString)
        }
        setNumber(number + numberString)
    }

    const setLastNumber = () => {
        calculateResult();
        if (number.endsWith('.')) {
            setPrevnumber(number.slice(0. - 1));
        } else {
            setPrevnumber(number);
        }
        setNumber('0');
    }

    const divideOperator = () => {
        setLastNumber();
        lastOperations.current = Operator.divide;
    }

    const multiplyOperator = () => {
        setLastNumber();
        lastOperations.current = Operator.multiply;
    }

    const substractOperator = () => {
        setLastNumber();
        lastOperations.current = Operator.subtract;
    }

    const addOperator = () => {
        setLastNumber();
        lastOperations.current = Operator.add;
    }

    const calculateResult = () => {
        const result = calculateSubResult();
        setFormula(`${ result }`);
        lastOperations.current = undefined;
        setPrevnumber('0')
    }

    const calculateSubResult = ():number => {

        const [firstValue, operation, secondValue] = formula.split(' ');

        const num1 = Number(firstValue);
        const num2 = Number(secondValue);

        if( isNaN(num2)) return num1;

        switch(operation) {
            case Operator.add:
                return num1 + num2;
            
            case Operator.subtract:
                return num1 - num2;

            case Operator.multiply:
                return num1 * num2;

            case Operator.divide:
                return num1 / num2;

            default:
                throw new Error('Operación sin implementar');
        }
    }

    return {
        // propiedades
        number,
        prevNumber,
        formula,
        // Metodos
        buildNumber,
        toogleSing,
        clean,
        deleteOperation,
        divideOperator,
        multiplyOperator,
        substractOperator,
        addOperator,
        calculateResult
    }
}