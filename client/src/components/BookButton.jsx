import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import SelectComponent from './SelectComponent'

const BookButton = () => {
  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = (e) => {
    setVisible(false)
  }

  return (
    <div>
      <Modal
        title='Book a product'
        visible={visible}
        okButtonProps={{
          type: 'default',
          onClick: () => {
            console.log('hello')
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
