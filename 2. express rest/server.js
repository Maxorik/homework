const express = require('express');
const app = express();
const userRouter = express.Router();

const users =['petr'];


// пропускаем все request через json(), чтобы получить тело запроса
// порядок middleware важен!
app.use(express.json());
// пропускаем все /api/users через роутер
app.use('/api/users', userRouter);


userRouter.get("/", function(request, response) {
    response.send({res: users})
})

userRouter.get("/:username", function(request, response) {
    const result = users.includes(request.params.username.toLowerCase())
    response.send({res: result})
})

userRouter.post("/", function(request, response) {
    if (!request.body) return response.sendStatus(400);
    users.push(request.body["username"])
    response.status(201).json({
        username: request.body.username
    })
})

userRouter.put("/:username", function(request, response) {
    if (!request.body) return response.sendStatus(400);
    const editedUsername = request.params.username.toLowerCase();
    const newUsername = request.body["newname"];

    const editedUserPos = users.indexOf(editedUsername)
    if (editedUserPos !== -1) {
        users[editedUserPos] = newUsername
    } else {
        return response.send(404).json({
            error: 'user not found'
        })
    }

    response.send({users: users})
})

userRouter.delete("/:username", function(request, response) {
    const deletedUser = request.params.username.toLowerCase();
    const deletedUserPos = users.indexOf(deletedUser);
    if (deletedUserPos !== -1) {
        users.splice(deletedUserPos, 1)
    } else {
        return response.send(404).json({
            error: 'user not found'
        })
    }

    response.send({users: users})
})


app.use("/", function(request, response) {
    response.sendFile(__dirname + "/index.html");
})

/** обработка ошибок */
app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message || 'server error'
    })
})

app.listen(6969);