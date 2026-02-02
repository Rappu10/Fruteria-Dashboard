import { Table, Tag } from "antd"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import { api } from "../api/api"
import type Product from "../types/product"

export default function Expiration() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data))
  }, [])

  const getStatus = (date: string) => {
    const days = dayjs(date).diff(dayjs(), "day")

    if (days < 0) {
      return <Tag color="red">Caducado</Tag>
    }
    if (days <= 7) {
      return <Tag color="gold">Por caducar</Tag>
    }
    return <Tag color="green">Vigente</Tag>
  }

  const columns = [
    { title: "Producto", dataIndex: "name" },
    { title: "Stock", dataIndex: "stock" },
    { title: "Fecha de caducidad", dataIndex: "expirationDate" },
    {
      title: "Estado",
      render: (_: any, record: Product) =>
        getStatus(record.expirationDate)
    }
  ]

  return (
    <>
      <h2>Control de Caducidad</h2>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={products}
      />
    </>
  )
}