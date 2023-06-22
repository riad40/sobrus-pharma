import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { FONT_SIZE_14 } from '../../constants/fontsSizes'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

interface DatePickerProps {
    setDate: (date: string) => void
}

const DatePicker = ({ setDate }: DatePickerProps): JSX.Element => {
    const [show, setShow] = useState<boolean>(false)

    const date = new Date()

    let formattedDateAndTime =
        date.getDate() +
        '-' +
        (date.getMonth() + 1) +
        '-' +
        date.getFullYear() +
        ' ' +
        date.getHours() +
        ':' +
        date.getMinutes()

    const [selectedDate, setSelectedDate] = useState<string>(formattedDateAndTime)

    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date): void => {
        const currentDate = selectedDate

        formattedDateAndTime = currentDate
            ? currentDate.getDate() +
              '-' +
              (currentDate.getMonth() + 1) +
              '-' +
              currentDate.getFullYear() +
              ' ' +
              currentDate.getHours() +
              ':' +
              currentDate.getMinutes()
            : formattedDateAndTime

        setShow(false)
        setDate(formattedDateAndTime)
        setSelectedDate(formattedDateAndTime)
    }

    return (
        <>
            <TouchableOpacity style={styles.dateContainer} onPress={() => setShow(!show)}>
                <Text style={styles.dateText}>{selectedDate}</Text>
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    value={date}
                    mode={'date'}
                    display="default"
                    onChange={handleDateChange}
                    style={styles.datePicker}
                    is24Hour={true}
                />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    datePicker: {
        width: wp(90),
        height: hp(5),
        fontSize: FONT_SIZE_14,
        color: '#000000',
        paddingHorizontal: wp(2)
    },
    dateContainer: {
        width: '90%',
        height: hp(6),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(3)
    },
    dateText: {
        fontSize: FONT_SIZE_14,
        color: '#000000'
    }
})

export default DatePicker
