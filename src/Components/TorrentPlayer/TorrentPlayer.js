// src/components/TorrentPlayer/TorrentPlayer.js

import React, { useEffect, useRef } from 'react';
import WebTorrent from 'webtorrent/dist/webtorrent.min.js'

const TorrentPlayer = ({ url }) => {
  const playerRef = useRef(null)

  useEffect(() => {
    if (playerRef) {
      const client = new WebTorrent()
      client.add('magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent', async function (torrent) {
        // console.log('torrent', torrent)
        // console.log('ready')
        const file = torrent.files.find(function (file) {
          return file.type.endsWith('/mp4')
        })

        // console.log(file)

        if (file) {
          const url = await file.blob()
          console.log(url)

          playerRef.src = URL.createObjectURL(url)
        }
      })
    }
  }, [playerRef]);


  return (
    <div className="torrent-player">
      <video ref={playerRef} id="videoPlayer" controls>

      </video>
    </div>
  );
};

export default TorrentPlayer;
