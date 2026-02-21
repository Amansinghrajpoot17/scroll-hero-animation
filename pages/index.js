import Hero from '../components/Hero'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Hero />

      <main className="max-w-4xl mx-auto py-24 px-6">
        <h2 className="text-2xl font-semibold mb-6">Content</h2>
        <p className="text-gray-600">Scroll to see the hero's scroll-driven animation.</p>
        <div style={{height: '120vh'}}></div>
      </main>
    </div>
  )
}
