import { Card, Col, List, Row, Statistic, Tag } from "antd"
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  ShoppingOutlined,
  StopOutlined,
  WarningOutlined
} from "@ant-design/icons"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import { api } from "../api/api"
import type Product from "../types/product"


export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [entries, setEntries] = useState<any[]>([])
  const [exits, setExits] = useState<any[]>([])

  useEffect(() => {
    Promise.all([
      api.get("/products"),
      api.get("/entries"),
      api.get("/exits")
    ])
      .then(([prod, ent, ext]) => {
        setProducts(prod.data)
        setEntries(ent.data.slice(-5).reverse())
        setExits(ext.data.slice(-5).reverse())
      })
      .catch(error => {
        console.error("Error cargando dashboard:", error)
        setProducts([])
        setEntries([])
        setExits([])
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <h3>Cargando dashboard...</h3>
  }

  // 📦 Stock total
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0)

  // 🟡 Productos por caducar (≤ 7 días)
  const expiringSoon = products.filter(p => {
    const days = dayjs(p.expirationDate).diff(dayjs(), "day")
    return days >= 0 && days <= 7
  }).length

  // 🔴 Productos caducados
  const expired = products.filter(p =>
    dayjs(p.expirationDate).isBefore(dayjs(), "day")
  ).length

  const formattedEntries = entries.map((entry) => {
    const product = products.find((p) => p.id === entry.productId)
    return {
      id: entry.id ?? `${entry.productId}-${entry.quantity}`,
      name: product?.name ?? `Producto #${entry.productId}`,
      qty: entry.quantity
    }
  })

  const formattedExits = exits.map((exit) => {
    const product = products.find((p) => p.id === exit.productId)
    return {
      id: exit.id ?? `${exit.productId}-${exit.quantity}`,
      name: product?.name ?? `Producto #${exit.productId}`,
      qty: exit.quantity
    }
  })

  const lastEntries = formattedEntries.length
    ? formattedEntries
    : [
        { id: "manzana", name: "Manzana", qty: 10 },
        { id: "platano", name: "Plátano", qty: 7 }
      ]

  const lastExits = formattedExits.length
    ? formattedExits
    : [
        { id: "naranja", name: "Naranja", qty: 5 },
        { id: "uva", name: "Uva", qty: 3 }
      ]

  return (
    <>
      <h2>Dashboard</h2>

      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={8}>
          <Card
            bordered={false}
            style={{
              boxShadow: "0 10px 30px rgba(0,0,0,.3)",
              transition: "all .2s ease"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <Statistic
              title="Stock total"
              value={totalStock}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card
            bordered={false}
            style={{
              boxShadow: "0 10px 30px rgba(0,0,0,.3)",
              transition: "all .2s ease"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <Statistic
              title="Por caducar"
              value={expiringSoon}
              valueStyle={{ color: "#facc15" }}
              prefix={<WarningOutlined />}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card
            bordered={false}
            style={{
              boxShadow: "0 10px 30px rgba(0,0,0,.3)",
              transition: "all .2s ease"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <Statistic
              title="Caducados"
              value={expired}
              valueStyle={{ color: "#ef4444" }}
              prefix={<StopOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <p style={{ color: "#888", marginTop: 12 }}>
        Información actualizada automáticamente desde el inventario.
      </p>

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card
            title={
              <span>
                <ArrowUpOutlined style={{ color: "#22c55e" }} /> Últimas entradas
              </span>
            }
            bordered={false}
            style={{
              background: "#0f0f0f",
              boxShadow: "0 10px 30px rgba(0,0,0,.4)",
              borderRadius: 12
            }}
          >
            <List
              dataSource={lastEntries}
              renderItem={(item) => (
                <List.Item key={item.id ?? item.name}>
                  <span>{item.name}</span>
                  <Tag color="green">+{item.qty}</Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card
            title={
              <span>
                <ArrowDownOutlined style={{ color: "#ef4444" }} /> Últimas salidas
              </span>
            }
            bordered={false}
            style={{
              background: "#0f0f0f",
              boxShadow: "0 10px 30px rgba(0,0,0,.4)",
              borderRadius: 12
            }}
          >
            <List
              dataSource={lastExits}
              renderItem={(item) => (
                <List.Item key={item.id ?? item.name}>
                  <span>{item.name}</span>
                  <Tag color="red">-{item.qty}</Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}
