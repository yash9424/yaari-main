interface CustomerSupportScreenProps {
  onBack: () => void
}

export default function CustomerSupportScreen({ onBack }: CustomerSupportScreenProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-4 pt-8">
        <button onClick={onBack} className="mr-3">
          <span className="text-2xl text-black">←</span>
        </button>
      </div>

      {/* Title */}
      <div className="px-4 pb-6">
        <h1 className="text-3xl font-bold text-black">Customer Support</h1>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center px-8 mt-20">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Got a query or need</h2>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            <span className="font-bold">assistance?</span>
          </h2>
          
          <p className="text-gray-600 text-base leading-relaxed mb-2">
            We're here to help! Write to us at
          </p>
          <p className="text-primary font-medium text-base mb-2">support@yaari.me</p>
          <p className="text-gray-600 text-base leading-relaxed">
            and our support team will get back to you as soon as possible.
          </p>
        </div>
      </div>
    </div>
  )
}