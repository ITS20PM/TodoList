import React from "react";
import {KeyContainer, BulletPt} from './style';

function Key() {
    return (
        <KeyContainer role='list'>
            <BulletPt role='listitem'>
                Not Completed
            </BulletPt>

            <BulletPt role='listitem'>
                Completed
            </BulletPt>
        </KeyContainer>
    )
}

export default Key;