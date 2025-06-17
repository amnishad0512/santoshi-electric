export const getOrderStatusName = (status: number) => {
    const statusNumber = Number(status);
    switch (statusNumber) {
      case 0:
        return 'Pending';
      case 1:
        return 'Confirmed';
      case 2:
        return 'Processing';
      case 3:
        return 'Shipped';
      case 4:
        return 'Out for Delivery';
      case 5:
        return 'Delivered';
      case 6:
        return 'Cancelled';
      case 7:
        return 'Returned';
      case 8:
        return 'Refunded';
    default:
        return '-';
    }
  };