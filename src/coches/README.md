# Ejercicio: CRUD de coches

Arranque: `npm start`. La aplicación abre ahora el ejercicio de coches.

Los dos ejemplos originales siguen en `src/components` y `src/services`.
El ejercicio nuevo está en `src/coches`, con su propio Global, servicio y componentes.

Se mantiene el patrón de clase de los ejemplos: Component, state, createRef,
componentDidMount, promesas con then/catch, Axios y Navigate.

- `/`: listado y eliminación con recarga de datos.
- `/create`: formulario para insertar.
- `/detalles/:id`: consulta del coche por ID.
- `/update/:id`: consulta inicial por ID y formulario para actualizar.

En UpdateCoche, componentDidMount llama a findCoche(this.props.id).
Los inputs reciben los datos de ese objeto mediante defaultValue. Al enviar,
se construye el objeto leyendo las referencias y se envía con PUT.

Los estilos se compilan con Tailwind CSS 3, integrado con react-scripts.
La configuración está en tailwind.config.js y las clases comunes en src/index.css.

API: https://apicorecrudcoches.azurewebsites.net/index.html
