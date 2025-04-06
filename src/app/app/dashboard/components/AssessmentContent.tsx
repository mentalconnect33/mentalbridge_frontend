'use client';

interface AssessmentContentProps {
  setActiveTab: (tab: string) => void;
}

export default function AssessmentContent({ setActiveTab }: AssessmentContentProps) {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Mental Health Assessment</h2>
        <p className="text-gray-600">This quick questionnaire will help us provide personalized recommendations.</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-6">How have you been feeling lately?</h3>
        
        <div className="space-y-6">
          <div>
            <p className="text-gray-700 mb-3">1. Over the past 2 weeks, how often have you felt little interest or pleasure in doing things?</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg text-sm">Not at all</button>
              <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg text-sm">Several days</button>
              <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg text-sm">More than half the days</button>
              <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg text-sm">Nearly every day</button>
            </div>
          </div>
          
          <div>
            <p className="text-gray-700 mb-3">2. Over the past 2 weeks, how often have you felt down, depressed, or hopeless?</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg text-sm">Not at all</button>
              <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg text-sm">Several days</button>
              <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg text-sm">More than half the days</button>
              <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg text-sm">Nearly every day</button>
            </div>
          </div>
          
          <div>
            <p className="text-gray-700 mb-3">3. How would you rate your stress level over the past month?</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg text-sm">Very low</button>
              <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg text-sm">Low</button>
              <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg text-sm">Moderate</button>
              <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg text-sm">High</button>
              <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg text-sm">Very high</button>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="bg-[#9D7FBC] text-white px-5 py-2 rounded-full hover:bg-[#8A6BA7] transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 