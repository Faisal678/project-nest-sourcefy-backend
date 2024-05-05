const NotificationConstants = {
    TYPES: {
        jobPosted: 'jobPosted',
        proposalSent:'proposalSent',
        proposalReceived:'proposalReceived',
        proposalAccepted: 'proposalAccepted',
        jobDelete: 'jobDelete',
        disputeRaised : "disputeraised",
        disputeClosed : "disputeClosed",
        cancelContract : "cancelContract",
        contractCancelRequest: 'Contract Cancel Request',
        contractCancelRequestAccepted : "contract_cancellation_request_accepted",
        contractCancelRequestRejected : "contract_cancellation_request_rejected",
        endContract: "endContract",
        paymentRequest: "paymentRequest"

    },
    TITLE:{
        jobPosted: 'New Job Posted',
        proposalSent:'Proposal  Sent',
        proposalReceived:'Proposal Received',
        proposalAccepted: 'Proposal Accepted',
        contractCancelled: 'Contract Cancelled',
        disputeRaised : "Dispute Raised",
        disputeClosed : "Dispute Closed",
        cancelContract : "Contract Cancel Request",
        contractCancelRequest: 'Contract Cancel Request',
        contractCancelRequestAccepted : "Contract Cancellation Request Accepted",
        contractCancelRequestRejected : "Contract Cancellation Request Rejected",
        endContract : "End Contract",
        paymentRequest: "Payment Request"
    }
} 

export default NotificationConstants;