import React from 'react';
import './Footer.scss';
import { Box } from '@chakra-ui/react';

function Footer() {
  return (
    <Box className="footer" >
      <div className="container">
        <div className="row">
          <div className="col-xs-20">
            <ul className="text-center">
              <li>YTS © 2011 - 2024</li>
              <li>-</li>
              <li><a href="https://yts.mx/blog">Blog</a></li>
              <li>-</li>
              <li><a href="https://yts.mx/dmca">DMCA</a></li>
              <li>-</li>
              <li><a href="https://yts.mx/api">API</a></li>
              <li>-</li>
              <li><a href="https://yts.mx/rss-guide">RSS</a></li>
              <li>-</li>
              <li><a href="https://yts.mx/contact">Contact</a></li>
              <li>-</li>
              <li><a href="https://yts.mx/browse-movies">Browse Movies</a></li>
              <li>-</li>
              <li><a href="https://yts.mx/requests">Requests</a></li>
              <li>-</li>
              <li><a href="https://yts.mx/login">Login</a></li>
              <li>-</li>
              <li><a href="https://yts.mx/languages">Language</a></li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-20">
            <ul className="text-center">
              <li><a href="https://eztv.li" title="EZTV">EZTV</a></li>
              <li>-</li>
              <li><a href="https://yifystatus.com" title="YTS YIFY Status">YIFY Status</a></li>
              <li>-</li>
              <li><a href="https://ytsproxies.com" title="YTS Proxies">YTS Proxies</a></li>
              <li>-</li>
              <li><a href="http://ytsyifyupcmxftncrnqd4bmwxvhlibhdat74w6xnmn33njxts4eeaiqd.onion/" title="YTS Proxies (TOR)">YTS Proxies (TOR)</a></li>
              <li>-</li>
              <li>
                <a href="https://twitter.com/ytsyify" className="twitter-follow-button" data-show-count="false">Follow @ytsyify</a>
                <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-20">
            <ul className="text-center">
              <li style={{ fontSize: '.80em' }}>
                By using this site you agree to and accept our <a href="/terms">User Agreement</a>, which can be read <a href="/terms">here</a>.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default Footer;
