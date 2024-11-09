const RequestModel = require('../models/requestModel');

const createRequest = (data) => {
    const newRequest = new RequestModel(data);
    return newRequest.save();
};

const getRequests = (userId) => {
    return RequestModel.find({googleId: userId});
};

const getApprovalRequests = (email) => {
    return RequestModel.find({supervisorEmail: email});
};

const updateApprovalRequest = (requestId, status) => {
    return RequestModel.findByIdAndUpdate(requestId, { status: status})
};

module.exports = {
    createRequest,
    getRequests,
    getApprovalRequests,
    updateApprovalRequest
};
