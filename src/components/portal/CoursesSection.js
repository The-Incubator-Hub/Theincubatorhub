const STATUS_COLORS = {
  ACTIVE: "bg-green-100 text-green-700",
  COMPLETED: "bg-blue-100 text-blue-700",
  WITHDRAWN: "bg-gray-100 text-gray-600",
  SUSPENDED: "bg-red-100 text-red-700",
};

function ProgressBar({ value }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-2">
      <div
        className="bg-green-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export default function CoursesSection({ enrollments = [] }) {
  if (!enrollments.length) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 font-montserrat mb-4">My Courses</h2>
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="mt-2 text-sm text-gray-500">No courses enrolled yet.</p>
          <p className="mt-1 text-xs text-gray-400">Apply to a program to get started.</p>
          <a
            href="/programs"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors"
          >
            Browse Programs
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 font-montserrat">My Courses</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {enrollments.map((enrollment) => (
          <div key={enrollment.id} className="px-6 py-5">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-gray-900">{enrollment.program?.title}</h3>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[enrollment.status] || "bg-gray-100 text-gray-600"}`}>
                    {enrollment.status}
                  </span>
                </div>
                {enrollment.cohort && (
                  <p className="mt-0.5 text-xs text-gray-500">
                    Cohort: {enrollment.cohort.name}
                  </p>
                )}
                {enrollment.startDate && (
                  <p className="mt-0.5 text-xs text-gray-500">
                    Started:{" "}
                    {new Date(enrollment.startDate).toLocaleDateString("en-NG", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                )}
                {enrollment.grade && (
                  <p className="mt-0.5 text-xs text-gray-500">
                    Grade: <span className="font-semibold text-gray-700">{enrollment.grade}</span>
                  </p>
                )}

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Progress</span>
                    <span className="text-xs font-medium text-gray-700">{enrollment.progress}%</span>
                  </div>
                  <ProgressBar value={enrollment.progress} />
                </div>
              </div>

              <div className="flex-shrink-0">
                {enrollment.moodleCourseId && enrollment.status === "ACTIVE" ? (
                  <a
                    href={`/api/portal/moodle-sso?enrollmentId=${enrollment.id}`}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
                  >
                    Go to Course →
                  </a>
                ) : enrollment.status === "COMPLETED" ? (
                  <a
                    href={`/portal/certificates/${enrollment.id}`}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    View Certificate
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
