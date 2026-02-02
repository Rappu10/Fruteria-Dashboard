import { Badge, Button, Form, Input, InputNumber, Modal, Table, message } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { api } from "../api/api"
import type Product from "../types/product"

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [form] = Form.useForm()

  const loadProducts = async () => {
    setLoading(true)
    const res = await api.get("/products")
    setProducts(res.data)
    setLoading(false)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const onCreate = async () => {
    try {
      const values = await form.validateFields()

      if (editing) {
        await api.put(`/products/${editing.id}`, {
          ...editing,
          ...values
        })
        message.success("Producto actualizado")
      } else {
        await api.post("/products", values)
        message.success("Producto agregado")
      }

      form.resetFields()
      setEditing(null)
      setOpen(false)
      loadProducts()
    } catch {
      message.error("Revisa los campos")
    }
  }

  const onDelete = async (id: number) => {
    await api.delete(`/products/${id}`)
    message.success("Producto eliminado")
    loadProducts()
  }

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const columns = [
    { title: "Nombre", dataIndex: "name" },
    { title: "Precio", dataIndex: "price" },
    {
      title: "Stock",
      dataIndex: "stock",
      render: (value: number) =>
        value <= 5 ? (
          <Badge status="error" text={`Bajo (${value})`} />
        ) : value <= 10 ? (
          <Badge status="warning" text={`Medio (${value})`} />
        ) : (
          <Badge status="success" text={`OK (${value})`} />
        )
    },
    { title: "Caducidad", dataIndex: "expirationDate" },
    {
      title: "Acciones",
      render: (_: any, record: Product) => (
        <>
          <Button
            icon={<EditOutlined />}
            type="link"
            onClick={() => {
              setEditing(record)
              form.setFieldsValue(record)
              setOpen(true)
            }}
          >
            Editar
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            type="link"
            onClick={() => onDelete(record.id)}
          >
            Eliminar
          </Button>
        </>
      )
    }
  ]

  return (
    <>
      <h2>Gestión de Productos</h2>

      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => {
          form.resetFields()
          setEditing(null)
          setOpen(true)
        }}
      >
        Agregar producto
      </Button>

      <Input.Search
        placeholder="Buscar producto"
        style={{ width: 300, marginBottom: 16 }}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Table
        loading={loading}
        rowKey="id"
        columns={columns}
        dataSource={filteredProducts}
        style={{ transition: "all .2s ease" }}
      />

      <Modal
        open={open}
        title={editing ? "✏️ Editar producto" : "🧺 Nuevo producto"}
        okText="Guardar cambios"
        cancelText="Cancelar"
        centered
        onCancel={() => setOpen(false)}
        onOk={onCreate}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Nombre"
            rules={[{ required: true, message: "Campo obligatorio" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Precio"
            rules={[
              { required: true, message: "El precio es obligatorio" },
              { type: "number", min: 1, message: "Debe ser mayor a 0" }
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>

          <Form.Item
            name="expirationDate"
            label="Fecha de caducidad"
            rules={[{ required: true }]}
          >
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
