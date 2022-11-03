import { useState, useEffect } from 'react';

import Select from './images/Select.svg';
import CreateBox from './images/CreateBox.svg';

import { fetchPhotoInfoById } from './utils/apis';

import styles from './App.module.scss';

function App() {
  const [id, setId] = useState<number>(1);
  const [photo, setPhoto] = useState<string>('');
  const [photoTitle, setPhotoTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchPhoto = async () => {
      setIsLoading(true);
      try {
        const json = await fetchPhotoInfoById(id);

        console.log(json);

        setPhotoTitle(json.title);
        setPhoto(json.url);
      } catch (e) {
        setIsError(true);
      }

      setIsLoading(false);
    }

    fetchPhoto();
  }, [id])

  return (
    <div className={styles.PageLayout}>
      <header className={styles.Menu}>
        <div className={styles.LabelText}>Dataset Label : {photoTitle}</div>
      </header>
      <div className={styles.BottomLayout}>
        <div className={styles.Sider}>
          <button className={styles.Button} >
            <img src={Select} alt="Select" />
          </button>
          <button className={styles.Button} >
            <img src={CreateBox} alt="Create Box" />
          </button>
        </div>
        <canvas className={styles.CanvasLayout} />
        <img src={photo} alt={photoTitle} />
      </div>
    </div >
  );
}

export default App;
