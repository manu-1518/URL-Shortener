import { useState } from 'react';
import { shortenUrl, getUrlStats } from './services/api';
import './App.css';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [urlHistory, setUrlHistory] = useState([]);
  const [stats, setStats] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setCopied(false);

    // Basic URL validation
    if (!longUrl.trim()) {
      setError('Please enter a URL');
      return;
    }

    // Check if URL starts with http:// or https://
    if (!longUrl.match(/^https?:\/\//i)) {
      setError('URL must start with http:// or https://');
      return;
    }

    setLoading(true);
    try {
      const data = await shortenUrl(longUrl);
      setShortUrl(data.shortUrl);
      // Add to history
      setUrlHistory(prev => [{ longUrl, shortUrl: data.shortUrl, timestamp: new Date() }, ...prev.slice(0, 9)]);
      setError(''); // Clear any previous errors
    } catch (err) {
      console.error('Error shortening URL:', err);
      setError(err.message || 'Failed to shorten URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (shortUrl) {
      try {
        await navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        setError('Failed to copy to clipboard');
      }
    }
  };

  const handleShowStats = async (url) => {
    setStats(null);
    setError('');
    // Extract short key from returned URL (assumes server returns /api/<key> path)
    try {
      const match = url.match(/\/api\/(.+)$/);
      const key = match ? match[1] : url.replace(/.*\/(.+)$/, '$1');
      const data = await getUrlStats(key);
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats', err);
      setError(err.message || 'Failed to fetch stats');
    }
  };

  const handleCopyHistory = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">
            URL Shortener
          </h1>
          <p className="subtitle">Transform long URLs into short, shareable links</p>
        </header>

        <main className="main-content">
          <div className="card">
            <form onSubmit={handleSubmit} className="url-form">
              <div className="input-group">
                <input
                  type="text"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  placeholder="Enter your long URL here (e.g., https://example.com)"
                  className="url-input"
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner"></span>
                      Shortening...
                    </>
                  ) : (
                    'Shorten'
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {shortUrl && (
              <div className="result-card">
                <div className="result-header">
                  <span>Your shortened URL is ready!</span>
                </div>
                <div className="result-content">
                  <div className="result-url">
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="short-url-link"
                    >
                      {shortUrl}
                    </a>
                  </div>
                  <button
                    onClick={handleCopy}
                    className={`copy-btn ${copied ? 'copied' : ''}`}
                  >
                    {copied ? (
                      'Copied!'
                    ) : (
                      'Copy'
                    )}
                  </button>
                  <button
                    onClick={() => handleShowStats(shortUrl)}
                    className="stats-btn"
                  >
                    Stats
                  </button>
                </div>
              </div>
            )}

            {stats && (
              <div className="stats-card">
                <h3>URL Statistics</h3>
                <div>Short Key: {stats.shortKey}</div>
                <div>Long URL: <a href={stats.longUrl} target="_blank" rel="noreferrer">{stats.longUrl}</a></div>
                <div>Clicks: {stats.clicks}</div>
                <div>Created: {stats.createdAt}</div>
              </div>
            )}
          </div>

          {urlHistory.length > 0 && (
            <div className="history-section">
              <h2 className="history-title">Recent URLs</h2>
              <div className="history-list">
                {urlHistory.map((item, index) => (
                  <div key={index} className="history-item">
                    <div className="history-content">
                      <div className="history-short">
                        <a
                          href={item.shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="history-link"
                        >
                          {item.shortUrl.replace('http://localhost:5000/api/', '')}
        </a>
      </div>
                      <div className="history-long" title={item.longUrl}>
                        {item.longUrl.length > 50
                          ? `${item.longUrl.substring(0, 50)}...`
                          : item.longUrl}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopyHistory(item.shortUrl)}
                      className="history-copy-btn"
                      title="Copy URL"
                    >
                      Copy
        </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
