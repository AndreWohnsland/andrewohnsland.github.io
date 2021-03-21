const checkCustomType = (identifier: string | undefined): boolean => {
  const allowed: string[] = ['warning', 'danger', 'info', 'helpfull'];
  if (identifier === undefined) return false;
  return allowed.includes(identifier);
};

export default checkCustomType;
