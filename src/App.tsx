import { useState, useRef, useEffect } from 'react';

import Select from './images/Select.svg';
import CreateLabel from './images/CreateLabel.svg';

import { LabelCanvas } from './utils/label';

import { LabelMode } from './utils/label';

import { fetchPhotoInfoById } from './utils/apis';

import styles from './App.module.scss';

function App() {
  const [id, setId] = useState<number>(1);
  const [photo, setPhoto] = useState<string>('');
  const [photoTitle, setPhotoTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const canvas = useRef() as React.MutableRefObject<HTMLCanvasElement>;

  const [labelCanvas, setLabelCanvas] = useState<LabelCanvas | null>(null);

  useEffect(() => {
    if (canvas.current.getContext('2d')) {
      setLabelCanvas(new LabelCanvas(canvas.current.getContext('2d')));
    }

    const fetchPhoto = async () => {
      setIsLoading(true);
      try {
        const json = await fetchPhotoInfoById(id);

        setPhotoTitle(json.title);
        setPhoto(json.url);
      } catch (e) {
        setIsError(true);
      }

      setIsLoading(false);
    }

    fetchPhoto();
  }, [id])

  const onClickSelect = () => {
    labelCanvas && labelCanvas.changeLabelMode(LabelMode.SelectLabel);
  }

  const onClickCreateLabel = () => {
    labelCanvas && labelCanvas.changeLabelMode(LabelMode.CreateLabel);
  }

  return (
    <div className={styles.PageLayout}>
      <header className={styles.Menu}>
        <div className={styles.LabelText}>Dataset Label : {photoTitle}</div>
      </header>
      <div className={styles.BottomLayout}>
        <div className={styles.Sider}>
          <button className={styles.Button} onClick={() => onClickSelect()}>
            <img src={Select} alt="Select" />
          </button>
          <button className={styles.Button} onClick={() => onClickCreateLabel()}>
            <img src={CreateLabel} alt="Create Label" />
          </button>
        </div>
        <div className={styles.ImageWrapperLayout}>
          <img className={styles.ImageLayout} src={photo} alt={photoTitle} />
          <canvas ref={canvas} className={styles.CanvasLayout} />
        </div>
      </div>
    </div >
  );
}

export default App;
