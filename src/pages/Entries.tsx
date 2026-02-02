import { Button, Form, InputNumber, Modal, Select, Table, message } from "antd"
import { useEffect, useState } from "react"
import { api } from "../api/api"
import type Product from "../types/product"

interface Entry {
  id: number
  productId: number
  quantity: number
  date: string
}

export default function Entries() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()

  const loadData = async () => {
    const [entriesRes, productsRes] = await Promise.all([
      api.get("/entries"),
      api.get("/products")
    ])
    setEntries(entriesRes.data)
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

      // 1️⃣ Registrar entrada
      await api.post("/entries", {
        ...values,
        date: new Date().toISOString().slice(0, 10)
      })

      // 2️⃣ Actualizar stock
      await api.put(`/products/${product.id}`, {
        ...product,
        stock: product.stock + values.quantity
      })

      message.success("Entrada registrada y stock actualizado")
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
      render: (_: any, record: Entry) =>
        products.find(p => p.id === record.productId)?.name || "-"
    },
    { title: "Cantidad", dataIndex: "quantity" },
    { title: "Fecha", dataIndex: "date" }
  ]

  return (
    <>
      <h2>Entradas</h2>

      <Button type="primary" onClick={() => setOpen(true)} style={{ marginBottom: 16 }}>
        Registrar entrada
      </Button>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={entries}
      />

      <Modal
        open={open}
        title="Nueva entrada"
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
                  {p.name}
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