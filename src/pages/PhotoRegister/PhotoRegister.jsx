/** @jsxImportSource @emotion/react */
import * as S from "./style";
import WideButton from "../../components/WideButton/WideButton";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 *  1. 사진 불러오기 버튼을 클릭 후 5개 이상의 이미지를 불러올 수 있어야함.
 *  2. PromiseAll을 사용하여 이미지를 순서대로 불러와야함.
 *  3. 불러오기가 완료되면 "이미지를 저장하시겠습니까?" 라는 확인 취소 메세지 창이 떠야함.
 *  4. 확인 클릭시 localStorage에 key: photo, value: JSON 데이터
 *      [
 *          {
 *              id: 1,
 *              imageUrl: ""
 *          },
 *          {
 *              id: 2,
 *              imageUrl: ""
 *          }
 *      ]
 *      형식으로 저장되어야함.
 *  5. 취소시 저정되면 안됨.
 */

function PhotoRegister() {

    const fileRef = useRef();
    const [ loadPhotos, setLoadPhotos ] = useState([]);
    const [ photoSeq, setPhotoSeq ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLoadPhotos(() => loadPhotos.map(
            (photo) => {
                return {
                    ...photo,
                    seq: photoSeq.includes(photo.id) ? photoSeq.indexOf(photo.id) +1 : 0
                }
            }
        ));
    }, [photoSeq]);

    const handleFileChange = (e) => {
        const fileList =  e.target.files;
        const fileArray = Array.from(fileList);
                
        fileRef.current.value = ""; // 초기화

        if(fileArray.length === 0) {
            return;
        }

        const filePromiseArray = fileArray.map(
            (file) => 
            new Promise(
                (resolve) => {
                    const fileReader = new FileReader();

                    fileReader.onload = (e) => {
                        resolve(e.target.result);
                    }

                    fileReader.readAsDataURL(file);

                }
            )
        );


        Promise.all(filePromiseArray).then(
            (result) => {
                setLoadPhotos(() => result.map(
                    (dataUrl, index) => {
                        return {
                            id: index + 1,
                            seq: 0,
                            dataUrl
                        }
                    }
                ));
            }
        );
    }

    const handlePhotoCheck = (id) => {
        if(photoSeq.includes(id)) {
            setPhotoSeq(photoSeq => photoSeq.filter(seq => seq !== id));
        }else {
            setPhotoSeq(photoSeq => [...photoSeq, id]);
        }
    }

                                                                                                                                                                                                                                                
    console.log(photoSeq);
    
const handleSubmitClcik = () => {

    const isSave = window.confirm("사진을 저장하시겠습니까?");
    if(!isSave) {
        return;
    }

    const localStoragefiles = !localStorage.getItem("photo") 
                                ? [] 
                                : JSON.parse(localStorage.getItem("photo"));

    const lastId = localStoragefiles.length === 0  
                                ? 0 
                                :[localStoragefiles.length - 1].id;

    const newPhotos = loadPhotos.
                    filter(photo => photo.seq !== 0)
                    .sort((photoA, photoB) => photoA.seq - photoB.seq)
                    .map(
                    (photo, index) => {
                    
                    return{
                        id: lastId + index + 1,
                        imageUrl: photo.dataUrl

                    }
        }
    );

    const newFiles = [...localStoragefiles, ...newPhotos];
    localStorage.setItem("photo", JSON.stringify(newFiles));
    alert("사진 저장을 완료하였습니다.");
    navigate("/photo/album");
}


    return (
        <div css={S.layout}>
            <div css={S.header}>
                <h1 css={S.title}>사진 등록하기</h1>
                <button css={S.submitButton} onClick={handleSubmitClcik}>완료</button>
            </div>
            <input type="file" 
                style={{display: "none"}} 
                multiple={true} 
                ref={fileRef} 
                onChange={handleFileChange}
            />
            <div css={S.container}>

                    {
                        loadPhotos.map(
                            photo => 
                            <div key={photo.id}>
                                <input css={S.checkbox} type="checkbox" id={"img" + photo.id} 
                                        onChange={() => handlePhotoCheck(photo.id)} />  

                                <label css={S.imageBox} htmlFor={"img" + photo.id}>
                                    <div>{photo.seq}</div>
                                    <img src={photo.dataUrl} alt="" />
                                </label>
                            </div>
                        )
                    }

            </div>
            <WideButton text={"사진 불러오기"} onClick={()=> fileRef.current.click()}/>
        </div>
    );
}

export default PhotoRegister;