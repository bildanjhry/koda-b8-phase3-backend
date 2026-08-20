# ShortLink

![Node.js](https://img.shields.io/badge/Node.js-26.7.0-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-5.2.1-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-6.37.8-52B0E7?logo=sequelize&logoColor=white)
![bcryptjs](https://img.shields.io/badge/bcryptjs-3.0.3-338033?logo=npm&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-9.0.3-000000?logo=jsonwebtokens&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-6.3.0-85EA2D?logo=swagger&logoColor=black)
![Cookie Parser](https://img.shields.io/badge/Cookie--Parser-1.4.7-000000?logo=npm&logoColor=white)

Applikasi Backend dari ShortLink. Dibangun diatas express.js dengan ORM Sequelize.

## Security Features

Applikasi ini mengunakan Bcryptjs untuk hashing pasword, untuk authorization-nya menggukan JWT yang akan diparsing ke Client (Frontend app) menggunakan Cookie parser.


## API Documentation
API Dokumentasi dari applikasi melalui Swager:

### Authentication

| Method | Endpoint | Description | Auth |
|:------:|----------|-------------|:----:|
| POST | `/api/register` | Daftar user baru | ❌ |
| POST | `/api/login` | Login user | ❌ |
| POST | `/api/logout` | Logout user | ✅ |
| GET | `/api/session` | Cek credential | ✅ |

### Users

| Method | Endpoint | Description | Auth |
|:------:|----------|-------------|:----:|
| GET | `/api/users` | Cari semua user | ✅ |
| GET | `/api/users/:id` | Cari user berdasarkan id | ✅ |

### Links

| Method | Endpoint | Description | Auth |
|:------:|----------|-------------|:----:|
| GET | `/api/links` | Cari semua links | ✅  |
| GET | `/api/links-cred` | Cari links berdarkan user | ✅  |
| POST | `/api/links` | Buat link baru | ✅ |
| DELETE | `/api/links/:id` | Hapus link berdasarkan id | ✅ |


### Profile

| Method | Endpoint | Description | Auth |
|:------:|----------|-------------|:----:|
| GET | `/api/profile` | Cari semua profile tersedia | ✅  |
| GET | `/api/profile/:id` | Cari links berdarkan id user | ✅  |


## Work with this project locally

### Clone repo
```shel
git clone https://github.com/bildanjhry/koda-b8-phase3-backend.git
```

### Go to directory
```shel
cd ./koda-b8-phase3-backend
```

### Install all depedencies
```shel
npm i
```

### Create .env and it should includes these
```env
PORT=8082 <- recommended on port 8082
JWT_KEY=
URL=<localhost:port>
CLIENT_URL=<fronted_url>
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=postgres
```
### Run database migration
```shel
npx sequelize-cli db:migrate
```

### Run app with script
```shel
npm run dev
```

### Access Swagger locally
#### https://localhost:8082/api-docs/api/


#### @author: [space_ranger](https://github.com/bildanjhry)

## License

This project is licensed under the [Apache License 2.0](LICENSE).