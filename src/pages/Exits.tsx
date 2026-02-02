import { Button, Form, InputNumber, Modal, Select, Table, message } from "antd"
import { useEffect, useState } from "react"
import { api } from "../api/api"
import type Product from "../types/product"

interface Exit {
  id: number
  productId: number
  quantity: number
  date: string
}

export default function Exits() {
  const [exits, setExits] = useState<Exit[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()

  const loadData = async () => {
    const [exitsRes, productsRes] = await Promise.all([
      api.get("/exits"),
      api.get("/products")
    ])
    setExits(exitsRes.data)
    setProducts(productsRes.data)
  }

  useEffect(() => {
    loadData()
  }, [])

  const onCreate = async () => {
    try {
      const values = await form.validateFields()
      const product = products.find(p => p.id === values.productId)

      if (!product) {
        message.error("Producto no encontrado")
        return
      }

      if (values.quantity > product.stock) {
        message.error("Stock insuficiente")
        return
      }

      // 1️⃣ Registrar salida
      await api.post("/exits", {
        ...values,
        date: new Date().toISOString().slice(0, 10)
      })

      // 2️⃣ Actualizar stock
      await api.put(`/products/${product.id}`, {
        ...product,
        stock: product.stock - values.quantity
      })

      message.success("Salida registrada y stock actualizado")
      form.resetFields()
      setOpen(false)
      loadData()
    } catch {
      message.error("Revisa los campos")
    }
  }

  const columns = [
    {
      title: "Producto",
      render: (_: any, record: Exit) =>
        products.find(p => p.id === record.productId)?.name || "-"
    },
    { title: "Cantidad", dataIndex: "quantity" },
    { title: "Fecha", dataIndex: "date" }
  ]

  return (
    <>
      <h2>Salidas</h2>

      <Button type="primary" onClick={() => setOpen(true)} style={{ marginBottom: 16 }}>
        Registrar salida
      </Button>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={exits}
      />

      <Modal
        open={open}
        title="Nueva salida"
        onCancel={() => setOpen(false)}
        onOk={onCreate}
        okText="Guardar"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="productId"
            label="Producto"
            rules={[{ required: true, message: "Selecciona un producto" }]}
          >
            <Select placeholder="Selecciona">
              {products.map(p => (
                <Select.Option key={p.id} value={p.id}>
                  {p.name} (Stock: {p.stock})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Cantidad"
            rules={[{ required: true, message: "Ingresa una cantidad" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}