import styled from 'styled-components'

import open from '../assets/icons/background.svg'


type ContainerProps = {
  background?: string | null
}

export const Container = styled.div<ContainerProps>`
  display: inline-flex;
  align-items: center;
  width: 100%;
	height: calc(100vh - 40px);
	overflow: hidden;
	transition: all 0.6s ease;
  :not(:root):fullscreen::backdrop {
    background-image: ${({background}:ContainerProps) =>
      background
        ? `url(${background})`
        : `url(${open})`};
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
  }
`

interface WrapperProps {
	isFull: boolean
	background?: string | null
}

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  align-items: stretch;
  position: relative;
  width: 100%;
  padding: ${({ isFull }) => (isFull ? '0px 40px' : '0')};
	background-image: ${({isFull, background}) =>
      isFull
        ? `url(${background})`
		: undefined};
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-position: center;
	background-size: cover;
	background-color: ${({isFull}) =>
      isFull
        ? `#D5D5D5`
		: undefined};
	transition: all 0.6s ease;
	flex-direction: column;
	justify-content: space-between;
  .stf__parent {
    margin: 0 auto;
  }
`

interface HeaderProps {
	isFull: boolean
}

export const Header = styled.header<HeaderProps>`
  display: flex;
  justify-content: ${({ isFull }) => isFull ? 'space-between' : 'flex-end'} ;
	margin-top: ${({ isFull }) => isFull ? '10px' : undefined} ;
  /* justify-content: space-between; */
	/* position: absolute;
	top: 0;
	left: 0; */
`




export const BookWrapper = styled.div`
  position: relative;
  transition: all 0.3s ease;
  width: 100%; // Добавьте этот стиль
  min-height: 600px;
  max-height: 750px;




`;



export const BookControl = styled.div`
  display: flex;
  /* Для кнопок смены темы и изменения размеров justify-content: space-between; */
  justify-content: center;
  .demoPage {
    display: inline-block;
    vertical-align: top;
    margin-left: 0; /* или другие значения, если нужно */
  }
`


export const BookControlWrapper = styled.div`
  background: rgba(38, 38, 38, 0.3);
  backdrop-filter: blur(15px);
  border-radius: 48px;
  padding: 20px 20px;
  justify-content: center;
  gap: 10px;
  align-items: center;
  line-height: 100%;
  align-items: center;
  cursor: pointer;
`

interface ColorsProps {
  color: string
}

export const Colors = styled.div<ColorsProps>`
  width: 40px;
  height: 40px;
  border: 1px solid #000000;
  border-radius: 62px;
  background-color: ${({ color }) => color};
`

export const PageTitle = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;

  & > span {
    font-size: 20px;
    font-weight: 700;
  }
`

export const SizeButton = styled.button`
  background-color: transparent;
  border: none;
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 100%;
  color: #ffffff;
  padding: 10px 10px;
  cursor: inherit;
`

const ControlButton = styled.button`
  padding: 10px;
  gap: 10px;
  position: absolute;
  padding: 31px;
  background: rgba(38, 38, 38, 0.3);
  backdrop-filter: blur(15px);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  z-index: 1;
	transition: all 0.3s ease;
	border: 1px solid rgba(38, 38, 38, 0.3);
	&:hover {
    background: rgba(38, 38, 38, 0.1);
  }
`

export const ForwardButton = styled(ControlButton)`
  left: 0;
  top: calc(50%);

`
export const BackButton = styled(ControlButton)`
  right: 0;
  top: calc(50%);

`