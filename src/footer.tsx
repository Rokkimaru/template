import React from 'react';

export default function footer() {
  return (
    <footer className="footer">
      <div className="footer-bar">
        <div className="now-playing">
          <div>
            <img className="now-image" src="./images/mayot.png" alt="img" />
          </div>
          <div className="author-name">
            <div>
              Mayot
            </div>
            <div>
              Снег
            </div>
          </div>
          <div>
            <input type="image" alt="img" className="playing-image" src="./images/add_heart.png" id="footerHeart" />
          </div>
          <div>
            <input type="image" alt="img" className="pip-image" src="./images/picture-in-picture.png" id="pip" />
          </div>
        </div>
        <audio className="playing-main" src="./music/MAYOT - Снег.mp3" controls />
      </div>
    </footer>
  );
}