const TransactionConstants = {
  TYPES: {
    bidPackagePurchased: "bid-package-purchased",
    milestoneFunded: "milestone-funded",
    withdrawal: "withdrawal",
  },
  STATUS: {
    pending: "pending",
    accepted: "accepted",
    success: "success",
    failed: "failed",
  },
  PAYMENT_METHODS: {
    stripe: "stripe",
    wallet: "wallet",
  },
  PARTICULARS: {
    bidBought: "A New Package Bought",
    milestonePayment: "Milestone payment"
  },
};

export default TransactionConstants;
