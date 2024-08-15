// src/utils/webtorrent.js
import WebTorrent from 'webtorrent';

const client = new WebTorrent();

function downloadTorrent(torrentId, downloadPath = './downloads', onProgress, onDone) {
  client.add(torrentId, { path: downloadPath }, (torrent) => {
    console.log('Torrent info hash:', torrent.infoHash);

    torrent.on('download', (bytes) => {
      console.log('Downloaded:', bytes, 'bytes');
      console.log('Total downloaded:', torrent.downloaded, 'bytes');
      console.log('Download speed:', torrent.downloadSpeed, 'bytes/s');
      console.log('Progress:', torrent.progress * 100, '%');
      if (onProgress) onProgress(torrent);
    });

    torrent.on('done', () => {
      console.log('Torrent download finished');
      if (onDone) onDone(torrent);
    });
  });
}

function streamTorrent(torrentId, elementId = 'video-container') {
  client.add(torrentId, (torrent) => {
    const file = torrent.files.find(file => file.name.endsWith('.mp4'));
    if (file) {
      file.renderTo(`#${elementId}`);
    }
  });
}

export { downloadTorrent, streamTorrent };
