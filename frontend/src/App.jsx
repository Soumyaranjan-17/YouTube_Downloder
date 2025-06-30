import React, { useState } from 'react';
import FormatList from './components/FormatList';

const App = () => {
  const [url, setUrl] = useState('');
  const [formats, setFormats] = useState([]);
  const [audioFormats, setAudioFormats] = useState([]);
  const [videoFormats, setVideoFormats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState(null);

  const fetchFormats = async () => {
    if (!url) return alert("Enter a valid YouTube URL.");
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/formats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      setFormats(data.formats || []);
      setMeta(data.meta || null);

      // Separate audio and video
      const audio = data.formats.filter(f => f.type === "audio");
      const video = data.formats.filter(f => f.type === "video");
      setAudioFormats(audio);
      setVideoFormats(video);
    } catch (err) {
      alert("Failed to fetch formats.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>YouTube Downloader</h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Paste YouTube link here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ flex: 1, padding: '10px' }}
        />
        <button onClick={fetchFormats}>Fetch</button>
      </div>

      {loading && <p>Loading formats...</p>}

      {meta && (
        <div>
          <h3>{meta.title}</h3>
          <p>By {meta.uploader} | {meta.view_count} views | {meta.duration}s</p>
        </div>
      )}

      {audioFormats.length > 0 && (
        <FormatList title="🎵 Audio Formats" formats={audioFormats} url={url} type="audio" />
      )}

      {videoFormats.length > 0 && (
        <FormatList title="📺 Video Formats" formats={videoFormats} url={url} type="video" />
      )}
    </div>
  );
};

export default App;