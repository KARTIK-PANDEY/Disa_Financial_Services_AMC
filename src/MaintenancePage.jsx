export default function MaintenancePage() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.icon}>🛠️</div>
        <h1 style={styles.heading}>Website content is Hidden</h1>
        <p style={styles.text}>Because The Developer's Payment is Done only Partial, Website will be Live Immediately After Full Payment of this Website Developer, Please Complete My Developer's Payment,</p>
        <p style={styles.text}>
          He has Done Really Hard Work on this Website. I Hope You Understand, Thank You Soo Much.
        </p>
        <div style={styles.divider}></div>
        <p style={styles.footerNote}>Just Complete his Payment, Thanks a Lot</p>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
  },
  card: {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '50px 40px',
    maxWidth: '520px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
  icon: {
    width: '80px',
    height: '80px',
    margin: '0 auto 24px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
  },
  heading: {
    color: '#2d2d3a',
    fontSize: '26px',
    marginBottom: '14px',
  },
  text: {
    color: '#6b6b7b',
    fontSize: '16px',
    lineHeight: 1.6,
    marginBottom: '10px',
  },
  divider: {
    width: '60px',
    height: '4px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    borderRadius: '2px',
    margin: '24px auto',
  },
  footerNote: {
    fontSize: '13px',
    color: '#a0a0b0',
    marginTop: '20px',
  },
}
