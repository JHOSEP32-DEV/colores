# colores
Colores API and CLI application, developed in JAVA with Springboot and Angular 14.

- Introduccion
La App esta dividida en dos aplicaciones, el servidor que esta desarrollado con SprongBoot y el cliente desarrollado con Angular 13, el api consiste en servir
un listado de colores, y administrarlos (listar, crear, editar y eliminar), se tienen dos roles (User y Admin) tambien cuenta con autenticacion por medio de JWT.

- Tecnologias y Frameworks utilizados
Server
Springboot - 2.7.0
Dependencias
Son las que se usan por defecto para una app de este estilo, se utilizo H2 en este caso por cuestiones de tiempo me parece que es mas rapida de implementar,
use una libreria para la autenticacion por medio de JWT, Spring Security para la cuestion de los roles y permisos, las versiones son las ultimas estables para la
version utilizada de spring asi que no fue necesario especificarlas

spring-boot-starter-data-jpa
spring-boot-starter-web
spring-boot-devtools
h2
spring-boot-starter-thymeleaf
spring-boot-starter-security
thymeleaf-extras-springsecurity5
lombok
jjwt
spring-boot-starter-test
validation-api
hibernate-validator
javax.el

Cliente
Angular 13
Dependencias
Solo se usaron estas dependencias externas para el diseño y para las alertas de resto todo se hizo con el kit de angular.

ng-bootstrap - v12.1.2
bootstrap - v5.1.3
sweetalert2 - v11.4.17
ngx-sweetalert2 - v11.0.0

En este cliente debido a la falta del refresco en el server solo se usó una función
para el handler de los errores, pero en un caso más completo se debería usar un
HttpInterceptor para hacer el respectivo refresco y re-call de las peticiones, se hizo asi por el corto tiempo.

- Instrucciones de instalacion de dependencias y despliegue del proyecto
Para compilar el proyecto de java solo es necesario ir en la raiz del proyecto y ejecutar el comando 'mvn clean install', el generara un war que debe ser ejecutado 
con el comando 'java -jar colores-api-0.0.1-SNAPSHOT.war' y arrancara la app en el puerto 8080, de igual manera el war compilado esta incluido en el zip subido.

Para compilar el proyecto angular solo es abrirlo y ejecutar 'npm i' para instalar las dependencias y luego ejecutar 'ng serve' esto arrancara la app en el 
puerto 4200 y para compilarla a produccion solo es ejecutar 'npm run prod' esto creara los archivos de produccion en la carpeta dist/colores-cli y se puede
ejecutar en cualquier server http, estos compilados tambien los adjuntare en el zip a entregar.

- Url del repositorio git
Cree un repositorio publico en GitHub, ahi pueden ver los commits y todo el source del proyecto.
https://github.com/JHOSEP32-DEV/colores

- Credenciales del usuario y administrador
Las credenciales de la base de datos H2 que se accede desde 'http://localhost:8080/h2-console' son:
driver: org.h2.Driver
url: jdbc:h2:mem:colores
user: admin
password: password

Por defecto estan creados 2 usuarios Admin y User, asimismo los roles USER y ADMIN, la tabla users_roles y unos datos en la tabla colors.
Las credenciales son:
Usuario ADMIN:
user: admin
password: password

Usuario User:
user: user
password: password

Tambien dejare en la raiz del proyecto un JSON que exporta PostMan con los endpoint del API detallados y listos para ejecutarse.

Las llamadas al API deben hacerse con el request header de autorización asi:
Authorization: Bearer {token}

En el WebSecurityConfig quedaron los host permitidos en la configuracion de CORS asi: 'http://localhost:4200, http://localhost:8081, http://localhost',
asimismo las rutas restringidas para los diferentes roles segun el requerimiento.

Cabe resaltar que suelo programar en ingles así que las tablas, variables y todo el
código está en inglés, espero no sea un problema.
