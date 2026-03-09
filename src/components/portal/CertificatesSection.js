export default function CertificatesSection({ enrollments = [] }) {
  if (!enrollments.length) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 font-montserrat flex items-center gap-2">
          <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          My Certificates
        </h2>
      </div>
      <div className="divide-y divide-gray-100">
        {enrollments.map((enrollment) => (
          <div key={enrollment.id} className="px-6 py-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-900">{enrollment.program?.title}</p>
              {enrollment.completedAt && (
                <p className="text-xs text-gray-500 mt-0.5">
                  Completed:{" "}
                  {new Date(enrollment.completedAt).toLocaleDateString("en-NG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
            </div>
            <a
              href={`/portal/certificates/${enrollment.id}`}
              className="flex-shrink-0 inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              View Certificate
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
