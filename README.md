# Habits
 A simple habit checker build with react during rocketseat's nlwSetup event.
 
![Captura de tela de 2023-03-14 21-15-29](https://user-images.githubusercontent.com/35979271/225182936-cf3128f8-8116-4870-a70f-d5f76d0f67e2.png)
## 🗒️ Create and track your new habits
![Captura de tela de 2023-03-14 21-16-10](https://user-images.githubusercontent.com/35979271/225183452-e5348cc2-39f1-4e8b-8f37-344d5c7b52fe.png)

# 🚀 Technologies

### 🌎 Web
- HTML5
- TailWindCSS
- ReactJS/TypeScript

### 📱 Mobile
- Expo
- TailWindCSS
- ReactNative/TypeScript

### 🖥️ Back-end
- NodeJs
- Prisma
- Fastify

# Installing
to install web and mobile dependencies run
```bash
npm install
```

### Setting up back-end
create a `.env` file in your root folder with your [favourite database](https://www.prisma.io/docs/reference/database-reference/connection-urls) as the fallowing example:

`DATABASE_URL=postgresql://janedoe:mypassword@localhost:26257/mydb?schema=public`
### Now just run 
```bash
npx prisma migrate dev
```
### Run the project with
```bash
npm run dev
```
