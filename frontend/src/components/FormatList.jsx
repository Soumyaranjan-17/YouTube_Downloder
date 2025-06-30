import React from 'react';

const FormatList = ({ title, formats, url, type }) => {
  const handleDownload = async (format_id) => {
    const res = await fetch('http://localhost:5000/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, type, format_id })
    });

    const blob = await res.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${title}-${format_id}`;
    a.click();
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h4>{title}</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {formats.map((f, i) => (
          <li key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #ccc' }}>
            <span>
              {type === 'audio'
                ? `${f.abr}kbps | ${f.ext} | ${f.filesize}`
                : `${f.resolution || f.format_note} | ${f.ext} | ${f.filesize}`}
            </span>
            <span
              onClick={() => handleDownload(f.format_id)}
              style={{
                cursor: 'pointer',
                color: 'blue',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
              title="Click to download"
            >
              ⬇️
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormatList;