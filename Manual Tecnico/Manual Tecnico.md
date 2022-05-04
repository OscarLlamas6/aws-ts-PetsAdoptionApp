# Manual Técnico.

## Objetivos

- Adopción de perros y gatos rescatados.
- Los usuarios podrán aplicar para adopción de unas macota.
- Listado de mascotas para adopción.
- Escoger la mejor opción para que adopte la mascota.

## Descripción del proyecto

### Pet Rescue:

Servicio de adopción de perros y gatos que han sido rescatados, se contará con una sección donde los usuarios registrados podrán aplicar para adoptar alguna mascota disponible, dentro de la aplicación habrá un catalago donde se mostrará cada mascota, en nuestra aplicación varias personas podrán postularse para adoptar una mascota, luego de elegir quien es el mejor candidato para adoptar la mascota, este será notificado, y a las personas que no calificaron se les notificará de esto, y se les mostrará nuevas recomendaciones para su adopción.

## Descripción de la arquitectura utilizada

### Página web

Se realizó el frontend de la aplicación con REACT subida en un bucket de S3 público

### Server

Se realizó un backend con Node Js, montado en una instancia EC2.

### Bucket imágenes

Se configuró un bucket en S3 para el alojamiento de las imágenes de manera pública para poder acceder a ellas a través de la página web.

### Base de datos

Se trabajó con MySql almacenada en una instancia RDS.

## Presupuesto del proyecto

Se tomó en cuenta un valor estimado de $15 dolares en AWS para el alojamiento y funcionamiento correcto de nuestro proyecto. 

**Distribuyendose de la siguiente forma:**

- $12 Dolares de instancias EC2 por el manejo de Docker lo cual no era posible con el espacio de la capa gratuita, siendo un aproximado de 2 dolares por día.
- $1 Dolar de alojamiento de RDS nuestra base de datos MySQL
- $1 Dolar de Lambda
- $1 Dolar de otros.

A la fecha se ha distribuido de la siguiente forma:

![Captura de Pantalla 2022-05-03 a la(s) 22.53.23.png](Manual%20Te%CC%81cnico%20a7f14089ba7b448198c979826fdbd3db/Captura_de_Pantalla_2022-05-03_a_la(s)_22.53.23.png)

![Captura de Pantalla 2022-05-03 a la(s) 23.04.28.png](Manual%20Te%CC%81cnico%20a7f14089ba7b448198c979826fdbd3db/Captura_de_Pantalla_2022-05-03_a_la(s)_23.04.28.png)

## Investigación de Servicios Utilizados

### AWS Lambda

AWS Lambda es un servicio informático sin servidor que ejecuta código como respuesta a eventos y administra automáticamente los recursos informáticos subyacentes. Estos eventos pueden ser cambios de estado o una actualización, como que un usuario coloque un artículo en un carrito de la compra en un sitio web de comercio electrónico.

### Amazon API Gateway

Amazon API Gateway es un servicio completamente administrado que facilita a los desarrolladores la creación, la publicación, el mantenimiento, el monitoreo y la protección de API a cualquier escala.

### Amazon S3

Es un servicio de almacenamiento de objetos que ofrece escalabilidad, disponibilidad de datos, seguridad y rendimiento líderes en el sector. Clientes de todos los tamaños y sectores pueden almacenar y proteger cualquier cantidad de datos para prácticamente cualquier caso de uso, como los lagos de datos, las aplicaciones nativas en la nube y las aplicaciones móviles.

### Amazon EC2

Amazon Elastic Compute Cloud (Amazon EC2) ofrece la plataforma de computación más amplia y profunda, con más de 500 instancias y la posibilidad de elegir el procesador, almacenamiento, redes, sistema operativo y modelo de compra más reciente para que pueda a ajustarla al máximo a las necesidades de su carga de trabajo.