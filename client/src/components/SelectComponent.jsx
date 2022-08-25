import React, { useContext, useEffect, useState } from 'react'
import { Select, DatePicker } from 'antd'
import { MainContext } from '../App'
import moment from 'moment'

const { Option } = Select

const dateFormat = 'YYYY-MM-DD'

const SelectComponent = () => {
  const { data, setBookingInfo, bookingInfo } = useContext(MainContext)

  const [datePickerFromDisabale, setDatePickerFromDisabale] = useState(true)
  const [datePickerToDisabale, setDatePickerToDisabale] = useState(true)
  const [selectedPorduct, setSelectedProduct] = useState(null)
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  const [dayDiff, setDayDiff] = useState(0)
  const [minDiffDay, setMinDiffDay] = useState(1)

  const pickDateFromHandler = (momentObj) => {
    if (momentObj !== null) {
      const pickedFromDate = momentObj
      const today = moment()

      setDayDiff(pickedFromDate.diff(today, 'days') + 1)

      setDatePickerToDisabale(false)
      setFromDate(momentObj)
      setBookingInfo({
        ...bookingInfo,
        from: `${momentObj.date()}-${
          momentObj.month() + 1
        }-${momentObj.year()}`,
      })
    } else {
      setDatePickerToDisabale(true)
    }
  }

  const disabledDateFrom = (current) => {
    return current && current < moment().endOf('day')
  }

  const disabledDateTo = (current) => {
    return current && current < moment().add(dayDiff + minDiffDay, 'days')
  }

  const handleChange = (value) => {
    const prod = data.filter((d) => d.code === value)
    setMinDiffDay(prod[0].minimum_rent_period)
    setSelectedProduct(prod[0])
    setDatePickerFromDisabale(false)
    setBookingInfo({
      ...bookingInfo,
      id: prod[0].id,
      name: prod[0].name,
      from: `${moment(moment().add(1, 'day'), dateFormat).date()}-${
        moment(moment().add(1, 'day'), dateFormat).month() + 1
      }-${moment(moment().add(1, 'day'), dateFormat).year()}`,
    })
  }

  // calculting rental duration

  useEffect(() => {
    if (fromDate && toDate) {
      const pickedFromDate = fromDate
      const pickedToDate = toDate

      let duration = pickedToDate.diff(pickedFromDate, 'days') + 1

      setBookingInfo({
        ...bookingInfo,
        duration: duration,
        rent: duration * selectedPorduct.price,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, toDate, selectedPorduct])

  return (
    <div>
      <Select
        defaultValue={'Select A product'}
        style={{
          width: '100%',
        }}
        onChange={handleChange}
      >
        {data.map((d) => (
          <Option value={d.code} key={d.code} disabled={!d.availability}>
            {d.name}
          </Option>
        ))}
      </Select>

      <div className='time_picker mt-2'>
        <DatePicker
          disabledDate={disabledDateFrom}
          format='YYYY-MM-DD'
          placeholder='From'
          defaultValue={moment(moment().add(1, 'day'), dateFormat)}
          onChange={(val) => pickDateFromHandler(val)}
          disabled={datePickerFromDisabale}
        />

        <DatePicker
          className='ml-1'
          disabledDate={disabledDateTo}
          format='YYYY-MM-DD'
          placeholder='To'
          disabled={datePickerToDisabale}
          onChange={(val) => {
            if (val !== null) {
              setToDate(val)
              setBookingInfo({
                ...bookingInfo,
                to: `${val.date()}-${val.month() + 1}-${val.year()}`,
              })
            } else {
              setBookingInfo({
                ...bookingInfo,
                to: null,
              })
            }
          }}
        />
      </div>
    </div>
  )
}

export default SelectComponent
