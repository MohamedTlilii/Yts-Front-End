// src/components/TorrentPlayer/TorrentPlayer.js

import React, { useEffect, useState } from 'react';
import useWebTorrent from '../../useWebTorrent'; // Ensure this path is correct

const TorrentPlayer = ({ torrentId }) => {
  const { addTorrent } = useWebTorrent();
  const [torrent, setTorrent] = useState(null);

  useEffect(() => {
    if (torrentId) {
      addTorrent(torrentId, setTorrent);
    }
  }, [torrentId, addTorrent]);

  const handleDownload = () => {
    if (torrent) {
      torrent.files.forEach(file => {
        file.getBlobURL((err, url) => {
          if (err) return console.error(err);
          const a = document.createElement('a');
          a.href = url;
          a.download = file.name;
          a.click();
        });
      });
    }
  };

  return (
    <div className="torrent-player">
      <video id="videoPlayer" controls>
        <source src={torrent ? torrent.files[0].getBlobURL() : ''} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default TorrentPlayer;
