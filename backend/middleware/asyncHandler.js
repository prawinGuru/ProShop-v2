const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);//catch will find the error,,and the next will search for the middle ware to hanlde this type of error that is errorHanlder
  };
  
  export default asyncHandler;
  