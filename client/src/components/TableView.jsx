import { useContext, useEffect, useState } from 'react'

import { Table, Tag } from 'antd'
import { MainContext } from '../App'

const TableView = () => {
  const { data, setData, searchContext, update } = useContext(MainContext)
  const [loading, setLoading] = useState(true)
  const [productData, setProductData] = useState([])

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      sorter: {
        compare: (a, b) => a.code.localeCompare(b.code),
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      sorter: {
        compare: (a, b) => a.type.localeCompare(b.type),
      },
    },
    {
      title: 'Availability',
      dataIndex: 'availability',
      sorter: {
        compare: (a, b) => a.availability - b.availability,
      },
      render: (data, _) => {
        return (
          <>
            {data && !_.booked ? (
              <Tag color={'green'}>Availavle</Tag>
            ) : (
              <Tag color={'red'}>Not-Availavle</Tag>
            )}
          </>
        )
      },
    },
    {
      title: 'Durability',
      dataIndex: 'durability',
      sorter: {
        compare: (a, b) => a.durability - b.durability,
      },
      render: (data, _) => {
        return (
          <>
            {data} / {_.max_durability}
          </>
        )
      },
    },
    {
      title: 'Mileage',
      dataIndex: 'mileage',
      sorter: {
        compare: (a, b) => a.mileage - b.mileage,
      },
      render: (data) => {
        return <>{data === null ? 'N/A' : data}</>
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: {
        compare: (a, b) => a.price - b.price,
      },
    },
  ]

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/v1/rental/data`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setData(res.data)
          setProductData(res.data)
        } else {
          alert('Error while fetching')
        }
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [setData, update])

  useEffect(() => {
    if (searchContext.length !== 0) {
      setProductData(
        data.filter((d) =>
          d.name.toLowerCase().includes(searchContext.toLowerCase())
        )
      )
    } else {
      setProductData(data)
    }
  }, [searchContext, data])

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra)
  }

  return (
    <div className='table_container'>
      <Table
        columns={columns}
        rowKey={(data) => data.code}
        dataSource={productData}
        onChange={onChange}
        loading={loading}
        pagination={{
          pageSize: 10,
        }}
      />
    </div>
  )
}

export default TableView
