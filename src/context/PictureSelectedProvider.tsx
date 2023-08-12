import PictureSelectedContext from './PictureSelectedContext'
import { useState } from 'react'
import { IImage } from '../types'

const PictureSelectedProvider = ({ children }: { children: JSX.Element }) => {
    const [image, setImage] = useState<IImage | null>(null)
    return (
        <PictureSelectedContext.Provider value={{ image, setImage }}>
            {children}
        </PictureSelectedContext.Provider>
    )
}

export default PictureSelectedProvider
