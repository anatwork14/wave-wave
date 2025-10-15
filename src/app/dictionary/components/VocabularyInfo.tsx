import { ChevronRight } from "lucide-react";

export default function VerbSection() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-700 font-semibold">
            V
          </div>
          <h2 className="text-lg font-semibold">Verb · Function</h2>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded">
          <ChevronRight className="w-5 h-5 text-pink-400" />
        </button>
      </div>
    </div>
  );
}
