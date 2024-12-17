

function successResponseWithData(res,data,message){
    res.status(200).json({
        success: true,
        message: message,
        data: data
    })
}

function successResponseWithoutData(res,message){
    res.status(200).json({
        success: true,
        message: message,
    })
}

export default {successResponseWithData, successResponseWithoutData};