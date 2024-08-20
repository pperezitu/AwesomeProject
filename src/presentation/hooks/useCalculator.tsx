import { useRef, useState } from 'react';

enum Operator {
    add,
    subtract,
    multiply,
    divide
}

export const useCalculator = () => {

    const [number, setNumber] = useState('0');
    const [prevNumber, setPrevnumber] = useState('0');

    const lastOperations = useRef<Operator>();

    const clean = () => {
        setNumber('0');
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

    return {
        // propiedades
        number,
        prevNumber,
        // Metodos
        buildNumber,
        toogleSing,
        clean,
        deleteOperation,
        divideOperator,
        multiplyOperator,
        substractOperator,
        addOperator
    }
}