import React, { useEffect } from 'react';
import WebTorrent from 'webtorrent';

const TorrentPlayer = () => {
  useEffect(() => {
    const client = new WebTorrent();

    const torrentId =
      'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent';

    client.add(torrentId, (torrent) => {
      // Find the .mp4 file in the torrent
      const file = torrent.files.find((file) => file.name.endsWith('.mp4'));

      // Append the video to the DOM
      if (file) {
        file.appendTo('#video-container'); // Append to a specific element
      }
    });

    // Cleanup on component unmount
    return () => {
      client.destroy();
    };
  }, []);

  return <div id="video-container"></div>;
};

export default TorrentPlayer;
