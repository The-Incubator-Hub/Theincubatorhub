export default function AnnouncementsCard({ announcements = [] }) {
  if (!announcements.length) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 font-montserrat flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
          Announcements
        </h2>
      </div>
      <ul className="divide-y divide-gray-100">
        {announcements.map((a) => (
          <li key={a.id} className="px-6 py-4">
            <div className="flex items-start gap-3">
              {a.isPinned && (
                <span className="mt-0.5 flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
                  Pinned
                </span>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{a.title}</p>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">{a.body}</p>
                <p className="mt-1 text-xs text-gray-400">
                  {a.author?.name} &bull;{" "}
                  {new Date(a.publishedAt).toLocaleDateString("en-NG", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="px-6 py-3 border-t border-gray-100">
        <a href="/portal/announcements" className="text-sm font-medium text-green-600 hover:text-green-500">
          View all announcements →
        </a>
      </div>
    </div>
  );
}
