🍎 Frutería Inventory Dashboard

Dashboard web para la gestión integral de inventario de una frutería, desarrollado como aplicación administrativa moderna.
Permite controlar productos, registrar movimientos de inventario, monitorear stock y caducidad, y visualizar métricas clave en tiempo real.

El proyecto pone énfasis en arquitectura clara, experiencia de usuario, accesibilidad y consistencia visual, utilizando tecnologías frontend actuales.

⸻

✨ Características destacadas
	•	📊 Dashboard ejecutivo con métricas clave
	•	📦 CRUD de productos con validaciones y confirmaciones
	•	➕ Entradas que incrementan stock automáticamente
	•	➖ Salidas con validación para evitar stock negativo
	•	⏰ Control de caducidad con indicadores visuales
	•	🎨 Interfaz moderna (tema oscuro, alto contraste)
	•	♿ Accesible y usable (labels, feedback, navegación por teclado)

⸻

🧭 Alcance y objetivos

Este proyecto está orientado a escenarios donde se requiere:
	•	Visibilidad inmediata del estado del inventario
	•	Registro seguro de movimientos de productos
	•	Prevención de errores comunes (stock negativo, eliminaciones accidentales)
	•	Identificación rápida de productos críticos
	•	Interacción clara sin curva de aprendizaje

No está diseñado como sistema productivo, sino como base sólida y extensible para aplicaciones reales de inventario.

⸻

⚙️ Stack tecnológico

Frontend
	•	React
	•	Vite
	•	TypeScript
	•	Ant Design v5

Backend (simulado)
	•	JSON Server

UI / UX
	•	Tema oscuro con alto contraste
	•	Colores semánticos (éxito, advertencia, error)
	•	Componentes accesibles de Ant Design

⸻

## 🗂️ Estructura del proyecto

El proyecto está organizado por responsabilidades para facilitar
la mantenibilidad y escalabilidad.

```txt
fruteria-dashboard/
├── src/
│   ├── api/          # Cliente HTTP y configuración de axios
│   ├── pages/        # Vistas principales de la aplicación
│   ├── types/        # Tipos e interfaces TypeScript
│   ├── App.tsx       # Layout principal y navegación
│   └── main.tsx      # Punto de entrada de la aplicación
├── db.json           # Base de datos simulada (JSON Server)
├── package.json      # Dependencias y scripts
├── vite.config.ts    # Configuración de Vite
└── README.md         # Documentación del proyecto


⸻

🧩 Funcionalidades

Dashboard
	•	Stock total
	•	Productos por caducar
	•	Productos caducados
	•	Entradas y salidas recientes
	•	Tarjetas visuales con iconografía

Productos
	•	Alta, edición y eliminación
	•	Validaciones de formulario
	•	Búsqueda por nombre
	•	Indicadores visuales de stock bajo
	•	Confirmación antes de eliminar

Entradas
	•	Registro de ingresos de productos
	•	Actualización automática del stock
	•	Historial de entradas

Salidas
	•	Registro de egresos de productos
	•	Validación de stock disponible
	•	Bloqueo de inventario negativo

Caducidad
	•	Clasificación automática:
	•	Vigente
	•	Por caducar
	•	Caducado
	•	Indicadores visuales por color

⸻

♿ Accesibilidad
	•	Labels visibles en todos los formularios
	•	Mensajes claros de éxito, error y advertencia
	•	Buen contraste visual
	•	Navegación funcional mediante teclado
	•	Estados vacíos y de carga informativos

⸻

👤 Usabilidad
	•	Menú lateral persistente y claro
	•	Flujo de navegación sencillo
	•	Jerarquía visual consistente
	•	Reducción de carga cognitiva mediante señales visuales

⸻

🧪 Validaciones y control de errores
	•	No se permite stock negativo
	•	Formularios validados antes de enviar
	•	Confirmaciones en acciones destructivas
	•	Feedback inmediato al usuario

⸻

📦 Requisitos
	•	Node.js ≥ 18
	•	npm ≥ 9

⸻

🚀 Instalación

Clonar el repositorio:

git clone https://github.com/Rappu10/Fruteria-Dashboard.git

Entrar al proyecto:

cd fruteria-dashboard

Instalar dependencias:djays, axios y antd 

npm install


⸻

▶️ Ejecución

Backend (JSON Server)

npm run server

Servidor disponible en:

http://localhost:3001


⸻

Frontend (Vite)

npm run dev

Aplicación disponible en:

http://localhost:5173


⸻

📝 Notas técnicas
	•	El backend está simulado mediante JSON Server
	•	No requiere variables de entorno
	•	La arquitectura permite migrar fácilmente a un backend real
	•	El proyecto prioriza claridad y mantenibilidad

⸻

📄 Licencia

Proyecto desarrollado con fines académicos y demostrativos.

⸻

🧠 Comentario final (opcional, pero elegante)

Este proyecto demuestra la implementación de un dashboard administrativo aplicando buenas prácticas de frontend moderno, con énfasis en experiencia de usuario y accesibilidad.

⸻
