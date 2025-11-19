import { ChevronLeft, ChevronRight } from "lucide-react";

interface Definition {
  text: string;
  example: string;
}

export default function DefinitionsList({
  definitions,
}: {
  definitions: Definition[];
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-700 font-semibold">
          N
        </div>
        <h2 className="text-lg font-semibold">Noun · Function</h2>
      </div>

      <div className="space-y-4">
        {definitions.map((def, idx) => (
          <div key={idx} className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mt-1">
              <span className="text-xs text-gray-400">{idx + 1}</span>
            </div>
            <div>
              <p className="text-gray-800 font-medium">{def.text}</p>
              <p className="text-gray-500 italic text-sm mt-1">{def.example}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t">
        <span className="text-sm text-gray-500">5 OUT OF 12 RESULTS</span>
        <div className="flex gap-2">
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronLeft className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronRight className="w-4 h-4 text-pink-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
