export const getUserStatusName = (status: number) => {
    const statusNumber = Number(status);
    switch (statusNumber) {
      case 0:
        return 'Inactive';
      case 1:
        return 'Active';
      case 2:
        return 'Pending';
      case 3:
        return 'Banned';
      default:
        return 'Inactive';
    }
  };