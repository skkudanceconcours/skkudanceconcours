const delayTimeout = async (delay: number): Promise<undefined> => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
export default delayTimeout;
