const loading = () => {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="animate-loading relative h-12 w-12">
        <div className="absolute left-0 top-0 h-3 w-3 rounded-full bg-gray-800" />
        <div className="absolute right-0 top-0 h-3 w-3 rounded-full bg-gray-800" />
        <div className="absolute bottom-0 left-0 h-3 w-3 rounded-full bg-gray-800" />
        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-gray-800" />
      </div>
    </main>
  );
};

export default loading;
