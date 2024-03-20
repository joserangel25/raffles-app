## Levantar proyecto en desarrollo

1. Clonar el repositorio
2. Instalar dependencias ``` npm install```
3. Crear una copia del archivo ```.env.template``` a ```.env``` y configurar las variables de entorno
4. Levantar la base de datos ``` docker compose up -d```
5. Correr las migraciones de Prisma ```npx prisma migrate dev```
6. Ejecutar script seed ```npm run seed```
7. Correr el proyecto ``` npm run dev```


Nota: para poder mandar a llamar el Seed, debemos usar el paquete ts-node. crear un script que ejecute el archivo que queremos, ej. "seed": "ts-node src/seed/seed.ts"

SIn embargo esto generará un error porque no existe el archivo de tsconfig dentro del directorio src/seed.

Para solucionarlo, con la terminal integrada nos situamos en src/seed y ejegucamos npx tsc --init