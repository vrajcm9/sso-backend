const express = require('express');
const { createRequest, getRequests, getApprovalRequests, updateApprovalRequest } = require('../services/requestService');
const router = express.Router();

router.post('/', (req, res) => {
    createRequest(req.body)
        .then(request => res.status(201).send(request))
        .catch(err => res.status(500).send('Error creating request: ' + err));
});

router.get('/userRequests', (req, res) => {
    getRequests(req.query.userId)
        .then(requests => res.status(200).send(requests))
        .catch(err => res.status(500).send('Error fetching requests: ' + err));
});

router.get('/approvalRequests', (req, res) => {
    getApprovalRequests(req.query.email)
        .then(requests => res.status(200).send(requests))
        .catch(err => res.status(500).send('Error fetching requests: ' + err));
});

router.patch('/approvalRequests/', (req, res) => {
    updateApprovalRequest(req.query.requestId, req.query.status)
        .then(request => res.status(201).send(request))
        .catch(err => res.status(500).send('Error updating requests: ' + err));
});

module.exports = router;
