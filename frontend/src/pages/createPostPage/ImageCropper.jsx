import React, { useState } from 'react'
import Cropper from 'react-easy-crop';
import './createpost.css'

const Thumbnail = ({setBlob}) => {
    const [zoom, setZoom] = useState(1);
    const [thumb, setThumb] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [croppedImage, setCroppedImage] = useState(null);
    const [croppedAreaPixels, setcroppedAreaPixels] = useState(null);
    const [showCropper, setShowCropper] = useState(true);
    const handleFile = (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setThumb(url);
        setShowCropper(true)
        setCroppedImage(null)
    }

    const handleCrop = async () => {
        const croppedImageBlob = await getCroppedImage(croppedAreaPixels);
        const file = new File([croppedImageBlob], 'thumbnail.jpg', {type : 'image/jpeg'})
        setBlob(file);
        console.log(croppedImageBlob)
        setShowCropper(false)
    }

    const onCropComplete = async (croppedArea, croppedAreaPixels) => {
        setcroppedAreaPixels(croppedAreaPixels);
    }

    const getCroppedImage = async (croppedAreaPixels) => {
        const image = await createImage(thumb);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        ctx.drawImage(
            image,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            croppedAreaPixels.width,
            croppedAreaPixels.height
        )

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (blob) {
                    setCroppedImage(URL.createObjectURL(blob))
                    resolve(blob);
                } else {
                    reject(new Error('Canvas conversion failed'));
                }
            }, 'image/jpeg');
        });
    }

    const createImage = (url) => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', (error) => reject(error));
            image.src = url;
        })
    }


    return (
        <div className='flex flex-col gap-3'>
            <input type="file" className='inp_thumbnail crw-inp border rounded-sm cursor-pointer' onChange={handleFile} accept='image/*' />

            {thumb && showCropper && (
                <div className="crop-container">
                    <div className="crop-area">
                        <Cropper
                            image={thumb}
                            crop={crop}
                            zoom={zoom}
                            aspect={16/6}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    </div>

                    <button onClick={handleCrop} className='h-10 bg-black-twhite px-4 rounded-[10px] text-white cursor-pointer'>
                        Crop
                    </button>
                </div>
            )}

            {
                croppedImage && <img src={croppedImage} style={{ width: '150px' }} />
            }

        </div>
    )
}

export default Thumbnail
