export const getUserStatusName = (status: number) => {
    const statusNumber = Number(status);
    switch (statusNumber) {
      case 1:
        return 'active';
      case 2:
        return 'inactive';
      case 3:
        return 'pending';
      case 4:
        return 'banned';
      default:
        return 'inactive';
    }
  };