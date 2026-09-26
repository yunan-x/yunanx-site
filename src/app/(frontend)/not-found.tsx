import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="section">
      <div className="contain">
        <div className="w-layout-vflex wrap gap_s">
          <h1>Page not found</h1>
          <p>
            The page you are looking for doesn&apos;t exist or has been moved. <Link href="/">Back to the start page</Link>.
          </p>
        </div>
      </div>
    </section>
  )
}
