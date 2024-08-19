// src/utils/useWebTorrent.js

import { useEffect, useRef } from 'react';
import WebTorrent from 'webtorrent';

const useWebTorrent = () => {
  const clientRef = useRef(null);

  useEffect(() => {
    // Initialize WebTorrent client
    clientRef.current = new WebTorrent();

    // Clean up on unmount
    return () => {
      clientRef.current.destroy();
    };
  }, []);

  const addTorrent = (torrentId, onReady) => {
    if (clientRef.current) {
      clientRef.current.add(torrentId, (torrent) => {
        if (onReady) {
          onReady(torrent);
        }
      });
    }
  };

  return { addTorrent };
};

export default useWebTorrent;
