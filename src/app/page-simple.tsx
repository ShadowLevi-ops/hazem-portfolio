// Temporary simple page for testing
export default function SimplePage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        color: '#ffffff',
        padding: '50px',
        fontFamily: 'system-ui',
      }}
    >
      <h1>Simple Test Page</h1>
      <p>If you see this, basic rendering works!</p>
      <p>The issue is likely in one of the components or imports.</p>
    </div>
  );
}
