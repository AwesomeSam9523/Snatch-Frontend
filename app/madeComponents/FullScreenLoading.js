import { Loader } from "lucide-react";

const FullScreenLoading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <Loader className="h-16 w-16 text-white animate-spin" />
    </div>
  );
};

export default FullScreenLoading;
