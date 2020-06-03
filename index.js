// code away!
const postRrouter = require('./posts/postRouter')
const userRouter = require('./users/userRouter')

const server = require('./server')
server.use('/api/post',postRrouter)
server.use('/api/user',userRouter)
server.listen(5000,()=>console.log('now live on 500'))
