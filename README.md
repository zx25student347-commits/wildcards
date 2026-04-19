# Wildcards - Flujo de la aplicación

Resumen
-------
Pequeña explicación del flujo general de la aplicación Wildcards (Spring Boot + Thymeleaf).

Flujo general
-------------
- Usuario ↔ Interfaz: el usuario navega por páginas Thymeleaf y activos estáticos (css/js/img) para ver productos, autenticarse y gestionar el carrito.
- Controladores web: las rutas en `controllers.web` sirven vistas y delegan la lógica a los servicios.
- API y servicios: los controladores en `controllers.api` exponen endpoints REST (productos, carrito, pedidos, pagos) y usan los servicios (`services`) que contienen la lógica de negocio.
- Persistencia: los servicios usan repositorios JPA (`repositories`) para leer/escribir entidades (`models`) en la base de datos.
- Seguridad: el paquete `security` gestiona usuarios, roles y JWT/sesiones, restringiendo accesos (admin vs usuario).

Flujo de compra (resumen)
-------------------------
1. El usuario añade artículos al carrito (controlador web/API → `CarritoService` → repositorio).
2. Revisa el carrito y crea un pedido (`PedidoService`) que persiste `Pedido` y `PedidoItem`.
3. Para el pago, `PaymentController` integra con Stripe (u otro proveedor) para procesar la transacción.
4. Tras pago exitoso, se actualiza el estado del pedido y se notifica al usuario.

Diagrama (Mermaid)
------------------
Para visualizar este diagrama, abre el archivo en VSCode con una extensión Mermaid o en GitHub:

```mermaid
graph LR
  User((Usuario)) -->|Navega| Browser[Thymeleaf Templates / Static]
  Browser --> WebController[Controladores Web]
  Browser --> ApiController[Controladores API]

  WebController --> Service[Servicios]
  ApiController --> Service
  Service --> Repo[Repositorios JPA]
  Repo --> DB[(Base de datos)]

  Service -->|orquesta pago| PaymentController[PaymentController]
  PaymentController --> Stripe[(Proveedor de pago - Stripe)]

  Security[Seguridad / JWT / Roles] --- WebController
  Security --- ApiController

  Admin[Panel Admin] --> WebController
  User -->|Inicia sesión| Security

  classDef infra fill:#f9f,stroke:#333,stroke-width:1px;
  DB:::infra
  Stripe:::infra
```

Notas
-----
- Los controladores web sirven las páginas Thymeleaf y solo delegan la lógica principal a los servicios.
- Los controladores API ofrecen endpoints JSON para operaciones asíncronas (ej. llamadas desde JS del frontend).
- El servicio de almacenamiento (`FileSystemStorageService`) gestiona ficheros subidos si los hay (imágenes, etc.).


