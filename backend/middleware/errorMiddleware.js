const notFound =(req,res,next)=>{// to handle the if url is not matched with routes we defined
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler =(err,req,res,next)=>{
    //next in async handler will pass to this middleware since its recieving err as arguments
    let statusCode =res.statusCode===200?500:res.statusCode;
    let message=err.message;

    //check for Mongoose bad ObjectId

    if(err.name==='CastError'&& err.kind==='ObjectId'){
        message='Resource not found';
        statusCode =404;
    }

    res.status(statusCode).json({
        message,
        stack:process.env.NODE_ENV==='production'? 'pancakes':err.stack
    })
}

export {notFound,errorHandler}