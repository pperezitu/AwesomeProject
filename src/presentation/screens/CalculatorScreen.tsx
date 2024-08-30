import { Pressable, Text, View } from "react-native"
import { colors, globalStyles } from "../theme/app-theme"
import { CalculatorButton } from "../components/CalculatorButton"
import { useCalculator } from "../hooks/useCalculator"

export const CalculatorScreen = () => {

    const {
        formula, number, buildNumber, toogleSing, clean, deleteOperation, divideOperator, multiplyOperator, substractOperator, addOperator, prevNumber, calculateResult
    } = useCalculator();
    return (
        <View style={globalStyles.calculatorContainer}>
            <View style={globalStyles.viewPaddings}>
                <Text 
                    adjustsFontSizeToFit 
                    numberOfLines={1} 
                    style={globalStyles.mainResult}>{formula}</Text>

                {
                (formula === prevNumber)
                ? <Text style={globalStyles.subResult}> </Text>
                : (
                    <Text 
                        adjustsFontSizeToFit 
                        numberOfLines={1} 
                        style={globalStyles.subResult}>
                            { (prevNumber === '0') ? ' ' : prevNumber }
                    </Text>                    
                )
            }
            </View>
            <View style={globalStyles.row}>
                <CalculatorButton onPress={clean} label="C" color={colors.lightGray} blackText />
                <CalculatorButton onPress={toogleSing} label="+/-" color={colors.lightGray} blackText />
                <CalculatorButton onPress={deleteOperation} label="del" color={colors.lightGray} blackText />
                <CalculatorButton onPress={divideOperator} label="÷" color={colors.orange} blackText />
            </View>
            <View style={globalStyles.row}>
                <CalculatorButton onPress={() => buildNumber('7')} label="7" />
                <CalculatorButton onPress={() => buildNumber('8')} label="8" />
                <CalculatorButton onPress={() => buildNumber('9')} label="9" />
                <CalculatorButton onPress={multiplyOperator} label="×" color={colors.orange} />
            </View>
            <View style={globalStyles.row}>
                <CalculatorButton onPress={() => buildNumber('4')} label="4" />
                <CalculatorButton onPress={() => buildNumber('5')} label="5" />
                <CalculatorButton onPress={() => buildNumber('6')} label="6" />
                <CalculatorButton onPress={substractOperator} label="-" color={colors.orange} />
            </View>
            <View style={globalStyles.row}>
                <CalculatorButton onPress={() => buildNumber('1')} label="1" />
                <CalculatorButton onPress={() => buildNumber('2')} label="2" />
                <CalculatorButton onPress={() => buildNumber('3')} label="3" />
                <CalculatorButton onPress={addOperator} label="+" color={colors.orange} />
            </View>
            <View style={globalStyles.row}>
                <CalculatorButton onPress={() => buildNumber('0')} label="0" doubleSize />
                <CalculatorButton onPress={() => buildNumber('.')} label="." />
                <CalculatorButton onPress={calculateResult} label="=" color={colors.orange} />
            </View>
        </View>
    )
}