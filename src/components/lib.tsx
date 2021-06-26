import * as React from 'react'

function FullPageErrorFallback() {
  return (
    <div
      role="alert"
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
    </div>
  )
}

export {
  FullPageErrorFallback
}