import { Layout, Menu } from "antd"
import {
  DashboardOutlined,
  AppstoreOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  ClockCircleOutlined
} from "@ant-design/icons"
import { useState } from "react"

import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import Entries from "./pages/Entries"
import Exits from "./pages/Exits"
import Expiration from "./pages/Expiration"

const { Sider, Content } = Layout

export default function App() {
  const [view, setView] = useState("dashboard")

  const renderView = () => {
    switch (view) {
      case "products": return <Products />
      case "entries": return <Entries />
      case "exits": return <Exits />
      case "expiration": return <Expiration />
      default: return <Dashboard />
    }
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div
          style={{
            color: "white",
            textAlign: "center",
            padding: "20px 0",
            fontWeight: "bold",
            fontSize: 18,
            letterSpacing: 1
          }}
        >
          🍏 FRUTERÍA
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          onClick={(e) => setView(e.key)}
          items={[
            { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
            { key: "products", icon: <AppstoreOutlined />, label: "Productos" },
            { key: "entries", icon: <PlusCircleOutlined />, label: "Entradas" },
            { key: "exits", icon: <MinusCircleOutlined />, label: "Salidas" },
            { key: "expiration", icon: <ClockCircleOutlined />, label: "Caducidad" }
          ]}
        />
      </Sider>

      <Layout>
        <Content style={{ padding: 24 }}>
          {renderView()}
        </Content>
      </Layout>
    </Layout>
  )
}
