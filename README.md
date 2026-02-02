
🍎 Frutería Dashboard

Aplicación web para la gestión de inventario de una frutería, desarrollada como dashboard administrativo.
El sistema permite controlar productos, registrar entradas y salidas, monitorear stock y caducidad, y visualizar información clave mediante indicadores claros y accesibles.

El proyecto prioriza usabilidad, accesibilidad y claridad visual, siguiendo buenas prácticas de diseño de interfaces y arquitectura frontend.

⸻

📌 Alcance del proyecto

Este dashboard está diseñado para un entorno de gestión básica, donde el usuario necesita:
	•	Conocer el estado general del inventario de forma inmediata
	•	Registrar movimientos de productos sin riesgo de error
	•	Identificar productos con bajo stock o cercanos a caducar
	•	Evitar inconsistencias como stock negativo
	•	Navegar el sistema de manera simple e intuitiva

⸻

⚙️ Stack tecnológico
	•	Frontend
	•	React
	•	Vite
	•	TypeScript
	•	Ant Design v5
	•	Backend (simulado)
	•	JSON Server
	•	Estilos
	•	Tema oscuro con alto contraste
	•	Componentes accesibles de Ant Design

⸻

🗂️ Arquitectura del proyecto

fruteria-dashboard/
├── src/
│   ├── api/            # Configuración de cliente HTTP
│   ├── pages/          # Vistas principales (Dashboard, Productos, etc.)
│   ├── types/          # Tipos TypeScript
│   ├── assets/         # Recursos visuales
│   ├── App.tsx         # Layout y navegación principal
│   ├── main.tsx        # Punto de entrada
│   └── index.css       # Estilos globales
├── db.json             # Base de datos simulada
├── package.json
├── vite.config.ts
└── README.md


⸻

🧩 Funcionalidades

Dashboard
	•	Visualización del stock total
	•	Indicadores de productos por caducar y caducados
	•	Listado de entradas y salidas recientes
	•	Información actualizada automáticamente desde el inventario

Gestión de productos
	•	Alta, edición y eliminación de productos
	•	Validaciones en formularios
	•	Confirmación antes de eliminar registros

Entradas
	•	Registro de entradas de productos
	•	Incremento automático del stock
	•	Mensajes de confirmación

Salidas
	•	Registro de salidas
	•	Validación para evitar stock negativo
	•	Mensajes de advertencia en acciones inválidas

Caducidad
	•	Clasificación de productos:
	•	Vigentes
	•	Por caducar
	•	Caducados
	•	Indicadores visuales por color

⸻

♿ Accesibilidad

El sistema cumple con principios básicos de accesibilidad:
	•	Labels visibles y asociados a cada campo
	•	Mensajes claros de error, éxito y advertencia
	•	Buen contraste entre texto y fondo
	•	Navegación funcional mediante teclado
	•	Uso de componentes accesibles de Ant Design

⸻

👤 Usabilidad
	•	Menú lateral claro y persistente
	•	Flujo de navegación sencillo y predecible
	•	Información priorizada mediante tarjetas y colores semánticos
	•	Reducción de carga cognitiva en acciones frecuentes

⸻

🧪 Validaciones y control de errores
	•	No se permite stock negativo
	•	Formularios con validación previa al envío
	•	Confirmación en acciones destructivas
	•	Mensajes comprensibles para el usuario final

⸻

📦 Requisitos del sistema
	•	Node.js v18 o superior
	•	npm v9 o superior

⸻

🚀 Instalación
	1.	Clonar el repositorio:

git clone <URL_DEL_REPOSITORIO>

	2.	Acceder al directorio del proyecto:

cd fruteria-dashboard

	3.	Instalar dependencias:

npm install


⸻

▶️ Ejecución del proyecto

Iniciar el backend (JSON Server)

npm run server

Esto levantará el servidor en:

http://localhost:3001


⸻

Iniciar el frontend (Vite)

npm run dev

La aplicación estará disponible en:

http://localhost:5173


⸻

📝 Notas adicionales
	•	El backend está simulado mediante JSON Server y no requiere configuración adicional
	•	El proyecto está orientado a prácticas de diseño de experiencia de usuario y no a un entorno productivo
	•	La estructura permite escalar fácilmente a un backend real

⸻

📄 Licencia

Proyecto desarrollado con fines académicos.

⸻
