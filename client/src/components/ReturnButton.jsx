import React, { useContext, useEffect, useState } from 'react'
import { Button, message, Modal, Select } from 'antd'
import { MainContext } from '../App'

const { Option } = Select

const ReturnButton = () => {
  const { update, setUpdate } = useContext(MainContext)

  const [visible, setVisible] = useState(false)
  const [data, setData] = useState([])
  const [isDisable, setIsDisable] = useState(false)
  const [selectedProd, setSelectedProd] = useState(null)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = (e) => {
    setVisible(false)
  }

  const changeHanler = (e) => {
    console.log(e)
    setSelectedProd(e)
  }

  const productReturnHandler = async () => {
    if (selectedProd === null) {
      message.warning('please select a prodcuct.')
      return
    }
    setIsDisable(true)

    fetch(`${process.env.REACT_APP_BASE_URL}/v1/rental/return`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: selectedProd,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 201) {
          message.success('request has been accepted')
          setUpdate(!update)
          setVisible(false)
          setSelectedProd(null)
        } else {
          message.warn('something went wrong..')
        }
        setIsDisable(false)
      })
      .catch((err) => {
        console.log(err)
        setIsDisable(false)
      })
  }

  useEffect(() => {
    if (visible === true) {
      fetch(`${process.env.REACT_APP_BASE_URL}/v1/rental/book`)
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            setData(res.data)
          } else {
            alert('Error while fetching')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [visible])

  return (
    <div>
      <Modal
        title='Return A Product'
        visible={visible}
        okButtonProps={{
          type: 'default',
          onClick: () => {
            productReturnHandler()
          },
          disabled: isDisable,
        }}
        onCancel={handleCancel}
        okText={'Confirm'}
        cancelText={'Exit'}
      >
        <Select
          defaultValue={'Select A product'}
          style={{
            width: '100%',
          }}
          onChange={changeHanler}
        >
          {data.map((d) => (
            <Option value={d.id} key={d.code}>
              {d.name}
            </Option>
          ))}
        </Select>
      </Modal>
      <Button onClick={showModal}>Return</Button>
    </div>
  )
}

export default ReturnButton
