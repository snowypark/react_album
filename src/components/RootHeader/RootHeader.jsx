/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import * as S from "./style";
import defaultImg from "../../assets/images/profile/default.jpeg"
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { mypageSubmitRefreshState } from "../../atoms/mypageSubmitRefresh";

function RootHeader() {
    const [ profileImage, setProfileImage] = useState(defaultImg);
    const [refresh, setRefresh ] = useRecoilState(mypageSubmitRefreshState);
    
    useEffect(() => {
        if(refresh) {
            const localStorageUser = localStorage.getItem("user");
            if(!localStorageUser) {
                return;
            }
            const user = JSON.parse(localStorageUser);
            setProfileImage(() => user.imgUrl);
            console.log(user);
            setRefresh(() => false);
        }
    }, [refresh])

    return (
        <div css={S.layout}>
            <Link css={S.titleLink} to={"/"}>
                <h1>사진첩 어플</h1>
            </Link>
            <Link css={S.mypageLink} to={"/mypage"}>
                <img src={profileImage} alt="" />
            </Link>
        </div>
    );
}

export default RootHeader;