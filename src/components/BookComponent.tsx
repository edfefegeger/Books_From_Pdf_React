import React, { FC, useEffect, useRef, useState } from 'react';

// Импорт компонентов и стилей
import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// @ts-ignore
// import back from '../assets/icons/back.svg'
// @ts-ignore
// import forward from '../assets/icons/forward.svg'
// @ts-ignore
// import open from '../assets/icons/blackArrowLeft.svg'

// Импорт компонентов и стилей из './styles'
import {
  BackButton,
  BookControl,
  BookControlWrapper,
  BookWrapper,
  Container,
  ForwardButton,
  Header,
  PageTitle,
  Wrapper,
} from './styles';

// Инициализация глобальных настроек PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

// Интерфейс для размеров компонента
interface ISize {
  width: number;
  height: number;
}

// Начальное состояние размеров
const initialSizeState: ISize = {
  width: 565,
  height: 799,
};

// Интерфейс для свойств компонента
interface IProps {
  book?: any;
  isFull?: boolean;
  server_url?: string;
  size?: {
    width?: number;
    height?: number;
  };
}

// Компонент книги
const BookComponent: FC<IProps> = ({ book, isFull, size: sizes, server_url }) => {
  // Состояние размеров книги
  const [size, setSize] = useState<ISize>(initialSizeState);
  // Состояние статуса загрузки
  const [loadStatus, setLoadStatus] = useState<boolean>(true);
  // Состояние количества страниц
  const [numPages, setNumPages] = useState<number | null>(null);
  // Состояние номера текущей страницы
  const [pageNumber, setPageNumber] = useState<number>(0);
  // Ссылка на компонент книги
  const bookRef = useRef<any>(null);

  console.log({ book });

  // Эффект для обновления размеров книги
  useEffect(() => {
    if (isFull) {
      setSize({ width: 650, height: 900 });
    } else {
      setSize({ width: 565, height: 799 });
    }
    if (sizes?.width && sizes?.height) {
      setSize({ width: sizes.width, height: sizes.height });
    }
  }, [isFull, sizes]);

  // Обработчик для перехода к следующей странице
  const nextButtonClick = () => {
    bookRef?.current?.pageFlip()?.flipNext();
  };

  // Обработчик для перехода к предыдущей странице
  const prevButtonClick = () => {
    bookRef?.current?.pageFlip()?.flipPrev();
  };

  // Функция для получения массива номеров страниц
  const getArrBook = (): number[] => {
    return Array.from(Array(numPages))?.map((el, i) => i + 1);
  };

  // Обработчик для события переворота страницы
  const onFlip = ({ data }: { data: number }): void => {
    setPageNumber(data);
  };

  // Обработчик для успешной загрузки документа
  function onDocumentLoadSuccess(numPages: number): void {
    setNumPages(numPages);
  }

  // Получение массива номеров страниц
  const pages = getArrBook();

  // Если нет книги, выводим сообщение
  if (!book) return <>Книга не найдена</>;

  // Рендер компонента
  return (
    <>
      {/* Обертка книги */}
      <BookWrapper>
        {/* Кнопка перехода к предыдущей странице */}
        <ForwardButton onClick={prevButtonClick}></ForwardButton>
        {/* Кнопка перехода к следующей странице */}
        <BackButton onClick={nextButtonClick}></BackButton>
        {/* Компонент документа */}
        <Document
          className={isFull ? 'is-full' : 'default'}
          renderMode={'canvas'}
          onLoadSuccess={({ numPages }) => {
            onDocumentLoadSuccess(numPages);
          }}
          onLoadError={(e) => setLoadStatus(false)}
          file={book?.file}
          loading="Загрузка..."
          error={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                justifyContent: 'center',
              }}
            >
              <h1 style={{ color: '#d32f2f' }}>Ошибка загрузки</h1>
            </div>
          }
        >
          {/* Компонент HTMLFlipBook */}
          <div style={{height: '100px'}}>
          
          </div>
<HTMLFlipBook
  onFlip={onFlip}
  width={size.width}
  height={size.height}
  showCover={true}
  ref={bookRef}
  renderOnlyPageLengthChange={false}
  autoSize={true}
  size="stretch"
  minWidth={size.width}
  maxWidth={size.width}
  minHeight={size.height}
  maxHeight={size.height}
  drawShadow={false}
  startPage={1}
  className="default"
  style={{ margin: '0 auto' }}
  usePortrait={true}
  startZIndex={0}
  flippingTime={1000}
  maxShadowOpacity={0.5}
  mobileScrollSupport={true}
  clickEventForward={true}
  useMouseEvents={true}
  swipeDistance={30}
  showPageCorners
  disableFlipByClick
>
  {/* Маппинг страниц */}
  {pages?.map((page: number) => (
    <div className="demoPage" key={page} style={{ marginTop: '10px' }}>
      {/* Компонент страницы */}
      <Page
        pageNumber={page}
        width={size.width}
        height={size.height}
        onLoadError={(error) => console.error('Page load error:', error)}
      />
    </div>
  ))}
</HTMLFlipBook>

        </Document>
      </BookWrapper>
      {/* Компонент контроля книги */}
      <BookControl>
        <BookControlWrapper>
          {/* Заголовок с информацией о текущей странице и общем количестве страниц */}
          <PageTitle>
            СТРАНИЦА <span>{pageNumber + 1}</span> / <span>{numPages}</span>
          </PageTitle>
        </BookControlWrapper>
      </BookControl>
    </>
  );
};

// Экспорт компонента
export default BookComponent;
