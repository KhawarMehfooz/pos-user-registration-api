# User Authencation API For POS

> An API for registering and authenticating users for point of sale system.

## API Endpoints

### Register User

```http
  POST /user/register
```

| Parameter  | Type     | Description                   |
| :--------- | :------- | :---------------------------- |
| `fullName` | `string` | **Required**. User's name     |
| `email`    | `string` | **Required**. User's email    |
| `password` | `string` | **Required**. User's password |

### Login User

```http
  POST /user/login
```

| Parameter  | Type     | Description                   |
| :--------- | :------- | :---------------------------- |
| `email`    | `string` | **Required**. User's email    |
| `password` | `string` | **Required**. User's password |

### Validate User

```http
  POST /user/validate
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token`   | `string` | **Required**. User's token |

## Authors

- [@Khawar Mehfooz](https://khawarmehfooz.com)
