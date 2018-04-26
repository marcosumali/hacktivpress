# hacktivpress
Hactive8 Phase 2 Livecode

RELEASE 0

1. Deskripsi program yang kita buat:
    - Program: Hacktivpress - blog
    - Client: vuejs; tools: bootstrap
    - Server: express generator, mongodb; tools: mlab

2. Langkah-langkah yang perlu dijalankan:
    - Client: live-server index.html
    - Server: nodemon app.js

3. API Endpoint:
    - /users:
        get: '/'            ==> getUsers
        post: '/register'   ==> register
        post: '/login'      ==> login

    - /articles:
        get: '/'            ==> getArticles
        post: '/createData' ==> createData
        post: '/byCategory' ==> getByCategory
        post: '/byAuthor'   ==> getByAuthor
        put: '/update'      ==> updateData
        delete: '/delete'   ==> deleteData
