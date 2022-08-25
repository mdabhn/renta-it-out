import React, { useContext, useEffect, useState } from 'react'
import { Button, message, Modal } from 'antd'
import SelectComponent from './SelectComponent'
import { MainContext } from '../App'

const BookButton = () => {
  const { bookingInfo, setUpdate, update } = useContext(MainContext)

  const [visible, setVisible] = useState(false)
  const [confirmVisible, setConfirmVisible] = useState(false)
  const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(true)
  const [btnDisabled, setBtnDisabled] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = (e) => {
    setVisible(false)
  }

  const handleCancelConfirm = (e) => {
    setConfirmVisible(false)
  }

  const handleBooking = () => {
    setBtnDisabled(true)
    fetch(`${process.env.REACT_APP_BASE_URL}/v1/rental/book`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...bookingInfo,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 201) {
          setUpdate(!update)
          setConfirmVisible(false)
          setVisible(false)
          message.success('Your Booking has been placed')
        }
        setBtnDisabled(false)
      })
      .catch((err) => {
        setBtnDisabled(false)
        console.log(err)
      })
  }

  // Checking of all the data is available to book or not
  useEffect(() => {
    for (const key in bookingInfo) {
      if (bookingInfo[key] === null) return
    }
    setConfirmButtonDisabled(false)
  }, [bookingInfo])

  return (
    <div>
      <Modal
        title='Confirm Booking'
        visible={confirmVisible}
        okButtonProps={{
          type: 'default',
          onClick: () => {
            handleBooking()
          },
          disabled: btnDisabled,
        }}
        onCancel={handleCancelConfirm}
        okText={'Confirm'}
        cancelText={'No'}
      >
        <p>Product - {bookingInfo.name}</p>
        <p>Booking From - {bookingInfo.from}</p>
        <p>Booking To - {bookingInfo.to}</p>
        <p>Duration - {bookingInfo.duration}</p>
        <p>Total Rent - {bookingInfo.rent}</p>
      </Modal>

      <Modal
        title='Book a product'
        visible={visible}
        okButtonProps={{
          type: 'default',
          disabled: confirmButtonDisabled,
          onClick: () => {
            setConfirmVisible(true)
          },
        }}
        onCancel={handleCancel}
        okText={'Confirm'}
        cancelText={'No'}
      >
        <SelectComponent />
      </Modal>
      <Button onClick={showModal}>Book</Button>
    </div>
  )
}

export default BookButton
