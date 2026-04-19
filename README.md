 Frontend - App Student (Angular)
📌 Descripción

Aplicación frontend desarrollada en Angular para la gestión de:

👨‍🎓 Estudiantes
🧑‍🏫 Asesores
📘 Materias

Incluye autenticación básica, manejo de roles (ADMIN / ADVISOR / STUDENT) y soporte de internacionalización (i18n ES/EN).

🧰 Tecnologías
Angular (Standalone Components)
TypeScript
RxJS
ngx-translate (i18n)
PrimeNG (UI)
Node.js (via NVM)
⚙️ Requisitos

Antes de iniciar, asegúrate de tener instalado:

NVM
Node.js 20.20.2
Angular CLI
🔧 Instalación
1. Clonar repositorio
git clone https://github.com/EdgarGtz25/app-student.git
cd app-student
2. Usar versión correcta de Node
nvm use 20.20.2
3. Instalar dependencias
npm install
▶️ Ejecución
npm start

o

ng serve
🌐 Acceso

Abrir en navegador:

👉 http://localhost:4200

🔗 Backend

El frontend consume el backend en:

👉 http://localhost:8080

⚠️ Asegúrate de que el backend esté corriendo.

🔐 Login de prueba
Usuario: admin
Password: 123456
🌍 Internacionalización (i18n)

Ubicación:

src/assets/i18n/

Idiomas soportados:

🇲🇽 Español (es.json)
🇺🇸 Inglés (en.json)
